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

  updateStorage(i, newPhoto) {
    localStorage.setItem('fotos', JSON.stringify(fotos));
  }
}