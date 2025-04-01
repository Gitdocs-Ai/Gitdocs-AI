export function tokenParser(value: number | string) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return value; // or handle error

  if (num >= 1000000) {
    const result = num / 1000000;
    return result % 1 === 0 ? `${result}Mn` : `${result.toFixed(1)}Mn`;
  }

  if (num >= 1000) {
    const result = num / 1000;
    return result % 1 === 0 ? `${result}k` : `${result.toFixed(1)}k`;
  }

  if (num < 0) {
    return "0";
  }

  return num.toString();
}
