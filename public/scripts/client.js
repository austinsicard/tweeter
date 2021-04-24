const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('.tweets-list').empty();
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $('.tweets-list').append(newTweet);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Set the HTML for the tweet box
const createTweetElement = function (tweet) {
  let $tweet = `
<article class="tweet">
<h3>
  <div>${tweet.user.name}</div>
  <div class="tweet-handle">${tweet.user.handle}</div>
</h3>
<p>${escape(tweet.content.text)}</p>
<hr></hr>
<footer class="tweet-list-footer">
<span class="need_to_be_rendered" datetime="${tweet.created_at}"></span>
  <div class=tweet-list-buttons>
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
</footer>
</article>
`
  return $tweet;
}

// Handles what to do when the user clicks on the TWEET button to post a tweet (Error & Success)
const submitHandler = function () {
  $('#tweet-form').on('submit', function (event) {

    // Prevent Default in order to stop our page from redirecting
    event.preventDefault();

    // Checks for a tweet longer than the 140 Char limit, and returns an error message slider
    if ($('#tweet-text').val().length > 140) {
      return $("#tweet-error").html("&#9940 Too Many Characters Error! &#9940").slideDown('slow');

      // Checks for an empty tweet and returns error message slider
    } else if ($('#tweet-text').val().length === 0) {
      return $("#tweet-error").html("&#9940 Not Enough Chars! &#9940").slideDown('slow');

      // Posts the tweet on the page, and hides the Error Slider (If there was a previous error)
    } else {
      $("#tweet-error").slideUp('slow');
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() })
        .then(() => {
          $('#tweet-text').val("");
          $('.counter').val(140);
          getHandler();
        })
    }

  })
}

const getHandler = function () {
  $.ajax("/tweets", { method: "GET" })
    .then(function (moreTweet) {
      renderTweets(moreTweet);
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    })
}
// Document Ready
$(document).ready(function () {
  submitHandler();
  getHandler();
});
