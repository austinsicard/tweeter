$(document).ready(function() {

  // Grabs the input inside of the textbox
  $('#tweet-text').on('input', function() {
  
    // Set chars equal to the length of the characters inside textbox
    let chars = this.value.length;
    let remainingChars = 140 - chars;
    const counter = $(this).parent().children().children('.counter')[0];
    counter.innerText = remainingChars;

    if (remainingChars < 0) {
      return $("p").slideDown();
    }
  })
});
