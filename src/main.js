// query selector variables go here 👇
var posterImage = document.querySelector('.poster-img');
var posterTitle = document.querySelector('.poster-title');
var posterQuote = document.querySelector('.poster-quote');

var userPosterImage = document.querySelector('#poster-image-url');
var userPosterTitle = document.querySelector('#poster-title');
var userPosterQuote = document.querySelector('#poster-quote');
var makePoster = document.querySelector('.make-poster');
//buttons
var showRandomButton = document.querySelector('.show-random');
var showFormButton = document.querySelector('.show-form');
var showSavedPostersButton = document.querySelector('.show-saved');
var backToMainButton = document.querySelector('.back-to-main');
var takeMeBackButton = document.querySelector('.show-main');
var savePosterButton = document.querySelector('.save-poster');

var savedPosters = [];
var currentPoster = new Poster();

// event listeners go here 👇
window.addEventListener('load', createRandomPoster);
showRandomButton.addEventListener('click', createRandomPoster);
makePoster.addEventListener('click', function(event) {
  userInput();
  switchScreens('.main-poster', '.poster-form');
  event.preventDefault();
});

showFormButton.addEventListener('click', function(){
  switchScreens(".main-poster",".poster-form");
}, false);
showSavedPostersButton.addEventListener('click', function(){
  switchScreens(".main-poster",".saved-posters");
}, false);
backToMainButton.addEventListener('click', function(){
  switchScreens(".saved-posters",".main-poster");
}, false);
takeMeBackButton.addEventListener('click', function(){
  switchScreens(".poster-form",".main-poster");
}, false);

savePosterButton.addEventListener('click', savePoster);

// functions and event handlers go here 👇
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function generateRandomPoster() {
  var randomImage = images[getRandomIndex(images)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomQuote = quotes[getRandomIndex(quotes)];
  var randomPoster = new Poster(randomImage, randomTitle, randomQuote);
  return randomPoster;
}

function createRandomPoster() {
  var randomPoster = generateRandomPoster();
  posterImage.src = randomPoster.imageURL;
  posterTitle.innerHTML = randomPoster.title;
  posterQuote.innerHTML = randomPoster.quote;
}

function switchScreens(closingWindow, openingWindow){
  var closing = document.querySelector(closingWindow);
  closing.classList.toggle("hidden");
  var opening = document.querySelector(openingWindow);
  opening.classList.toggle("hidden");
}

function userInput() {
  currentPoster = new Poster(userPosterImage.value, userPosterTitle.value, userPosterQuote.value);
  posterImage.src = currentPoster.imageURL;
  posterTitle.innerHTML = currentPoster.title;
  posterQuote.innerHTML = currentPoster.quote;
  images.push(currentPoster.imageURL);
  titles.push(currentPoster.title);
  quotes.push(currentPoster.quote);
}

function savePoster() {
  var duplicate = false;
  for (var i= 0; i < savedPosters.length; i++) {
    if (savedPosters[i] === currentPoster) {
      duplicate = true;
    }
  }
  if (!duplicate) {
      savedPosters.push(currentPoster);
  }
}
