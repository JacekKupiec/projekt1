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
            $('body').append($('<div></div>').css('background-color', 'yellow').css('display','inline-block').attr('id', 'Komunikat')
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

           console.log(id_elementu, tytul, tekst, "a[href='"+id_elementu+"']");
           console.log(id_elementu, tytul, tekst, "a[href='"+id_elementu+"']");

           $.ajax({
               type: "PUT",
               url: id_elementu,
               data: params,
                   success: function (dane) {
                       if (dane['status'] === "ok")
                       {
                           $("a[href='"+id_elementu+"']").parent().siblings('td.text').text(tekst).siblings('td.title').text(tytul);
                           if ($('#Blad').length > 0)
                                $("#Blad").remove();
                       }
                       else if (dane['status'] === "fail")
                       {
                            if ($('#Blad').length > 0)
                                $("#Blad").empty().append("Liczba błądów: " + dane['err_num'] + "<br/>" + dane['err_msg']);
                           else
                            {
                                $("#Blad")append($("<div></div>").attr("id","Blad").css('background-color',"red").append("Liczba błądów: " + dane['err_num'] + "<br/>" + dane['err_msg']));
                            }
                       }
                   }

                   $('input').val("");
                   $('textarea').val("");
                   id_elementu = -1;
               },
               error: function (dane) { console.log (dane['error_msg'], dane[err_num]); id_elementu = -1; }
           });
       }

       $('form.edit').hide();
   });
});