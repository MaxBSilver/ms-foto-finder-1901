/* Global Variables */

var titleInputEl = document.querySelector('#title-input');
var addToAlbumEl = document.querySelector('.add-to-album-btn');
var captionInputEl = document.querySelector('#caption-input');
var chooseFileBtnEl = document.querySelector('.choose-file-btn');
var imageArr = JSON.parse(localStorage.getItem('images')) || [];
var mainEl = document.querySelector('main');
var images = JSON.parse(localStorage.getItem('images')) || [];
// var reader = new FileReader();
/* Event Listeners */
window.addEventListener('load', loadCards);
addToAlbumEl.addEventListener('click', addToAlbum);

/* Functions */

function addToAlbum (event) {
  event.preventDefault();
  create();
}
function create() {
   var cardId = Date.now();
   var titleInputVal = titleInputEl.value;
   var captionInputVal = captionInputEl.value;
   var newPhoto = new Photo(cardId, titleInputVal, captionInputVal);
   images.push(newPhoto);
   generateCard(cardId, titleInputVal, captionInputVal);
   newPhoto.saveToStorage();
}

function generateCard(id, title, caption) {
  event.preventDefault();
  var card = `<article class="photo" id=${id}>
      <section class="photo-title">
        <h2>${title}</h2>
      </section>
      <section class="photo-img-wrapper">
        <img class ="photo-img" src="">
      <section class="photo-caption">
        <p>${caption}</p>
      </section>
      <section class="photo-btns">
        <button class="trash-btn"><img class="icon-styling" src="./fotofinder-assets/delete.svg" alt="Delete Icon"></button>
        <button class="favorite-btn"><img class="icon-styling" src="./fotofinder-assets/favorite.svg" alt="Favorite Icon"></button>
      </section>
    </article>`
    mainEl.insertAdjacentHTML('afterbegin', card);
    clearInputs();
}
function clearInputs() {
  titleInputEl.value = '';
  captionInputEl.value = '';
}

function loadCards() {
  console.log(imageArr)
  if(imageArr == []){
    return false;
  }
    else {
    i = 0;
    imageArr = JSON.parse(localStorage.images);
    imageArr.forEach(function(){
    generateCard(imageArr[i].id, imageArr[i].title, imageArr[i].caption);
    i++;
  })
  }
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