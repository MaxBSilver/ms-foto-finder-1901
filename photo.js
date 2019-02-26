//anything that changes photo should be in here 

class Photo {
  constructor(id, title, caption, file){
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorited = false;
    this.saveToStorage();
  }

  saveToStorage() {
    var stringifiedPhotos = JSON.stringify(fotos);
    localStorage.setItem('fotos', stringifiedPhotos);
  }

  updateStorage(fotos) {
    localStorage.setItem('fotos', JSON.stringify(fotos));
  }

  deleteFromStorage(i, newPhoto){
    var fotos = JSON.parse(localStorage.getItem('fotos'));
    console.log(fotos);
    fotos.splice(i, 1);
    console.log(fotos)
    this.updateStorage(fotos);
    mainEl.innerHTML = '';
  }
}