/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function (){
    $.ajaxSuccess(function (){
        alert('Item was deleted');
        alert($(this).text());
    });

    //$(document).on("ajax:success", "a.del", function (){
      //  alert('Udało się');
    //})

});