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
      $('#secHeadingInput').css('display', 'block');
      $(':button').css('display', 'block')
   })

   $('#paragraphBtn').click(function(){
      $('#prInput').css('display', 'block');
      $(':button').css('display', 'block');
   });

   $('#imageBtn').click(function(){
      $('#imageInput').css('display', 'block');
      $(':button').css('display', 'block');
   });

   $('#quoteBtn').click(function(){
      $('#quoteInput').css('display', 'block');
      $(':button').css('display', 'block');
   })
   
});