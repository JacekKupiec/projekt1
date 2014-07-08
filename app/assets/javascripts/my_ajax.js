/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function (){
    /*$(document).ajaxSuccess(function () {
        console.log('Item was deleted');
    })

    $('a.del').click(function() {
        console.log('test');
    })*/

   $(document).on("ajax:success", "a.del",  function (){
       $(this).parent('tr').remove();
   });
});