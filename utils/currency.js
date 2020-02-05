const currency = number => {
  return new Intl.NumberFormat('de-DE').format(number);
};
const rate = number => {
  return new Intl.NumberFormat('en').format(number);
};
export { currency, rate };
