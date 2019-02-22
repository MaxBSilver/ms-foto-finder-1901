var addToAlbumEl = document.querySelector('add-to-album-btn');
var titleInputEl = document.querySelector('title-input');
var captionInputEl = document.querySelector('caption-input');
var chooseFileBtnEl = document.querySelector('choose-file-btn');
var photoGallery = document.querySelector('.images');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

window.addEventListener('load', appendPhotos);
create.addEventListener('click', loadImg);

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    photoGallery.innerHTML += `<img src=${photo.file} />`
  })
}

function loadImg() {
  console.log(input.files[0])
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), e.target.result);
  photoGallery.innerHTML += `<img src=${e.target.result} />`;
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
}