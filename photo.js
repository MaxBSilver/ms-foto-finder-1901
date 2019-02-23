class Photo {
  constructor(id, title, caption){
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.favorited = false;
    this.saveToStorage();
  }

  saveToStorage() {
    var stringifiedPhotos = JSON.stringify(images);
    localStorage.setItem('images', stringifiedPhotos);
  }

  updateStorage(i, newPhoto) {
    localStorage.setItem('images', JSON.stringify(images));
  }
}