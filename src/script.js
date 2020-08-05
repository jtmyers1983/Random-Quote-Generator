let quotesData;
let newQuote = '';
let newAuthor = '';

function getQuotes() {
  return $.ajax({
    header: {
      accepts: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/jtmyers1983/ef3508530f0e5aae510dc8cdab1435c9/raw/403ec975f327c996a811cd52a4ff57b764687347/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes); 
        //console.log(quotesData);
      }
    }
 });
}


function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();
  
  newQuote = randomQuote.quote;
  newAuthor = randomQuote.author;
  
  $('#text').text(randomQuote.quote).hide().fadeIn();
    $('#author').html(randomQuote.author).hide().fadeIn();
  
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
  
  $('#fb-quote').attr('href','https://www.facebook.com/sharer.php?u=https%3A%2F%2Fcodepen.io%2Fjtmyers1983%2Fpen%2FzYrVdQm%3Feditors%3D0010');
  
  $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype='+encodeURIComponent(newAuthor)+'&content=' + encodeURIComponent(newQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
}

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);
  
  $('#tweet-quote').on('click', function()  { 
    openURL('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
   });
  
  $('#fb-quote').on('click', function()  { 
    openURL('https://www.facebook.com/sharer.php?u=https%3A%2F%2Fcodepen.io%2Fjtmyers1983%2Fpen%2FzYrVdQm%3Feditors%3D0010');
   });
  
  $('#tumblr-quote').on('click', function() {
    openURL('https://www.tumblr.com/widgets/share/tool?posttype='+encodeURIComponent(newAuthor)+'&content=' + encodeURIComponent(newQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
  
});
