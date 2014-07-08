/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function (){
   $(document).on("click", "a.del",  function (){
       $(this).parent().parent().remove();
   })
   $("a.show").click(function(){
      var href_val = $(this).attr('href').split('/');

       $.get('/articles/' + $(this).attr('href').split('/')[href_val.length - 1], function (dane){
           if ($('#Komunikat').length > 0)
            $('#Komunikat').empty().append('otrzymano dane: '+ dane['status'] + "<br/>Tytuł: " + dane['title'] + "<br/>Tekst: " + dane['text']);
           else
            $('body').append($('<div></div>').css('background-color', 'red').css('display','inline-block').attr('id', 'Komunikat')
                   .append('otrzymano dane: '+ dane['status'] + "<br/>Tytuł: " + dane['title'] + "<br/>Tekst: " + dane['text']));
       });
   });

    $("")
});