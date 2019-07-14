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

   $('#headingBtn').click(function(){
      $('#dynInputs').append('<input type="text" name="secHeading" class="form-control" placeholder="Heading"/>');
   })

   $('#paragraphBtn').click(function(){
      $('#dynInputs').append('<textarea placeholder="Paragraph" class="form-control mb-3" name="paragraph" rows="6"></textarea>')
   });

   $('#imageBtn').click(function(){
      $('#dynInputs').append('<input type="file" name="image" class="form-control"/>');
   });

   $('#quoteBtn').click(function(){
      $('#dynInputs').append('<input type="text" name="quote" placeholder="Quote" class="form-control">')
   });


   
});