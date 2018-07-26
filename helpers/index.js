

let helper = {}

// class HelperFunctions{
//   checkDate(date){
//     return /^[0-9]{8}$/.test(date);
//   }
//
//   parseDate(str) {
//       if(!/^(\d){8}$/.test(str)) return "invalid date";
//       var y = str.substr(0,4),
//           m = str.substr(4,2),
//           d = str.substr(6,2);
//       return new Date(y,m,d);
//   }
//
//   compareDates(initialDate,endDate){
//     // return (initialDate.getFullYear() === endDate.getFullYear()) && (initialDate.getMonth() === endDate.getMonth()) && (initialDate.getDate() == endDate.getDate());
//     return (initialDate == endDate);
//   }
//
//   calculatePerformance(results,dateFrom,dateTo){
//     let initialDatePrices = 0;
//     let endDatePrices = 0;
//
//     results.forEach(function(line) {
//       var floatPrice = line.Price.replace(/,/g, ".")
//       if(compareDates(dateFrom,line.Date)){
//          initialDatePrices += parseFloat(floatPrice)
//       }
//       if(compareDates(dateTo,line.Date)){
//          endDatePrices += parseFloat(floatPrice)
//       }
//     });
//
//     return ((endDatePrices - initialDatePrices)/initialDatePrices)
//     // return ((endDatePrices - initialDatePrices)/initialDatePrices).toFixed(3)
//   }
//
//   calculateAverage(lines){
//     let sum = 0
//     let priceCount= 0
//     lines.forEach(function(prices) {
//       let floatPrice = prices.Price.replace(/,/g, ".")
//       sum += parseFloat(floatPrice)
//       priceCount += 1
//     })
//     return sum/priceCount
//   }
//
//   calculateVariance(samples,average){
//     let totalVariance = 0
//     let priceCount= 0
//     samples.forEach(function(prices) {
//       let floatPrice = prices.Price.replace(/,/g, ".")
//       let variance = (parseFloat(floatPrice) - average) * (parseFloat(floatPrice) - average)
//       totalVariance += variance
//       priceCount += 1
//     })
//     return totalVariance/(priceCount - 1)
//   }
//
//   checkNumber(number){
//     return /^\d[\d,]*(\.\d+)?$/.test(number)
//   }
//
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

helper.calculatePerformance=function(results,dateFrom,dateTo){
  let initialDatePrices = 0;
  let endDatePrices = 0;

  results.forEach(function(line) {
    var floatPrice = line.Price.replace(/,/g, ".")
    if(helper.compareDates(dateFrom,line.Date)){
       initialDatePrices += parseFloat(floatPrice)
    }
    if(helper.compareDates(dateTo,line.Date)){
       endDatePrices += parseFloat(floatPrice)
    }
  });

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

helper.checkNumber=function(number){
  return /^\d[\d,]*(\.\d+)?$/.test(number)
}

module.exports = helper
// module.exports = HelperFunctions
