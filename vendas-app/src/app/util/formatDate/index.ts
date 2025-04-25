export function formatOnlyIntegers(value: string): string {
  return value.replace(/\D/g, "");
}

export const formatData = (value: string) => {
  if (!value) {
    return "";
  }

  const date = formatOnlyIntegers(value);
  const size = value.length;
  if (size <= 2) {
    return date;
  }
  if (size <= 4) {
    return date.substring(0, 2) + "/" + date.substring(2, 4);
  }
  return (
    date.substring(0, 2) + "/" + date.substring(2, 4) + "/" + date.substring(4)
  );
};
