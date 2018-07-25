

let helper = {}

helper.calculateDaysBetween=function(dateFrom,dateTo){
  var firstDate = new Date(2008,01,12);
  var secondDate = new Date(2008,01,22);

  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

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
  return (initialDate.getFullYear() === endDate.getFullYear()) && (initialDate.getMonth() === endDate.getMonth()) && (initialDate.getDate() == endDate.getDate());
}

helper.calculatePerformance=function(initialDatePrices,endDatePrices){
  return ((endDatePrices - initialDatePrices)/initialDatePrices)
  // return ((endDatePrices - initialDatePrices)/initialDatePrices).toFixed(3)
}

helper.checkNumber=function(){

}

module.exports = helper
