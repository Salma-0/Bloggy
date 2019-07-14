$(document).ready(function(){
   $('#signUpLink').click(function(){
   	 $('#loginForm').css('display', 'none');
   	 $('#signUpForm').css('display', 'block')
   });

   $('.edit-btn').click(function(){
   	var div = $(this).parent();
   	var updateBtn = div.find('.update-btn');
   	updateBtn.css('display', 'inline');
   	var inputs = div.find(':input[type=text]');
   	inputs.each(function(){
   		$(this).removeAttr('readOnly');
   	});
   })
   var imageCounter = 0;
   $('#headingBtn').click(function(){
      $('#dynInputs').append('<input type="text" name="secHeading" class="form-control" placeholder="Heading"/>');
   })

   $('#paragraphBtn').click(function(){
      $('#dynInputs').append('<textarea placeholder="Paragraph" class="form-control mb-3" name="paragraph" rows="6"></textarea>')
   });

   $('#imageBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="file" name="image${imageCounter}" class="form-control id="image${imageCounter}"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal+`\n[/img${imageCounter}]`)
      imageCounter += 1;

   });

   $('#quoteBtn').click(function(){
      $('#dynInputs').append('<input type="text" name="quote" placeholder="Quote" class="form-control">')
   });


   
});