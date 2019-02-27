var addToAlbumEl = document.querySelector('.add-to-album-btn');
var captionInputEl = document.querySelector('#caption-input');
var chooseFileBtnEl = document.querySelector('.choose-file-btn');
var emptyEl = document.querySelector('.empty');
var favBtnEl = document.querySelector('.favorite-btn');
var fileInputEl = document.querySelector('.file-input');
var mainEl = document.querySelector('main');
var photoImgEl = document.querySelector('photo-img');
var reader = new FileReader();
var searchBtnEl = document.querySelector('.search-btn');
var searchInputEl = document.querySelector('#search');
var showMoreBtnEl = document.querySelector('.show-more-btn');
var titleInputEl = document.querySelector('#title-input');
var viewFavoritesBtnEl = document.querySelector('.view-favorites-btn');
var fotos;
var headerEl = document.querySelector('header');


window.addEventListener('load', loadStorage);
window.addEventListener('load', toggleShowMore);
window.addEventListener('load', toggleViewFavorites);
document.addEventListener('click', toggleViewFavorites);
mainEl.addEventListener('focusout', function(e) {
  if(e != undefined){
    editFoto(e);
  }
});
viewFavoritesBtnEl.addEventListener('click', searchChecker);
headerEl.addEventListener('change', toggleAddToAlbum);
addToAlbumEl.addEventListener('click', addFoto);
fileInputEl.addEventListener('change', chooseFotoFile);
showMoreBtnEl.addEventListener('click', handleShowMore);
viewFavoritesBtnEl.addEventListener('click', toggleView);
searchInputEl.addEventListener('keyup', searchChecker);
mainEl.addEventListener('click', buttonListener);
window.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    editFoto(e);
    e.target.blur();
  }
});

function create(e) {
  var cardId = Date.now();
  var titleInputVal = titleInputEl.value;
  var captionInputVal = captionInputEl.value;
  var fileVal = addPhoto(e);
  var newPhoto = new Photo(cardId, titleInputVal, captionInputVal, fileVal);
  if(newPhoto.title || newPhoto.caption || newPhoto.file != ''){
    fotos.push(newPhoto);
    newPhoto.saveToStorage();
  }
  toggleShowMore();
}

function display(fotos){
  i = fotos.length - 1;
  if(captionInputEl.value != '' && titleInputEl.value != '' && fileInputEl.value != ''){
    generateCard(fotos[i].id, fotos[i].title, fotos[i].caption, fotos[i].file);
    clearInputs();
  } else{
     clearInputs();
     alert('Missing a title, caption, or file!')
  }
}

function addPhoto(e) {
  return e.target.result;
}

function chooseFotoFile(){
 var imgFile = document.querySelector('.file-input').files[0];
 if (imgFile){
    reader.readAsDataURL(imgFile);
    reader.onloadend = create;
  }
}

function clearInputs() {
  titleInputEl.value = '';
  captionInputEl.value = '';
  fileInputEl.value = '';
}

function generateCard(id, title, caption, file) {
  var foto = `<article class="photo" data-id=${id}>
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
    mainEl.insertAdjacentHTML('afterbegin', foto);
}

function displayFotos(fotos) {
  generateCard(fotos[i].id, fotos[i].title, fotos[i].caption, fotos[i].file);
  if(fotos[i].favorited){ 
    let favorite = document.querySelector('.favorite-btn');
    favorite.classList.add('favorite-btn-active');
  }
  i++;
}

function emptyMessage(fotos){
  if(fotos.length == 0) {
    emptyEl.classList.remove('hidden');
  }
  else {
    emptyEl.classList.add('hidden');
  }
}

function loadFromNew(fotos) {
  i = 0;
  if(fotos.length != 0 && fotos.length >= 10){
    const arrLength = parseInt(fotos.length);
    const arrLengthMax = parseInt(fotos.length - 10);
    fotos = fotos.slice(arrLengthMax, arrLength);
    iterateFotos(fotos);
  } else if(fotos.length >= 0 && fotos.length <=  10){
      iterateFotos(fotos);
  }
}

function loadStorage() {
  fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  emptyMessage(fotos);
  i = 0;
  if(fotos.length != 0 && fotos.length >= 10){
    const arrLength = parseInt(fotos.length);
    const arrLengthMax = parseInt(fotos.length - 10);
    fotos = fotos.slice(arrLengthMax, arrLength);
    iterateFotos(fotos);
  } else if(fotos.length !=0 && fotos.length <=  10){
      iterateFotos(fotos);
  }
}

function updateThenSave(i, newPhoto){
  newPhoto.updateStorage(i, newPhoto);
  newPhoto.saveToStorage();
}


function iterateFotos(fotos){
  mainEl.innerHTML = '';
  fotos.forEach(function(){
    displayFotos(fotos);
  })
}



function toggleViewFavorites(){
  fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  var favoriteList = [];
  fotos.forEach(fotos => {if(fotos.favorited) favoriteList.push(fotos);
  })
  if(favoriteList.length > 0){
    viewFavoritesBtnEl.classList.remove('disabled-btn')
    viewFavoritesBtnEl.disabled = false;
  } else{
      viewFavoritesBtnEl.classList.add('disabled-btn')
      viewFavoritesBtnEl.disabled = true;
  }
}

function addFoto(e) {
  e.preventDefault();
  display(fotos);
  emptyMessage(fotos);
}

function handleShowMore() {
  event.preventDefault();
  i = 0;
  if(showMoreBtnEl.innerText === 'Show More'){
    viewFavoritesBtnEl.innerText = 'View Favorites';
    showMoreBtnEl.innerText = 'Show Less';
    iterateFotos(fotos);} 
    else{
      viewFavoritesBtnEl.innerText = 'View Favorites';
      showMoreBtnEl.innerText = 'Show More';
      loadStorage(fotos);
   }
}

function searchChecker() {
  var favoritedFotos = [];
  if (viewFavoritesBtnEl.innerText === 'View Favorites') {
    searchFotos(fotos);
  }
  else {
    fotos.forEach(fotos => {
      if(fotos.favorited){ 
      favoritedFotos.push(fotos);}
    })
    searchFotos(favoritedFotos);
  }
}

function searchFotos(fotos) {
  var searchInputVal = searchInputEl.value;
  var searchQuery = searchInputVal.toLowerCase();
  var searchResults = [];
  fotos.forEach(fotos => {
    if(fotos.title.toLowerCase().includes(searchQuery) || fotos.caption.toLowerCase().includes(searchQuery)){
      searchResults.push(fotos)
    }
    loadFromNew(searchResults);
  })
}


function viewFavorites() {
  fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  var favoriteList = [];
  fotos.forEach(fotos => {
    if(fotos.favorited)
    favoriteList.push(fotos);
    })
  loadFromNew(favoriteList);
  searchFotos(favoriteList);
}

function buttonListener(e) {
  var favoriteBtnEl = document.querySelector('#favorite-btn');
  var trashBtnEl = document.querySelector('#trash-btn');
  var targetImage;
  if(e.target.id == favoriteBtnEl.id) {
    photoTargeter(e);
    favoriteCards(e);
  } else if(e.target.id == trashBtnEl.id){
     photoTargeter(e);
     deleteCards(e);
  }
}

function deleteCards(e) { 
  event.preventDefault()
  let i = fotos.indexOf(targetImage[0]);
  var newPhoto = new Photo(fotos[i].id, fotos[i].title, fotos[i].caption, fotos[i].file, fotos[i].favorited);
  newPhoto.deleteFromStorage(i, newPhoto, fotos);
  if(showMoreBtnEl.innerText === 'Show Less' || viewFavoritesBtnEl.innerText === 'View All Photos') {
    deleteDuringFavorite(fotos);
    deleteDuringShowMore(fotos); 
  } else{
    loadFromNew(fotos);
  }
  toggleShowMore();
}

function deleteDuringFavorite(fotos){
  if(viewFavoritesBtnEl.innerText === 'View All Photos'){
    viewFavorites(fotos);
  }
}

function deleteDuringShowMore(){
  if(showMoreBtnEl.innerText === 'Show Less'){
    i=0;
    fotos = JSON.parse(localStorage.getItem('fotos')) || [];
    iterateFotos(fotos);
  }
}


function favoriteCards(e) {
  var i = fotos.indexOf(targetImage[0]);
  var newPhoto = new Photo(fotos[i].id, fotos[i].title, fotos[i].caption, fotos[i].file, fotos[i].favorited);
  if(!fotos[i].favorited){
    newPhoto.favorited = true;
    e.target.classList.add('favorite-btn-active');
  } else {
      e.target.classList.remove('favorite-btn-active')
  }
  fotos.splice(i, 1, newPhoto);
  updateThenSave(i, newPhoto);
}

function editFoto(e) {
  photoTargeter(e);
  var newPhoto = new Photo(targetImage[0].id, targetImage[0].title, targetImage[0].caption, targetImage[0].file, targetImage[0].favorited);
  i = fotos.indexOf(targetImage[0]);
  if(e.target.tagName === 'H2'){
    newPhoto.title = e.target.innerHTML;
    saveEdit(e, i, newPhoto);
  } else if(e.target.tagName === 'P'){
      newPhoto.caption = e.target.innerHTML;
      saveEdit(e, i, newPhoto);
  }
}

function saveEdit(e, i, newPhoto, caption, property){
    fotos.splice(i, 1, newPhoto);
    updateThenSave(i, newPhoto);
}

function photoTargeter(e) {
  fotos = JSON.parse(localStorage.getItem('fotos'));
  var articleTarget = e.target.closest('article') || e.target;
  targetImage = fotos.filter(function(item) {
    return item.id === parseInt(articleTarget.getAttribute('data-id'));
  })
}
function toggleView(event) {
  event.preventDefault();
  if (viewFavoritesBtnEl.innerText === 'View Favorites'){
    viewFavorites();
    viewFavoritesBtnEl.innerText = 'View All Photos';
    showMoreBtnEl.innerText = 'Show More';
  } else {
      loadFromNew(fotos);
      searchFotos(fotos);
      viewFavoritesBtnEl.innerText = 'View Favorites';
  }
}

function toggleAddToAlbum(){
  if(captionInputEl.value != '' && titleInputEl.value != '' && fileInputEl.value != ''){
    addToAlbumEl.disabled = false;
    addToAlbumEl.classList.remove('disabled-btn');
  } else{
      addToAlbumEl.disabled = true;
      addToAlbumEl.classList.add('disabled-btn');
  }
}

function toggleShowMore(){
  fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  if(fotos.length <= 10 ){
    showMoreBtnEl.disabled = true;
    showMoreBtnEl.classList.add('disabled-btn');
    showMoreBtnEl.innerText ='Show More';
  } else {
    showMoreBtnEl.classList.remove('disabled-btn');
    showMoreBtnEl.disabled = false;
  }
}