interface InputProperty {
  key: string;
  value: any;
}

export function converPropertiesToObject(
  properties?: InputProperty[] | Record<string, any>,
) {
  if (!properties) {
    return undefined;
  }
  if (Array.isArray(properties)) {
    return properties.reduce(
      (acc, prop) => ({ ...acc, ...{ [prop.key]: prop.value } }),
      {},
    );
  }
  return properties;
}
