$(document).ready(function(){
   $('#signUpLink').click(function(){
   	 $('#loginForm').css('display', 'none');
   	 $('#signUpForm').css('display', 'block')
   });

//edit info in profile view
   $('.edit-btn').click(function(){
   	var div = $(this).parent();
   	var updateBtn = div.find('.update-btn');
   	updateBtn.css('display', 'inline');
   	var inputs = div.find(':input[type=text]');
   	inputs.each(function(){
   		$(this).removeAttr('readOnly');
   	});
   })

   //counters of article elements
   var imageCounter = 1;
   var quoteCounter = 0;
   var secHeadingCounter = 0;
   var paragraphCounter = 1;

   //add section heading input upon heading btn click
   
   $('#headingBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="text" name="secHeadings[${secHeadingCounter}]" class="form-control" placeholder="Heading Line"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal + ` /section-heading `);
      secHeadingCounter += 1;
   })

// adding a text area to write a new paragraph
   $('#paragraphBtn').click(function(){
      $('#dynInputs').append(`<textarea placeholder="Paragraph" class="form-control mb-3" name="paragraphs[${paragraphCounter}]" rows="6"></textarea>`);
      paragraphCounter += 1;
   });

   //add a file input upon image btn click

   $('#imageBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="file" name="image[${imageCounter}]" class="form-control id="image${imageCounter}"/>`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal+` /img `)
      imageCounter += 1;

   });

   //add a text input upon a quote btn click to write a quote in a post

   $('#quoteBtn').click(function(){
      var nearestPr = $('textarea').last();
      $('#dynInputs').append(`<input type="text" name="quotes[${quoteCounter}]" placeholder="Quote" class="form-control">`);
      let curVal = nearestPr.val();
      nearestPr.val(curVal + ` /quote `);
      quoteCounter += 1;

   });

   // prevent submitting a post with empty fields

   $('#postForm').on('submit', function(){
      let title = $('#titleInput').val();
      let fheading = $('#firstHeadingInput').val();
      let introPar = $('#introPar').val();
      let coverImgInput = $('#coverImgInput').val();

      if(title == ''){
        alert('The Title Cannot Be Empty');
        return false;
      }
      if(fheading == ''){
        alert('The First Heading Line Cannot Be Empty');
        return false;
      }
      if(introPar == ''){
        alert('The Preface Cannot Be Empty');
        return false;
      }
      if(coverImgInput == ''){
        alert('Choose a cover image')
        return false;
      }

      return true;
   })

   //confirm deletion
   $('.delete-post').click(function(){
      let confirmDeletion = confirm('Do you want to delete this post?');
      return confirmDeletion;
   });

   
   
   //watch the logged attribute to show the proper links to profile and login page

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

