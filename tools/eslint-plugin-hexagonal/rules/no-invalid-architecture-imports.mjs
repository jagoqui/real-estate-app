/** @type {import("eslint").Rule.RuleModule} */

const defaultConfig = {
  sharedModule: 'shared',
  layers: {
    domain: 'domain',
    application: 'application',
    infrastructure: 'infrastructure',
  },
  whiteListPatterns: ['@/variables/', '.test.ts'],
  allowedImports: {
    domain: [],
    application: ['domain'],
    infrastructure: ['application', 'domain'],
  },
};

function mergeConfig(options) {
  const userConfig = options?.[0] || {};
  return {
    ...defaultConfig,
    ...userConfig,
    layers: {...defaultConfig.layers, ...userConfig.layers},
    allowedImports: {
      ...defaultConfig.allowedImports,
      ...userConfig.allowedImports,
    },
    whiteListPatterns: [
      ...(defaultConfig.whiteListPatterns || []),
      ...(userConfig.whiteListPatterns || []),
    ],
  };
}

function getLayer(filePath, layers) {
  const normalized = filePath.replace(/\\/g, '/');
  return Object.values(layers).find(layer => normalized.includes(layer)) ?? null;
}

function extractAppModuleName(path, fallback = '') {
  const normalizedPath = path.replace(/\\/g, '/');
  const regex = /(?:^|\/)(?:src\/app|@)\/modules\/([^\/]+)\//;
  const match = normalizedPath.match(regex);
  return match ? match[1] : fallback;
}

const documentationInfo =
  '📄 See full documentation at: documentation/shared/hexagonal-architecture.md';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce hexagonal architecture import rules',
      recommended: true,
      url: 'documentation/shared/hexagonal-architecture.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          sharedModule: {type: 'string'},
          layers: {type: 'object'},
          whiteListPatterns: {
            type: 'array',
            items: {type: 'string'},
          },
          allowedImports: {type: 'object'},
        },
        additionalProperties: false,
      },
    ],
    messages: {
      crossModule: `Hexagonal architecture violation: {{currentFileModule}} module cannot import from {{importFileModule}} module. ℹ️ Cross-module imports must go through the shared module. ${documentationInfo}`,
      dependencyViolation: `Hexagonal architecture violation: {{currentLayer}} layer cannot import from {{importedLayer}} layer. ℹ️ Dependencies must flow from domain → application → infrastructure.
      ${documentationInfo}`,
    },
  },

  create(context) {
    const config = mergeConfig(context.options);

    return {
      ImportDeclaration(node) {
        const currentFilename = context.getFilename();
        const importFilename = node.source.value;

        // Skip white-listed patterns
        if (
          config.whiteListPatterns.some(
            pattern => currentFilename.includes(pattern) || importFilename.includes(pattern),
          )
        ) {
          return;
        }

        const localLayerOrExternalFile = 'local';

        const layerCurrentFile =
          getLayer(currentFilename, config.layers) ?? localLayerOrExternalFile;
        const layerImportedFile =
          getLayer(importFilename, config.layers) ?? localLayerOrExternalFile;

        // Skip files not in layers for performance
        if (
          layerCurrentFile === localLayerOrExternalFile ||
          layerImportedFile === localLayerOrExternalFile
        ) {
          return;
        }

        const currentFileModule = extractAppModuleName(currentFilename);
        const importFileModule = extractAppModuleName(importFilename, currentFileModule);

        const cannotImportFromOtherModule =
          importFileModule !== config.sharedModule && currentFileModule !== importFileModule;

        // Prevent cross-module imports that do not go through shared
        if (cannotImportFromOtherModule) {
          context.report({
            node,
            messageId: 'crossModule',
            data: {
              currentFileModule,
              importFileModule,
            },
          });
          return;
        }

        if (
          !config.allowedImports[layerCurrentFile]?.includes(layerImportedFile) &&
          layerCurrentFile !== layerImportedFile
        ) {
          context.report({
            node,
            messageId: 'dependencyViolation',
            data: {
              currentLayer: layerCurrentFile,
              importedLayer: layerImportedFile,
            },
          });
        }
      },
    };
  },
};
