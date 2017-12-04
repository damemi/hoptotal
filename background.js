total = 0
$('#hopsSummary .brewpartitems td').each(function() {
  value = $(this).text();
  if(value.indexOf(' oz') >= 0 || value.indexOf(' g') >= 0) {
    div = 1 // ounces in an ounce
    len = value.indexOf(' oz');
    if(len == -1) { // if oz doesn't exist, must be in g
      len = value.indexOf(' g');
      div = 28 // grams in an ounce
    }
    val = value.substr(0, len);
    total = total + (parseFloat(val) / div);
  }
  if(value.indexOf(' lb') >= 0 || value.indexOf(' kg') >= 0) {
    mult = 16 // ounces in a pound
    len = value.indexOf(' lb');
    if(len == -1) { // if lb doesn't exist, must be in kg
      len = value.indexOf(' kg');
      mult = 35.274 // ounces in a kilogram
    }
    val = value.substr(0, len);
    total = total + (parseFloat(val) * div);
  }
});
total = +total.toFixed(3)
$('#hopsSummary table tr:last').after('<tr> <td width="10%"> <b>'+total+' oz</b> </td> <td width="54%"> <b>Total</b> </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> </tr>');

