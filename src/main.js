// query selector variables go here 👇
var posterImage = document.querySelector('.poster-img');
var posterTitle = document.querySelector('.poster-title');
var posterQuote = document.querySelector('.poster-quote');
var savedPosterLocation = document.querySelector('.saved-posters-grid');
var imageError = document.querySelector('.img-error');
var titleError = document.querySelector('.title-error');
var quoteError = document.querySelector('.quote-error');

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
  event.preventDefault();
});
showFormButton.addEventListener('click', function() {
  switchScreens(".main-poster",".poster-form");
}, false);
showSavedPostersButton.addEventListener('click', function() {
  switchScreens(".main-poster",".saved-posters");
}, false);
backToMainButton.addEventListener('click', function() {
  switchScreens(".saved-posters",".main-poster");
}, false);
takeMeBackButton.addEventListener('click', function() {
  switchScreens(".poster-form",".main-poster");
}, false);
savePosterButton.addEventListener('click', savePoster);
document.addEventListener('dblclick', function(e) {
  if (e.target && e.target.parentElement.classList.contains("saved-poster")) {
    removePoster(e.target.parentElement);
  }
})

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
  currentPoster = generateRandomPoster();
  posterImage.src = currentPoster.imageURL;
  posterTitle.innerHTML = currentPoster.title;
  posterQuote.innerHTML = currentPoster.quote;
}

function switchScreens(closingWindow, openingWindow) {
  var closing = document.querySelector(closingWindow);
  closing.classList.toggle("hidden");
  var opening = document.querySelector(openingWindow);
  opening.classList.toggle("hidden");
}

function userInput() {
  currentPoster = new Poster(userPosterImage.value, userPosterTitle.value, userPosterQuote.value);
  var error = errorMessages();
  if (!error) {
    posterImage.src = currentPoster.imageURL;
    posterTitle.innerHTML = currentPoster.title;
    posterQuote.innerHTML = currentPoster.quote;
    images.push(currentPoster.imageURL);
    titles.push(currentPoster.title);
    quotes.push(currentPoster.quote);
    switchScreens('.main-poster', '.poster-form');
    clearForm();
    removeAllErrors();
  }
}

function errorMessages() {
  var imageMsg = checkUserEntry(userPosterImage.value, imageError);
  var titleMsg = checkUserEntry(userPosterTitle.value, titleError);
  var quoteMsg = checkUserEntry(userPosterQuote.value, quoteError);
  if (imageMsg || titleMsg || quoteMsg) {
    return true;
  } else {
    return false; 
  }
}

function checkUserEntry(userEntry, errorMsg) {
  if (userEntry === "") {
    showError(errorMsg);  
    return true;
  } else {
    removeError(errorMsg); 
    return false;
  }
}

function showError(element) {
  element.classList.remove('visibility-hidden');
}

function removeError(element) {
  element.classList.add('visibility-hidden');
}

function removeAllErrors() {
  removeError(imageError);
  removeError(titleError);
  removeError(quoteError);
}

function clearForm() {
  userPosterImage.value = "";
  userPosterTitle.value = "";
  userPosterQuote.value = "";  
}

function savePoster() {
  var duplicate = checkDuplicate();
  if (!duplicate) {
      savedPosters.push(currentPoster);
      var newPoster = `${savedPosterLocation.innerHTML} <article class="poster saved-poster" id=${savedPosters.length - 1}>
          <img class="poster-img" src="${currentPoster.imageURL}" alt="nothin' to see here">
          <h1 class="poster-title">${currentPoster.title}</h1>
          <h3 class="poster-quote">${currentPoster.quote}</h3>
        </article>`;
        savedPosterLocation.innerHTML = newPoster;
  }
}

function checkDuplicate () {
  for (var i= 0; i < savedPosters.length; i++) {
    if (savedPosters[i] === currentPoster) {
      return duplicate = true;
    }
  }
  return false;
}

function removePoster(target) {
  savedPosters.splice(target.id, 1);
  target.remove();
}
