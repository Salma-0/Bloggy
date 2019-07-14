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
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="text" name="secHeadings[]" class="form-control" placeholder="Heading"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal + `\n[/section-heading]`)
   })

   $('#paragraphBtn').click(function(){
      $('#dynInputs').append('<textarea placeholder="Paragraph" class="form-control mb-3" name="paragraphs[]" rows="6"></textarea>')
   });

   $('#imageBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="file" name="image${imageCounter}" class="form-control id="image${imageCounter}"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal+`\n[/img${imageCounter}]`)
      imageCounter += 1;

   });

   $('#quoteBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append('<input type="text" name="quotes[]" placeholder="Quote" class="form-control">');
      let curVal = nearestPr.val();
      nearestPr.val(curVal + `\n[/quote]`)
   });


   
});