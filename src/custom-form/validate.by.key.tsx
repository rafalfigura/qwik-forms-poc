import { safeParseAsync } from "valibot";

type SchemaType =
  | { type: "object"; entries: Record<string, SchemaType> } // Nested object schema
  | { type: "string" } // String schema
  | { type: "number" } // Number schema
  | { type: "boolean" } // Boolean schema
  | { type: "array"; item: SchemaType }; // Array schema

export async function validateKey(
  schema: SchemaType,
  path: string,
  value: unknown,
) {
  const keys = path.split("."); // Split the key path (e.g., "author.age" -> ['author', 'age'])
  let currentSchema: SchemaType = schema;

  for (const key of keys) {
    if (currentSchema.type === "object" && currentSchema.entries[key]) {
      console.log(`object schema`, currentSchema);
      currentSchema = currentSchema.entries[key];
    } else if (currentSchema.type === "array" && !isNaN(Number(key))) {
      console.log(`array schema`, currentSchema);
      currentSchema = currentSchema.item; // Navigate into the schema of array items
    } else if (currentSchema.type !== "object") {
      throw new Error(`"${path}" is not an object, cannot validate "${key}"`);
    } else {
      throw new Error(`Key "${key}" does not exist in the schema`);
    }
  }
  // @TODO: fix types
  return safeParseAsync(currentSchema as unknown as any, value);
}
