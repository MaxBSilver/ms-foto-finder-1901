class Photo {
  constructor(id, title, caption){
    this.id = id;
    this.title = title;
    this.caption = caption;
  }
  saveToStorage() {
    var stringifiedPhotos = JSON.stringify(images);
    localStorage.setItem('images', stringifiedPhotos);
  }
}