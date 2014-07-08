/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function () {
    var id_elementu = -1;

   $('form.edit').hide();

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
                   .append('otrzymano dane: '+ dane['status'] + "<br/>Tytuł: " + dane['title'] + "<br/>Tekst: " + dane['text'])
            );
       });
   });

   $("a.edit").click(function () {
      $('form.edit').show();
      id_elementu = $(this).attr('href');
       console.log(id_elementu);
   });

   $("button").click(function() {
       if (id_elementu != -1)
       {
           var tytul = $('input').val();
           var tekst = $('textarea').val();

           console.log(tytul, tekst);

           $.ajax({
             type: "Patch",
             url: id_elementu,
             data: {title: tytul, text: tekst},
             success: function(dane) {},
             error: function (dane) { alert ('Błąd'); }
           });
       }
       else alert('Nie wybrano żadnego elementu!');

       $('form.edit').hide();
   });
});