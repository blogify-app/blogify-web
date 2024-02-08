const hashStr = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const toHex = (str: string) => {
  const hash = hashStr(str);
  const hex = Array.from({length: 3}, (_, i) => {
    const value = (hash >> (i * 8)) & 0xff;
    return `00${value.toString(16)}`.slice(-2);
  }).join("");
  return `#${hex}`;
};

export const toRgb = (str: string) => {
  const hash = hashStr(str);
  return Array.from({length: 3}, (_, i) => (hash >> (i * 8)) & 0xff).join(",");
};
