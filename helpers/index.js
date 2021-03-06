class HelperFunctions{
  checkDate(date){
    return /^[0-9]{8}$/.test(date);
  }

  calculatePerformance(results,dateFrom,dateTo){
    let initialDatePrices = 0;
    let initialDatePricesCount = 0;
    let endDatePrices = 0;
    let endDatePricesCount = 0;

    results.forEach(function(line) {
      var floatPrice = line.Price.replace(/,/g, ".")
      if(dateFrom == line.Date){
         initialDatePrices += parseFloat(floatPrice)
         initialDatePricesCount += 1
      }
      if(dateTo == line.Date){
         endDatePrices += parseFloat(floatPrice)
         endDatePricesCount += 1
      }
    });

    var initialDateResult = initialDatePrices/initialDatePricesCount;
    var endDateResult = endDatePrices/endDatePricesCount;
    return ((endDateResult - initialDateResult)/initialDateResult);
  }

  calculateAverage(lines){
    let sum = 0
    let priceCount= 0
    lines.forEach(function(prices) {
      let floatPrice = prices.Price.replace(/,/g, ".")
      sum += parseFloat(floatPrice)
      priceCount += 1
    })
    return sum/priceCount
  }

  calculateVariance(samples,average){
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

  checkNumber(number){
    return /^\d[\d,]*(\.\d+)?$/.test(number)
  }

  checkISIN(isin){
    return /^[A-Z]{2}[0-9]{10}$/g.test(isin)
  }
}

module.exports = HelperFunctions
