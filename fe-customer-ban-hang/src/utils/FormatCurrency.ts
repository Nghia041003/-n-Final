export const FormatCurrency = (price: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price + 20000)

  return formatter
}
