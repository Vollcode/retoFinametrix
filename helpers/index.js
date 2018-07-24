

function calculateDaysBetween(dateFrom,dateTo){
  var firstDate = new Date(2008,01,12);
  var secondDate = new Date(2008,01,22);

  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}
