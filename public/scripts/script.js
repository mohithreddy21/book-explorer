

  
  function createBookCard(book) {
    return `
          <div class="carousel-item">
              <div class="book-card" id="${book.key}">
                  <div class="book-card-content">
                      <div class="book-cover">
                          <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="Cover of ${book.title}">
                      </div>
                      <h3 class="book-title">${book.title}</h3>
                      <p class="book-author">${book.authors?.[0].name}</p>
                  </div>
              </div>
          </div>
      `
  }
  
  function createCarousel(category, books) {
    const carouselHtml = `
      <h2>${category}</h2>
      <div class="carousel-content">
          ${books.map(createBookCard).join("")}
      </div>
      <button class="carousel-button carousel-prev">&lt;</button>
      <button class="carousel-button carousel-next">&gt;</button>
      `;
    const newCarousel = document.createElement("div");
    newCarousel.setAttribute("class","carousel");
    newCarousel.innerHTML = carouselHtml;
    return newCarousel;
  }
  
  async function fetchCategoryBooks(category) {
    try{
      const response = await fetch(`/getbooks?subject=${category}`);
      const books = await response.json();
      return books;
    }
    catch(error){
      console.log(`Error fetching books for ${category}:`, error);
      return [];
    }
  }


function setupCarouselEventListeners(){
  document.querySelectorAll(".carousel").forEach((carousel)=>{
    const content = carousel.querySelector(".carousel-content");
    const books = content.querySelectorAll(".book-card");
    books.forEach((book)=>{
      book.addEventListener("click",function(){
        console.log(this.id);
        window.location.href = `/bookdetails?key=${this.id}`;
      })
    })
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    let position = 0;

    function updateCarouselPosition(){
      content.style.transform = `translateX(${position}px)`;
    }

    function movePosition(direction){
      const itemWidth = content.children[0].offsetWidth;
      const numberOfItems = Math.floor(carousel.offsetWidth/itemWidth);
      const movement = itemWidth * numberOfItems;
      const maxPosition = Math.min(0, -(content.scrollWidth - carousel.offsetWidth));

      if(direction == "prev"){
        position = Math.min(position + movement,0);
      }
      else{
        position = Math.max(position - movement,maxPosition);
      }
      updateCarouselPosition();
    }
    prevButton.addEventListener("click",()=>{
      movePosition("prev");
    });
    nextButton.addEventListener("click",()=>{
      movePosition("next");
    })
    document.addEventListener("resize",()=>{
      position = 0;
      updateCarouselPosition();
    })
  })

}





async function initCarousels() {
    const carouselsContainer = document.getElementById("carousels-container");
    const categories = [
        "Fiction",
        "Mystery",
        // "Fantasy",
        // "Romance",
        // "Sports",
        // "Literature",
        // "Law",
        // "Education",
        // "Technology",
        // "Business"
      ];
    for(const category of categories){
      const books = await fetchCategoryBooks(category);
      carouselsContainer.insertAdjacentElement("beforeend",createCarousel(category,books));
    }
    setupCarouselEventListeners();
  }



  
  document.addEventListener("DOMContentLoaded", initCarousels)
  
  