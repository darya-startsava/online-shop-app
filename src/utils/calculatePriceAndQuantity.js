export function calculatePriceAndQuantity(products, currentCurrency) {
  let totalPrice;
  let quantity;
  if (products.length === 0) {
    quantity = 0;
    totalPrice = 0;
  } else {
    quantity = products?.map((i) => i.count).reduce((a, b) => a + b);
    totalPrice = products
      ?.map((i) => {
        const priceAmount = i?.product?.prices?.filter(
          (price) => price?.currency?.label === currentCurrency?.label
        )[0]?.amount;
        return { priceAmount, count: i.count };
      })
      ?.map((i) => i.priceAmount * i.count)
      ?.reduce((a, b) => a + b);
  }
  totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
  return { quantity, totalPrice };
}

export function calculateQuantity(products) {
  let quantity;
  if (products.length === 0) {
    quantity = 0;
  } else {
    quantity = products?.map((i) => i.count).reduce((a, b) => a + b);

    return quantity;
  }
}
