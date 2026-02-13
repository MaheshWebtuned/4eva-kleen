/* -----------------------------------------------------------

[ Custom Settings ]

01. ScrollIt
02. Preloader
03. Navbar scrolling background
04. Close navbar-collapse when a clicked
05. Close mobile menu "on click"
06. Sections background image from data background 
07. Slider & Slider-Fade owlCarousel
08. Services owlCarousel
09. Services 2 owlCarousel
10. Team owlCarousel
11. Portfolio owlCarousel
12. Portfolio Home owlCarousel 
13. Services owlCarousel
14. Services 2 owlCarousel
15. Testimonials owlCarousel
16. Portfolio owlCarousel
17. Blog owlCarousel
18. MagnificPopup (Image, Youtube, Vimeo & Custom PopUp)
19. Accordion
20. Isotope Active Masonry Gallery
21. Animations
22. YouTubePopUp
23. Scroll back to top

----------------------------------------------------------- */

$(function () {
    "use strict";
    var wind = $(window);
    // ScrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    });






    // Preloader (make sure jQuery is loaded before this)
    $(window).on("load", function () {
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(600).fadeOut(600);
    });





    // Navbar scrolling background
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        } else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        }
    });




    // Close navbar-collapse when a clicked
    $(".navbar-nav .dropdown-item a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // Close mobile menu "on click"
    $(function () {
        var navMain = $(".scroll-init");
        navMain.on("click", "a", null, function () {
            navMain.collapse('hide');
        });
    });







    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });




    // Slider & Slider-Fade owlCarousel  
    $(document).ready(function () {
        var owl = $('.header .owl-carousel');
        // Slider owlCarousel - (Inner Page Slider)
        $('.slider .owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 5000,
            nav: true,
            navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
            responsiveClass: true,
            responsive: {
                0: {
                    dots: false,
                },
                600: {
                    dots: false,
                },
                1000: {
                    dots: false,
                }
            }
        });
        $('.slider-fade .owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 5000,
            animateOut: 'fadeOut',
            nav: true,
            navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
        });
        owl.on('changed.owl.carousel', function (event) {
            var item = event.item.index - 2; // Position of the current item
            $('h6').removeClass('animated fadeInUp');
            $('h1').removeClass('animated fadeInUp');
            $('h2').removeClass('animated fadeInUp');
            $('h5').removeClass('animated fadeInUp');
            $('p').removeClass('animated fadeInUp');
            $('.car-features').removeClass('animated fadeInRight');
            $('.button-1').removeClass('animated fadeInUp');
            $('.button-2').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h6').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h2').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h5').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.car-features').addClass('animated fadeInRight');
            $('.owl-item').not('.cloned').eq(item).find('.button-1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.button-2').addClass('animated fadeInUp');
        });
    });











    // Home services indicator


    // Home services indicator















    // MagnificPopup
    $(".img-zoom").magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        mainClass: "mfp-fade",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        }
    })


    $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });















    // Accordion
    const faqs = document.querySelectorAll(".faq-item");

    faqs.forEach((faq) => {
        faq.querySelector(".faq-question").addEventListener("click", () => {
            faqs.forEach((item) => {
                if (item !== faq) item.classList.remove("active");
            });
            faq.classList.toggle("active");
        });
    });

















    // HOME SERVICES SECTION


        // Desktop hover effect
        if (window.innerWidth > 767) {
            const serviceItems = document.querySelectorAll('.service-item');
            const serviceImages = document.querySelectorAll('.service-image');

            serviceItems.forEach(item => {
                item.addEventListener('mouseenter', function () {
                    const imageType = this.getAttribute('data-image');

                    serviceImages.forEach(img => {
                        img.classList.remove('active');
                    });

                    const targetImage = document.querySelector(`.service-image[data-service="${imageType}"]`);
                    if (targetImage) {
                        targetImage.classList.add('active');
                    }

                    serviceItems.forEach(si => si.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        } else {
            // Mobile click to show/hide image
            const serviceItems = document.querySelectorAll('.service-item');
            const mobileImages = document.querySelectorAll('.mobile-image');

            serviceItems.forEach((item, index) => {
                item.addEventListener('click', function (e) {
                    e.preventDefault();

                    const mobileImg = document.getElementById(`mobile-img-${index}`);
                    const isVisible = mobileImg.style.display === 'block';

                    // Hide all images first
                    mobileImages.forEach(img => {
                        img.style.display = 'none';
                        img.classList.remove('show');
                    });

                    if (!isVisible) {
                        // Show the clicked image
                        mobileImg.style.display = 'block';
                        setTimeout(() => {
                            mobileImg.classList.add('show');
                        }, 10);

                        // Redirect after showing image
                        setTimeout(() => {
                            window.location.href = this.getAttribute('href');
                        }, 1200);
                    } else {
                        // If already visible, just redirect
                        window.location.href = this.getAttribute('href');
                    }
                });
            });
        }

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                location.reload();
            }, 250);
        });



    // HOME SERVICES SECTION





















    // GALLERY PAGE SECTION


    document.addEventListener("DOMContentLoaded", () => {

        const images = document.querySelectorAll(".gallery-img");
        const modal = document.getElementById("lightbox-modal");
        const modalBody = modal.querySelector(".lightbox-content");
        const bsModal = new bootstrap.Modal(modal);

        const btnEnlarge = document.querySelector(".btn-fullscreen-enlarge");
        const btnExit = document.querySelector(".btn-fullscreen-exit");

        function buildCarousel(startIndex) {
            let slides = "";
            let indicators = "";

            images.forEach((img, i) => {
                slides += `
        <div class="carousel-item ${i === startIndex ? "active" : ""}">
          <img src="${img.src}" class="d-block w-100 img-fluid">
        </div>`;

                indicators += `
        <button type="button"
          data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          class="${i === startIndex ? "active" : ""}">
        </button>`;
            });

            modalBody.innerHTML = `
      <div id="lightboxCarousel" class="carousel slide carousel-fade">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${slides}</div>

        <button class="carousel-control-prev"
          type="button"
          data-bs-target="#lightboxCarousel"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>

        <button class="carousel-control-next"
          type="button"
          data-bs-target="#lightboxCarousel"
          data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>`;
        }

        images.forEach((img, index) => {
            img.addEventListener("click", () => {
                buildCarousel(index);
                bsModal.show();

                // 🔥 IMPORTANT: init carousel AFTER modal opens
                modal.addEventListener("shown.bs.modal", () => {
                    const carouselEl = document.getElementById("lightboxCarousel");
                    new bootstrap.Carousel(carouselEl);
                }, { once: true });
            });
        });

        btnEnlarge.addEventListener("click", () => {
            modal.requestFullscreen();
            btnEnlarge.classList.add("d-none");
            btnExit.classList.remove("d-none");
        });

        btnExit.addEventListener("click", () => {
            document.exitFullscreen();
            btnExit.classList.add("d-none");
            btnEnlarge.classList.remove("d-none");
        });

    });

    // GALLERY PAGE SECTION




















    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    $(function () {
        contentWayPoint();
    });






    // YouTubePopUp
    $("a.vid").YouTubePopUp();








    // Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })

});














// HOME PAGE HERO SECTION JS

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.contents = document.querySelectorAll('.content-wrapper');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto play
        this.startAutoPlay();

    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.isTransitioning = true;

        // Fade out current content
        this.contents[this.currentIndex].classList.remove('active');

        // Remove active from current slide and indicator
        this.slides[this.currentIndex].classList.remove('active');
        this.slides[this.currentIndex].classList.add('fade-out');
        this.indicators[this.currentIndex].classList.remove('active');

        // Update index
        this.currentIndex = index;

        // Add active to new slide and indicator
        setTimeout(() => {
            this.slides.forEach(slide => slide.classList.remove('fade-out'));
            this.slides[this.currentIndex].classList.add('active');
            this.indicators[this.currentIndex].classList.add('active');

            // Fade in new content with slight delay
            setTimeout(() => {
                this.contents[this.currentIndex].classList.add('active');
                this.isTransitioning = false;
            }, 100);
        }, 100);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // Change slide every 6 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}







// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});






