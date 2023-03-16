export const formatPrice = (amount) => {
  // return amount.toLocaleString('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
};

export const getUniqueValues = () => {};
