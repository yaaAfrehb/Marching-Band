const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

const dots = document.querySelectorAll(".carousel-dots .dot");

let currentSlide = 0;


function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");
}


nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});


prevButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showSlide(index);
    });

});


/* Automatically change every 5 seconds */

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);