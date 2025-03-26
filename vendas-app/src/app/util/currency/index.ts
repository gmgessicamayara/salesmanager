export const convertToBigDecimal = (value): number => {
  if (!value) {
    return 0;
  }
  return value.replace('.', '').replace(',', '.');
};

export const formatToBRL = (value) => {
  const v = (value.replace(/\D/g, '') / 100).toFixed(2) + '';

  const [integer, decimal] = v.split('.');

  const integerWithDots = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${integerWithDots},${decimal}`;
};
