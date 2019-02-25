/* Global Variables */
//handle to 'click/delete'
//api calls 'fetch'

var addToAlbumEl = document.querySelector('.add-to-album-btn');
var captionInputEl = document.querySelector('#caption-input');
var chooseFileBtnEl = document.querySelector('.choose-file-btn');
var emptyEl = document.querySelector('.empty')
var favBtnEl = document.querySelector('.favorite-btn');
var fileInputEl = document.querySelector('.file-input');
var images;
var mainEl = document.querySelector('main');
var photoImgEl = document.querySelector('photo-img');
var reader = new FileReader();
var searchBtnEl = document.querySelector('.search-btn');
var searchInputEl = document.querySelector('#search');
var showMoreBtnEl = document.querySelector('.show-more-btn');
var titleInputEl = document.querySelector('#title-input');
var viewFavoritesBtnEl = document.querySelector('.view-favorites-btn');
var bodyEl = document.querySelector('body');

/* Event Listeners */

//rename verb to front
addToAlbumEl.addEventListener('click', addToAlbum);
fileInputEl.addEventListener('change', chooseFile);
mainEl.addEventListener('click', buttonListener);
searchBtnEl.addEventListener('click', searchCards);
searchInputEl.addEventListener('keyup', searchChecker);
showMoreBtnEl.addEventListener('click', showMore);
viewFavoritesBtnEl.addEventListener('click', viewFavoriteToggle);
window.addEventListener('load', loadFromStorage);
window.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        editCard(e);
        e.target.setAttribute("contentEditable", false);
    }
  }) 

/* Functions */
function chooseFile(){
 var file = document.querySelector('.file-input').files[0];
 if (file){
    reader.readAsDataURL(file);
    reader.onloadend = create;
  }
}

function addPhoto(e) {
 return e.target.result;
}

/* Create Card */

function create(e) {
   var cardId = Date.now();
   var titleInputVal = titleInputEl.value;
   var captionInputVal = captionInputEl.value;
   var fileVal = addPhoto(e);
   var newPhoto = new Photo(cardId, titleInputVal, captionInputVal, fileVal);
    if(newPhoto.title && newPhoto.caption &&  newPhoto.file != ''){
    images.push(newPhoto);
  }
    else{
      alert('stop')
    }
    newPhoto.saveToStorage();
}

function displayCreate(images){
   if(captionInputEl.value && titleInputEl.value != ''){
    i = images.length - 1;
    generateCard(images[i].id, images[i].title, images[i].caption, images[i].file);
  }
}

function generateCard(id, title, caption, file) {
  event.preventDefault();
  var card = `<article class="photo" data-id=${id}>
      <section class="photo-title">
        <h2 contentEditable="true">${title}</h2>
      </section>
      <section class="photo-img-wrapper">
        <img class ="photo-img" src='${file}'>
      </section>
      <section class="photo-caption">
        <p contentEditable="true">${caption}</p>
      </section>
      <section class="photo-btns">
        <button id="trash-btn" class="trash-btn"></button>
        <button id="favorite-btn" class="favorite-btn"></button>
      </section>
    </article>`
    mainEl.insertAdjacentHTML('afterbegin', card);
}

function clearInputs() {
  titleInputEl.value = '';
  captionInputEl.value = '';
}

/* -- load cards -- */

//Refactor to 1 function logic for local storage or new array. if images has value update otherwise default to local storage

function loadFromNew(images) {
  images;
  i = 0;
  if(images.length != 0 && images.length > 10){
    let arrLength = parseInt(images.length);
    let arrLengthMax = parseInt(images.length - 10);
    images = images.slice(arrLengthMax, arrLength);
    images.forEach(function(){
    displayCards(images);
    })
  }
    else if(images.length !=0 && images.length <  10){
      images.forEach(function(){
      displayCards(images);
      })
    }
  }

// look through and change let/const/var

function loadFromStorage() {
  images = JSON.parse(localStorage.getItem('images')) || [];
  emptyMessage(images);
  i = 0;
  if(images.length != 0 && images.length > 10){
    const arrLength = parseInt(images.length);
    const arrLengthMax = parseInt(images.length - 10);
    images = images.slice(arrLengthMax, arrLength);
    images.forEach(function(){
    displayCards(images);
    })
  }
    else if(images.length !=0 && images.length <  10){
      images.forEach(function(){
      displayCards(images);
      })
    }
}

function displayCards(images) {
  generateCard(images[i].id, images[i].title, images[i].caption, images[i].file);
  if(images[i].favorited){ 
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


/* -- button functions -- */
//document get by id  167/168
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
  }
}

function addToAlbum (event) {
  event.preventDefault();
  displayCreate(images);
  emptyMessage(images);
}

function showMore() {
  mainEl.innerHTML = '';
  i = 0;
  if(showMoreBtnEl.innerText === 'Show More'){
  showMoreBtnEl.innerText = 'Show Less';
  images = JSON.parse(localStorage.getItem('images')) || [];
  images.forEach(function(){
      displayCards(images);
  })
  }
  else{
    showMoreBtnEl.innerText = 'Show More';
    loadFromStorage(images);
  }
}

function searchChecker() {
  var favoritedImages = [];
  if (viewFavoritesBtnEl.innerText === 'View Favorites') {
    searchCards(images)
  }
  else {
    images.forEach(image => {
      if(image.favorited){ 
      favoritedImages.push(image);
    }
    })
      searchCards(favoritedImages);
  }
}

function searchCards(images) {
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

/* -- Card Functions --*/


//updatestorage/savetostorage into separate function
function deleteCards(e) { 
  var i = images.indexOf(targetImage[0]);
  var newPhoto = new Photo(images[i].id, images[i].title, images[i].caption, images[i].file, images[i].favorited);
  images.splice(i, 1);
  updateAndSaveToStorage(i, newPhoto);
  mainEl.innerHTML = '';
  loadFromNew(images);
}

function favoriteCards(e) {
  var i = images.indexOf(targetImage[0]);
  var newPhoto = new Photo(images[i].id, images[i].title, images[i].caption, images[i].file, images[i].favorited);
  if(!images[i].favorited){
    newPhoto.favorited = true;
    e.target.classList.add('favorite-btn-active');
  } 
  else {
    e.target.classList.remove('favorite-btn-active')
  }
  images.splice(i, 1, newPhoto);
  updateAndSaveToStorage(i, newPhoto);
}

function viewFavoriteToggle(event) {
  event.preventDefault();
  if (viewFavoritesBtnEl.innerText === 'View Favorites'){
    viewFavorites();
    viewFavoritesBtnEl.innerText = 'View All Photos';
  }
  else {
    mainEl.innerHTML = '';
    loadFromNew(images);
    viewFavoritesBtnEl.innerText = 'View Favorites';
  }
}

function viewFavorites(event) {
  images = JSON.parse(localStorage.getItem('images')) || [];
  var favoriteList = [];
  images.forEach(image => {
    if(image.favorited)
      favoriteList.push(image);
  })
  mainEl.innerHTML ='';
  loadFromNew(favoriteList);
}


/* -- Editing Card Functions -- */ 

//on blur event
function editCard(e) {
  photoTargeter(e);
  var newPhoto = new Photo(targetImage[0].id, targetImage[0].title, targetImage[0].caption, targetImage[0].file, targetImage[0].favorited);
  i = images.indexOf(targetImage[0]);
  if(e.target.tagName === 'H2'){
  e.target.setAttribute("contentEditable", true);
  newPhoto.title = e.target.innerHTML;
 }
  else if(e.target.tagName === 'P'){
  e.target.setAttribute("contentEditable", true);
  newPhoto.caption = e.target.innerHTML;
  }
  else if(e.target.tagName ==='IMG'){
  }
  images.splice(i, 1, newPhoto);
  updateAndSaveToStorage(i, newPhoto);
}

function updateAndSaveToStorage(i, newPhoto){
 newPhoto.updateStorage(i, newPhoto);
 newPhoto.saveToStorage;
}

/* -- Targeting Functions -- */

function photoTargeter(e) {
  images = JSON.parse(localStorage.getItem('images'))
  var articleTarget = e.target.closest('article') || e.target;
  targetImage = images.filter(function(item) {
    return item.id === parseInt(articleTarget.getAttribute('data-id'));
  })
}

