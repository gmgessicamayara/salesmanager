export function formatPhoneNumber(value: string): string {
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length <= 2) {
    return `(${numbersOnly}`;
  }

  if (numbersOnly.length <= 6) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`.trim();
  }

  if (numbersOnly.length <= 10) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
      2,
      6
    )}-${numbersOnly.slice(6)}`.trim();
  }

  if (numbersOnly.length <= 11) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
      2,
      7
    )}-${numbersOnly.slice(7, 11)}`.trim();
  }

  return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
    2,
    7
  )}-${numbersOnly.slice(7, 11)}`;
}
