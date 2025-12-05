import { z } from 'zod';
import { Logger } from '../services/logger/logger.service';

/**
 * A reusable Zod schema that coerces string values to numbers with resilient error handling.
 * It automatically detects the field path for logging purposes using Zod's execution context.
 *
 * @remarks
 * This schema provides a robust validation pipeline:
 * 1. **Context Awareness**: Automatically identifies the field path (e.g., "products.0.price").
 * 2. **Type Coercion**: Attempts to convert numeric strings (e.g., "100") to numbers.
 * 3. **Logging**: Warns via the Logger if a type mismatch (String -> Number) occurred, aiding in API debugging.
 * 4. **Resilience**: Defaults to `0` if validation fails completely, preventing UI crashes.
 *
 * @example
 * ```typescript
 * import { resilientNumber } from './resilient-number.schema';
 *
 * const schema = z.object({
 * // No need to pass the field name string anymore
 * price: resilientNumber,
 * metadata: z.object({
 * rating: resilientNumber
 * })
 * });
 *
 * // Case 1: String coercion (Logs warning: "Type Mismatch... at 'price'")
 * schema.parse({ price: "100", metadata: { rating: 5 } }); // -> { price: 100, ... }
 *
 * // Case 2: Nested path (Logs warning: "Type Mismatch... at 'metadata.rating'")
 * schema.parse({ price: 100, metadata: { rating: "4.5" } }); // -> { ..., rating: 4.5 }
 *
 * // Case 3: Invalid (Returns default)
 * schema.parse({ price: "abc" }); // -> { price: 0 }
 * ```
 */
export const resilientNumber = z.preprocess(
  value => {
    if (typeof value === 'string') {
      const parsed = Number(value);

      if (!isNaN(parsed)) {
        Logger.warn(`Type Mismatch: Expected number, received string`, {
          receivedValue: value,
          coercedValue: parsed,
        });

        return parsed;
      }
    }

    return value;
  },

  z.number().catch(0)
);
