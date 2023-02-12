export function formatMoneyBrToNumber(money: string) {
  // R$ 8.425.150,23
  let valor = ''

  // 842515023
  valor = money.replace(/[\D]+/g, '')

  // 8425150.23
  valor = valor.replace(/([0-9]{2})$/g, '.$1')

  // million
  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  // billion
  if (valor.length > 9) {
    valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
  }

  // trillion
  if (valor.length > 12) {
    valor = valor.replace(
      /([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2.$3,$4'
    )
  }

  return parseFloat(valor)
}
