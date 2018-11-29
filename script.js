function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll(".slide-in");

window.addEventListener("scroll", debounce(checkSlide));

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        // half wayt through the image
        const slideInAt =
            window.scrollY + window.innerHeight - sliderImage.height / 2; // will give us where the px level where we currently are at the bottom
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScolledPast = window.screenY < imageBottom;
        if (isHalfShown && isNotScolledPast) {
            sliderImage.classList.add("active");
        } else {
            sliderImage.classList.remove("active");
        }
    });
}
