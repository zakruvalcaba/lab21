/*eslint-env browser*/

// HELPER FUNCTION TO SELECT ELEMENT FROM THE DOM
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
var createSlideShow = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var timer, play = true, nodes, img, stopSlideShow, displayNextImage, setPlayText;
    
    nodes = {image: null, caption: null};
    img = {cache: [], counter: 0};
    
    stopSlideShow = function () {
        clearInterval(timer);
    };
    displayNextImage = function () {
        // IF THE SLIDE SHOW REACHES THE END
        if (img.counter === img.cache.length) {
            img.counter = 0;        // START BACK AT THE BEGINNING
        } else {
            img.counter += 1;       // OTHERWISE PROCEED TO NEXT SLIDE
        }
        // CREATE A NEW IMAGE OBJECT FROM THE IMAGE STORED IN THE TEMP ARRAY (CACHE)
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.image.innerHTML = image.title;
    };
    setPlayText = function (btn) {
        if (play) {
            btn.value = "Resume";
        } else {
            btn.value = "Pause";
        }
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE MEMBERS
    return {
        loadImages: function (slides) {
            var image, i;
            // LOOP THROUGH COLLECTION OF SLIDES
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();            // CREATE NEW IMAGE OBJECT
                image.src = slides[i].href;     // SET THE SOURCE OF THE IMAGE
                image.title = slides[i].title;  // SET THE TITLE OF THE IMAGE
                img.cache.push(image);          // PUSH IMAGE TO THE TEMP ARRAY (CACHE)
            }
            return this;
        },
        startSlideShow: function () {
            // CAPTURE IMAGE AND CAPTION
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            // SET TIMER
            timer = setInterval(displayNextImage, 4000);
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY FLAG
                play = !play;
            };
        }
    };
};

// CREATE THE SLIDE SHOW OBJECT
var slideshow = createSlideShow();

window.addEventListener("load", function () {
    "use strict";
    // CREATE AN ARRAY OF SLIDES
    var slides = [
        {href: "images/backpack.jpg", title: "He backpacks in the Sierras often."},
        {href: "images/boat.jpg", title: "He loves his boat."},
        {href: "images/camaro.jpg", title: "He loves his Camaro more."},
        {href: "images/punk.jpg", title: "He used to be in a punk band that toured with No Doubt and Sublime."},
        {href: "images/race.jpg", title: "He is active and loves obstacle course racing."}
    ];
    // START SLIDE SHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE/PLAY SLIDE SHOW
    $("play_pause").addEventListener("click", slideshow.createToggleHandler());
});