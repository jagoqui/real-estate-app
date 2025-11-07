/**
 * Checks if a value is a File or Blob.
 */
const isBinaryValue = (value: unknown): value is File | Blob => {
  return value instanceof File || value instanceof Blob;
};

/**
 * Filters out empty objects from an array, keeping Files/Blobs and non-empty objects.
 */
const filterEmptyObjects = (array: Array<unknown>): Array<unknown> => {
  return array.filter(item => {
    if (isBinaryValue(item)) return true;
    if (typeof item === 'object' && item !== null) {
      return Object.keys(item as Record<string, unknown>).length > 0;
    }
    return true;
  });
};

/**
 * Appends a File or Blob to FormData.
 */
const appendBinaryValue = (formData: FormData, key: string, value: File | Blob): void => {
  formData.append(key, value, value instanceof File ? value.name : undefined);
};

/**
 * Handles arrays of Files/Blobs by appending each with indexed keys.
 */
const appendBinaryArray = (formData: FormData, key: string, values: Array<File | Blob>): void => {
  values.forEach(file => {
    if (isBinaryValue(file)) {
      appendBinaryValue(formData, `${key}`, file);
    }
  });
};

/**
 * Handles arrays of objects by using indexed notation with nested properties.
 */
const appendObjectArray = (formData: FormData, key: string, values: Array<Record<string, unknown>>): void => {
  values.forEach((item, index) => {
    if (typeof item === 'object' && item !== null) {
      Object.entries(item).forEach(([itemKey, itemValue]) => {
        const nestedKey = `${key}[${index}].${itemKey}`;
        if (itemValue === null || itemValue === undefined) {
          return;
        }

        if (typeof itemValue === 'object') {
          formData.append(nestedKey, JSON.stringify(itemValue));
        } else if (typeof itemValue === 'string' || typeof itemValue === 'number' || typeof itemValue === 'boolean') {
          formData.append(nestedKey, String(itemValue));
        }
      });
    }
  });
};

/**
 * Handles arrays of primitives by using indexed notation.
 */
const appendPrimitiveArray = (formData: FormData, key: string, values: Array<unknown>): void => {
  values.forEach((item, index) => {
    formData.append(`${key}[${index}]`, String(item));
  });
};

/**
 * Handles array values in the FormData conversion.
 */
const handleArrayValue = (formData: FormData, key: string, value: Array<unknown>): void => {
  const filteredValue = filterEmptyObjects(value);

  if (filteredValue.length === 0) {
    return;
  }

  const firstItem = filteredValue[0];

  if (isBinaryValue(firstItem)) {
    appendBinaryArray(formData, key, filteredValue as Array<File | Blob>);
    return;
  }

  if (typeof firstItem === 'object' && firstItem !== null) {
    appendObjectArray(formData, key, filteredValue as Array<Record<string, unknown>>);
    return;
  }

  appendPrimitiveArray(formData, key, filteredValue);
};

/**
 * Converts a generic JavaScript object (T) into a FormData object.
 *
 * - Files/Blobs: Attached directly to the FormData.
 * - Arrays of Files/Blobs: Each file is attached individually with index notation.
 * - Nested Objects: Uses dot notation (e.g., location.lat, location.lon).
 * - Arrays of primitives/objects: Serialized to JSON string.
 * - Primitives (string, number, boolean): Attached as strings.
 *
 * @param data The generic object to convert.
 * @param [formData] The FormData instance (used internally for recursion).
 * @param [parentKey] The key path for the current item (used internally).
 * @returns A FormData object ready for HTTP submission.
 */
export const objectToFormDataHelper = <T extends object>(
  data: T,
  formData = new FormData(),
  parentKey = ''
): FormData => {
  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      continue;
    }

    const value = data[key];
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value === null || value === undefined) {
      continue;
    }

    if (isBinaryValue(value)) {
      appendBinaryValue(formData, formKey, value);
      continue;
    }

    if (Array.isArray(value)) {
      handleArrayValue(formData, formKey, value);
      continue;
    }

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
      continue;
    }

    if (typeof value === 'object') {
      objectToFormDataHelper(value as Record<string, unknown>, formData, formKey);
      continue;
    }

    formData.append(formKey, String(value));
  }

  return formData;
};
