/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function (){
    $("a.del").ajaxSuccess(function () {
        consloe.log('Item was deleted');
    })

    $('a.del').click(function() {
        console.log('test');
    })

    //$(document).on("ajax:success", "a.del",  function (){
      //  alert('Udało się')
    //})

});