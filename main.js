/* Global Variables */

var titleInputEl = document.querySelector('#title-input');
var addToAlbumEl = document.querySelector('.add-to-album-btn');
var captionInputEl = document.querySelector('#caption-input');
var chooseFileBtnEl = document.querySelector('.choose-file-btn');
var mainEl = document.querySelector('main');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
// var reader = new FileReader();
/* Event Listeners */
// window.addEventListener('load', appendPhotos);
addToAlbumEl.addEventListener('click', create);

/* Functions */
function create() {
   var cardId = Date.now();
   var cardTitleVal = titleInputEl.value;
   var captionInputVal = captionInputEl.value;
   generateCard(cardId, cardTitleVal, captionInputVal);
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