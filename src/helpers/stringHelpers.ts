export const trimString = (value: string, length: number): string =>
  value.length > length ? `${value.substring(0, length - 3)}...` : value;

export default {};
