function getMultiplier(input, units) {
  var mult = 1
  if(input == units) {
    return mult
  } else {
    switch(units) {
    case 'oz':
      switch(input) {
      case 'g':
	mult = 1/28
	break;
      case 'lb':
	mult = 16
	break;
      case 'kg':
	mult = 35.274
	break;
      default:
	mult = 1
	break;
      }
      break;
    case 'g':
      switch(input) {
      case 'oz':
	mult = 28
	break;
      case 'lb':
	mult = 448
	break;
      case 'kg':
	mult = 1000
	break;
      default:
	mult = 1
	break;
      }
      break;
    case 'lb':
      switch(input) {
      case 'g':
	mult = 1/448
	break;
      case 'oz':
	mult = 1/16
	break;
      case 'kg':
	mult = 2.2
	break;
      default:
	mult = 1
	break;
      }
      break;
    case 'kg':
      switch(input) {
      case 'g':
	mult = 1/1000
	break;
      case 'oz':
	mult = 1/35.274
	break;
      case 'lb':
	mult = 1/2.2
	break;
      default:
	mult = 1
	break;
      }
      break;
    default:
      mult = 1
      break;
    }
    return mult
  }
}

chrome.storage.sync.get('units', function (obj) {
  var units = obj.units
  if(units == null) {
    units = 'oz'
  }
  addHopTotal(units)
});

function addHopTotal(units) {
  var total = 0
  var count = 0
  $('#hopsSummary .brewpartitems td').each(function() {
    var value = $(this).text();
    if(value.indexOf(' oz') >= 0 || value.indexOf(' g') >= 0) {
      var mult = getMultiplier('oz', units) // ounces in an ounce
      var len = value.indexOf(' oz');
      if(len == -1) { // if oz doesn't exist, must be in g
	len = value.indexOf(' g');
	mult = getMultiplier('g', units) // grams in an ounce 
      }
      var val = value.substr(0, len);
      total = total + (parseFloat(val) * mult);
      count = count + 1
    }
    if(value.indexOf(' lb') >= 0 || value.indexOf(' kg') >= 0) {
      var mult = getMultiplier('lb', units) // ounces in a pound
      var len = value.indexOf(' lb');
      if(len == -1) { // if lb doesn't exist, must be in kg
	len = value.indexOf(' kg');
	mult = getMultiplier('kg', units) // ounces in a kilogram
      }
      var val = value.substr(0, len);
      total = total + (parseFloat(val) * mult);
      count = count + 1
    }
  });
  total = +total.toFixed(3)
  if(count % 2 == 0) { // last one was even, so we need an odd
    $('#hopsSummary table tr:last').after('<tr class="odd"> <td width="10%"> <b>'+total+' '+units+'</b> </td> <td width="54%"> <b>Total</b> </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> </tr>');
  } else {
    $('#hopsSummary table tr:last').after('<tr> <td width="10%"> <b>'+total+' '+units+'</b> </td> <td width="54%"> <b>Total</b> </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> </tr>');
  }
}

