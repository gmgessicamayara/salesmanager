export function formatCpf(value: string): string {
  const numbersOnly = value.replace(/\D/g, "");
  return numbersOnly
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})\.(\d{3})(\d)/, ".$1.$2-$3")
    .slice(0, 14);
}
