

let helper = {}

// helper.calculateDaysBetween=function(dateFrom,dateTo){
//   var firstDate = new Date(2008,01,12);
//   var secondDate = new Date(2008,01,22);
//
//   var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
// }

helper.checkDate=function(date){
  return /^[0-9]{8}$/.test(date);
}

helper.parseDate=function(str) {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0,4),
        m = str.substr(4,2),
        d = str.substr(6,2);
    return new Date(y,m,d);
}

helper.compareDates=function(initialDate,endDate){
  // return (initialDate.getFullYear() === endDate.getFullYear()) && (initialDate.getMonth() === endDate.getMonth()) && (initialDate.getDate() == endDate.getDate());
  return (initialDate == endDate);
}

helper.calculatePerformance=function(initialDatePrices,endDatePrices){
  return ((endDatePrices - initialDatePrices)/initialDatePrices)
  // return ((endDatePrices - initialDatePrices)/initialDatePrices).toFixed(3)
}

helper.calculateAverage= function(lines){
  let sum = 0
  let priceCount= 0
  lines.forEach(function(prices) {
    let floatPrice = prices.Price.replace(/,/g, ".")
    sum += parseFloat(floatPrice)
    priceCount += 1
  })
  return sum/priceCount
}

helper.calculateVariance= function(samples,average){
  let totalVariance = 0
  let priceCount= 0
  samples.forEach(function(prices) {
    let floatPrice = prices.Price.replace(/,/g, ".")
    let variance = (parseFloat(floatPrice) - average) * (parseFloat(floatPrice) - average)
    totalVariance += variance
    priceCount += 1
  })
  return totalVariance/(priceCount - 1)
}

// (1 - 3) ^ 2 = 4
//Con la media de los precios, calculamos la varianza para cada día. La varianza la calculamos como el cuadrado de la diferencia entre el precio y la media.
//* La varianza total sería la suma de varianzas entre el número de días (muestras) - 1.
helper.checkNumber=function(){
  //regex de numeros y una coma
}

module.exports = helper
