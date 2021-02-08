// By default all javascript is in the window object
// Get quote from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const newQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader'); 



let apiQuotes = []; // using a let variable because the values inside of the array will change 

// Show Loading 
function showLoadingSpinner() {
    loader.hidden = false; 
    quoteContainer.hidden = true; 
}

// Hide Loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false; 
    loader.hidden = true; 
}

//Show New Quote
function newQuote () {
    showLoadingSpinner(); 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 
    // Check if author field is blank and replace with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown'; 
    } else {
        authorText.textContent = quote.author; 
    }
    // Check quote length to determine styling 
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote'); 
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text; 
    removeLoadingSpinner(); 
}

//Solving CORS errors from external APIs requires a proxyURL which is now in my herokuapp, the enigmatic one, see below how to use it 
/*
async function getQuotes() {
    const proxyUrl = 'https://enigmatic-meadow-43212.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl); 
        const data = await response.json(); 
        console.log(data); 
    } catch (error) {
        getQuote(); // this is a recursive function, and if there is an error it will be infinitely looped as an error
    }
}
*/



async function getQuotes () {
    showLoadingSpinner(); 
    const apiUrl = 'https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiUrl); 
        // apiQuotes below refers to the global variable that is why we do not declare it in the getQuotes function
        apiQuotes = await response.json(); 
        newQuote(); 
    } catch (error) {
        console.log('whoops', error); 
    }
}

// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`; 
    window.open(twitterUrl, '_blank'); // this will open the twitter window in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote); 


//On Load
getQuotes(); 



// USE THIS CODE FOR LOCAL QUOTE GENERATOR 
// function newerQuote() {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]; 
//     console.log(quote); 
// }
// newerQuote(); 