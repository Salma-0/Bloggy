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
   var quoteCounter = 0;
   var secHeadingCounter = 0;
   var paragraphCounter = 0;
   
   $('#headingBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="text" name="secHeadings[${secHeading}]" class="form-control" placeholder="Heading"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal + `\n[/section-heading]`);
      secHeadingCounter += 1;
   })

   $('#paragraphBtn').click(function(){
      $('#dynInputs').append(`<textarea placeholder="Paragraph" class="form-control mb-3" name="paragraphs[${paragraphCounter}]" rows="6"></textarea>`);
      paragraphCounter += 1;
   });

   $('#imageBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="file" name="image[${imageCounter}]" class="form-control id="image${imageCounter}"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal+`\n[/img${imageCounter}]`)
      imageCounter += 1;

   });

   $('#quoteBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="text" name="quotes[${quoteCounter}]" placeholder="Quote" class="form-control">`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal + `\n[/quote]`);
      quoteCounter += 1;

   });

   $('#postForm').on('submit', function(){
      $('#secHeadingCounter').val(secHeadingCounter);
      $('#paragraphCounter').val(paragraphCounter);
      $('#imageCounter').val(imageCounter);
      $('#quoteCounter').val(quoteCounter);
   })
   

   let logged = $('#loggedAttr').val();
   if(logged == "true"){
      $('#signLink').attr('href', '/users/logout')
      $('#signLink').text('Sign Out');
      $('#profileLink').show();
   }else{
      $('#signLink').attr('href', '/users/login')
      $('#signLink').text('Sign In');
      $('#profileLink').hide();
   }
   
});