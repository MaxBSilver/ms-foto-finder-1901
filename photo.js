class Photo {
  constructor(id, title, caption){
    this.id = id;
    this.title = tile;
    this.caption = caption;
    saveToStorage();
  }
  saveToStorage() {
    var stringifiedPhotos = JSON.stringify(ideas);
    localStorage.setItem('ideas', stringifiedPhotos);
  }
}