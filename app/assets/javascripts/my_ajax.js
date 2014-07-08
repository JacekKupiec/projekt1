/**
 * Created by cj on 07.07.14.
 */

$(document).ready(function () {
    var id_elementu = -1;

   $('form.edit').hide();

   $(document).on("ajax:success", "a.del",  function (){
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
   })

   $("a.edit").click(function () {
      $('form.edit').show();
      id_elementu = $(this).attr('href');
      id_elementu = id_elementu.slice(0, id_elementu.length - 5);
      console.log(id_elementu);
   });

   $("button").click(function() {
       if (id_elementu != -1)
       {
           var tytul = $('input').val();
           var tekst = $('textarea').val();
           var params = { "article": {"title" : tytul, "text": tekst} }

           console.log(id_elementu, tytul, tekst);

           $.ajax({
               type: "PUT",
               url: id_elementu,
               data: params,
               success: function (dane) {
                   $('a.edit').parent().sibling('td.text').text(tekst);
                   $('input').val("");
                   $('textarea').val("");
                   id_elementu = -1;
               },
               error: function (dane) { console.log ('error'); id_elementu = -1; }
           });
       }

       $('form.edit').hide();
   });
});