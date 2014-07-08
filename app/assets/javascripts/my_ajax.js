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

    /*$(document).on("ajax:success", "a.show", function (){
       alert($(this).parent('td').sibling(2,'td').text());
    });*/



   $(document).on("click", "a.del",  function (){
       $(this).parent().parent().remove();
   })
   $("a.show").click(function(){
      var href_val = $(this).attr('href').split('/');

       $.get('/articles/' + $(this).attr('href').split('/')[href_val.length - 1], function (dane){
           alert('otrzymano dane: '+ dane['status'] + "\nTytuł: " + dane['title'] + "\nTekst: " + dane['text']);
           $('body').append(('<div id="Komunikat">').css('background-color', 'red').
               append('otrzymano dane: '+ dane['status'] + "<br/>Tytuł: " + dane['title'] + "<br/>Tekst: " + dane['text']).
               show(3000));
       });
   });
});