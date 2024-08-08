export type FieldValue = 1 | -1 | FieldObject;
export type FieldObject = { [key: string]: FieldValue };

const handleSimpleValue = (key: string, value: number): string => {
  if (value === 1) return key;
  else if (value === -1) return `-${key}`;
  return "";
};

const handleObjectValue = (key: string, obj: FieldObject): string => {
  return Object.entries(obj)
    .map(([subKey, subValue]) => processField(`${key}.${subKey}`, subValue))
    .join(",");
};

const processField = (key: string, value: FieldValue): string => {
  if (typeof value === "number") return handleSimpleValue(key, value);
  else if (typeof value === "object") return handleObjectValue(key, value);

  return "";
};

export function convertFieldsToString(fields: FieldObject): string {
  return Object.entries(fields)
    .map(([key, value]) => processField(key, value))
    .filter(Boolean)
    .join(",");
}
