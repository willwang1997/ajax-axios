import currency from 'currency.js'


/*格式化金钱 */
var money = value => currency(value, { symbol: "¥",formatWithSymbol: true });

export default money;