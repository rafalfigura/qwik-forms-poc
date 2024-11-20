export const setNestedValue = <T extends Record<string, any>>(
  obj: T,
  path: string,
  value: unknown,
): void => {
  const keys = path.split(".");
  let current: any = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }
  });
};

export const getNestedValue = <T extends Record<string, any>>(
  obj: T,
  path: string,
): unknown => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};
