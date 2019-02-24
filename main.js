/* Global Variables */

var titleInputEl = document.querySelector('#title-input');
var addToAlbumEl = document.querySelector('.add-to-album-btn');
var captionInputEl = document.querySelector('#caption-input');
var chooseFileBtnEl = document.querySelector('.choose-file-btn');
var favBtnEl = document.querySelector('.favorite-btn');
var viewFavoritesBtnEl = document.querySelector('.view-favorites-btn');
var searchInputEl = document.querySelector('#search');
var searchBtnEl = document.querySelector('.search-btn');
var emptyEl = document.querySelector('.empty')
var mainEl = document.querySelector('main');
var images;
// var reader = new FileReader();

/* Event Listeners */
window.addEventListener('load', loadFromStorage);
addToAlbumEl.addEventListener('click', addToAlbum);
searchBtnEl.addEventListener('click', searchCards);
searchInputEl.addEventListener('keyup', searchCards);
viewFavoritesBtnEl.addEventListener('click', viewFavorites);
mainEl.addEventListener('click', buttonListener);

/* only temp */
chooseFileBtnEl.addEventListener('click', showMore);


/* Functions */

/* Create Card */
function create() {
   var cardId = Date.now();
   var titleInputVal = titleInputEl.value;
   var captionInputVal = captionInputEl.value;
   if(captionInputVal && titleInputVal != ''){
    var newPhoto = new Photo(cardId, titleInputVal, captionInputVal);
    images.push(newPhoto);
    generateCard(cardId, titleInputVal, captionInputVal);
    newPhoto.saveToStorage();
   }
}

function generateCard(id, title, caption) {
  event.preventDefault();
  var card = `<article class="photo" data-id=${id}>
      <section class="photo-title">
        <h2>${title}</h2>
      </section>
      <section class="photo-img-wrapper">
        <img class ="photo-img" src="">
      </section>
      <section class="photo-caption">
        <p>${caption}</p>
      </section>
      <section class="photo-btns">
        <button id="trash-btn" class="trash-btn"></button>
        <button id="favorite-btn" class="favorite-btn"></button>
      </section>
    </article>`
    mainEl.insertAdjacentHTML('afterbegin', card);
    clearInputs();
}

function clearInputs() {
  titleInputEl.value = '';
  captionInputEl.value = '';
}

/* -- load cards -- */

function loadFromNew(images) {
  images;
  if(images.length != 0){
    i = 0;
    let arrLength = parseInt(images.length);
    let arrLengthMax = parseInt(images.length - 10);
    images = images.slice(arrLengthMax, arrLength);
    images.forEach(function(){
    displayCards(images);
    })
  }
}

function displayCards(images) {
  generateCard(images[i].id, images[i].title, images[i].caption);
  if(images[i].favorited === true){ 
  var fav = document.querySelector('.favorite-btn');
  fav.classList.add('favorite-btn-active');
  }
  i++;
}

function emptyMessage(images){
  if(images.length == 0) {
    emptyEl.classList.remove('hidden');
  }
  else {
    emptyEl.classList.add('hidden');
  }
}

function loadFromStorage(e) {
  images = JSON.parse(localStorage.getItem('images')) || [];
  emptyMessage(images);
  if(images.length != 0){
    i = 0;
    images = JSON.parse(localStorage.images);
    let arrLength = parseInt(images.length);
    let arrLengthMax = parseInt(images.length - 10);
    images = images.slice(arrLengthMax, arrLength);
    images.forEach(function(){
      displayCards(images);
    })
  }
}


/* -- button functions -- */

function buttonListener(e) {
  var favoriteBtnEl = document.querySelector('#favorite-btn');
  var trashBtnEl = document.querySelector('#trash-btn');
  var targetImage;
  if(e.target.id == favoriteBtnEl.id) {
    photoTargeter(e);
    favoriteCards(e);
  } 
  else if(e.target.id == trashBtnEl.id){
    photoTargeter(e);
    deleteCards(e);
    emptyMessage(images);
  }
}

function showMore() {
  mainEl.innerHTML = '';
  images = JSON.parse(localStorage.getItem('images')) || [];
  i = 0;
  images.forEach(function(){
      displayCards(images);
  
  })
}

function addToAlbum (event) {
  event.preventDefault();
  create();
  emptyMessage(images);
}

function deleteCards(e) { 
  var i = images.indexOf(targetImage[0]);
  var newPhoto = new Photo(images[i].id, images[i].title, images[i].caption, images[i].favorited);
  images.splice(i, 1);
  newPhoto.updateStorage();
  newPhoto.saveToStorage();
  mainEl.innerHTML = '';
  loadFromNew(images);

}

function favoriteCards(e) {
  var i = images.indexOf(targetImage[0]);
  var newPhoto = new Photo(images[i].id, images[i].title, images[i].caption, images[i].favorited);
  if(images[i].favorited === false){
    newPhoto.favorited = true;
    e.target.classList.add('favorite-btn-active');
  } 
  else {
    e.target.classList.remove('favorite-btn-active')
  }
  images.splice(i, 1, newPhoto);
  newPhoto.updateStorage();
  newPhoto.saveToStorage();
}

function viewFavorites(event) {
  event.preventDefault();
  images = JSON.parse(localStorage.getItem('images')) || [];
  var favoriteList = [];
  images.forEach(image => {
    if(image.favorited == true)
      favoriteList.push(image);
  })
  mainEl.innerHTML ='';
  loadFromNew(favoriteList);
}

function searchCards() {
  images = JSON.parse(localStorage.getItem('images')) || [];
  var searchInputVal = searchInputEl.value;
  var searchQuery = searchInputVal.toLowerCase();
  var searchResults = [];
  images.forEach(image => {
    if(image.title.toLowerCase().includes(searchQuery) || image.caption.toLowerCase().includes(searchQuery)){
      searchResults.push(image)
    }
      mainEl.innerHTML ='';
      loadFromNew(searchResults);
  })
}


/* -- Targeting Functions -- */

function photoTargeter(e) {
  images = JSON.parse(localStorage.getItem('images'))
  var articleTarget = e.target.closest('article');
  targetImage = images.filter(function(item) {
    return item.id === parseInt(articleTarget.getAttribute('data-id'));
  })
}


// function appendPhotos() {
//   imagesArr.forEach(function (photo) {
//   photoGallery.innerHTML += `<img src=${photo.file} />`
//   })
// }

// function loadImg() {
//   console.log(input.files[0])
//   if (input.files[0]) {
//     reader.readAsDataURL(input.files[0]); 
//     reader.onload = addPhoto
//   }
// }

// function addPhoto(e) {
//   console.log(e.target.result);
//   var newPhoto = new Photo(Date.now(), e.target.result);
//   photoGallery.innerHTML += `<img src=${e.target.result} />`;
//   imagesArr.push(newPhoto);
//   newPhoto.saveToStorage(imagesArr);
// }