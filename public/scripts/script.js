  
  function createBookCard(book) {
    return `
          <div class="carousel-item">
              <div class="book-card">
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
          <div class="carousel">
              <h2>${category}</h2>
              <div class="carousel-content">
                  ${books.map(createBookCard).join("")}
              </div>
              <button class="carousel-button carousel-prev">&lt;</button>
              <button class="carousel-button carousel-next">&gt;</button>
          </div>
      `
    return carouselHtml
  }
  
  function initCarousels() {
    const carouselsContainer = document.getElementById("carousels-container")
    const categories = [
        "Fiction",
        "Mystery",
        "Fantasy",
        // "Romance",
        // "Sports",
        // "Literature",
        // "Law",
        // "Education",
        // "Technology",
        // "Business"
      ];
  
    for(const category of categories){
      const categoryBooks = async (category)=>{
        try{
            const response = await fetch(`/getbooks?subject=${category}`);
            const data = await response.json();
            carouselsContainer.innerHTML += createCarousel(category, data);
        }
        catch(error){
            console.log(error);
        }
      }
      categoryBooks(category);
    }
  
    const carousels = document.querySelectorAll(".carousel")
    carousels.forEach((carousel) => {
      const content = carousel.querySelector(".carousel-content")
      const prevBtn = carousel.querySelector(".carousel-prev")
      const nextBtn = carousel.querySelector(".carousel-next")
      console.log(prevBtn)
      console.log(nextBtn)
      let position = 0
  
      function updateCarouselPosition() {
        content.style.transform = `translateX(${position}px)`
      }
  
      function moveCarousel(direction) {
        const itemWidth = content.children[0].offsetWidth
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth)
        const moveAmount = itemWidth * visibleItems
        const maxPosition = -(content.scrollWidth - carousel.offsetWidth)
  
        if (direction === "prev") {
          position = Math.min(position + moveAmount, 0)
        } else {
          position = Math.max(position - moveAmount, maxPosition)
        }
  
        updateCarouselPosition()
      }
  
      prevBtn.addEventListener("click", () => {
        console.log("prevButton clicked");
        moveCarousel("prev");
        })
      nextBtn.addEventListener("click", () => moveCarousel("next"))
  
      // Adjust carousel on window resize
      window.addEventListener("resize", () => {
        position = 0
        updateCarouselPosition()
      })
    })
  }
  
  document.addEventListener("DOMContentLoaded", initCarousels)
  
  