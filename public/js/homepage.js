var myCarousel = document.querySelector('#carouselExampleDark')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 5000,
  wrap: true
})

myCarousel.addEventListener('slide.bs.carousel', function () {
  // do something...
})