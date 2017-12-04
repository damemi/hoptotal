total = 0
$('#hopsSummary .brewpartitems td').each(function() { 
     value = $(this).text(); 
     if(value.indexOf(' oz') >= 0 || value.indexOf(' g') >= 0) { 
          div = 1
          len = value.indexOf(' oz'); 
          if(len == -1) {
               len = value.indexOf(' g');
               div = 28
          }
          val = value.substr(0, len); 
          total = total + (parseFloat(val) / div); 
          } 
     }); 
console.log(total);
$('#hopsSummary table tr:last').after('<tr> <td width="10%"> <b>'+total+' oz</b> </td> <td width="54%"> <b>Total</b> </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> <td width="12%"> &nbsp; </td> </tr>');