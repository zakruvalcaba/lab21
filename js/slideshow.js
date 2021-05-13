// GET ELEMENTS FROM THE DOM
const $ = (id) => {
    return document.getElementById(id);
};

// MAIN SLIDESHOW OBJECT
const slideshow = {
    timer: null,
    nodes: {image: null, caption: null},
    img: {cache: [], counter: 0},
    speed: 3000,
    loadImages: function (slides) {
        let image;
        for (let i = 0; i < slides.length; i++) {
            image = new Image();
            image.src = slides[i].href;
            image.title = slides[i].title;
            this.img.cache.push(image);
        }
        return this;
    },
    startSlideShow: function (image, caption) {
        this.nodes.image = image;
        this.nodes.caption = caption;
        this.timer = setInterval(this.displayNextImage.bind(this), this.speed);
        return this;
    },
    displayNextImage: function () {
        if (this.img.counter === this.img.cache.length - 1) {
            this.img.counter = 0;
        } else {
            this.img.counter++;
        }
        let image = this.img.cache[this.img.counter];
        this.nodes.image.src = image.src;
        this.nodes.caption.innerHTML = image.title;
    }
};

// WIRE UP SLIDESHOW ON LOAD
window.addEventListener('load', () => {
    // ARRAY OF SLIDES FOR SLIDESHOW
    const slides = [
        {href: 'images/backpack.jpg', title: 'He loves to backpack in the Sierras'},
        {href: 'images/boat.jpg', title: 'He loves his boat'},
        {href: 'images/camaro.jpg', title: 'He loves his Camaro more'},
        {href: 'images/punk.jpg', title: 'He used to be in a punk back and toured with No Doubt and Sublime'},
        {href: 'images/race.jpg', title: 'He loves obstacle course racing'},
        {href: 'images/wakeboard.jpg', title: 'He loves to wakeboard and wakesurf'}
    ]
    // BEGIN SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($('image'), $('caption'));
});