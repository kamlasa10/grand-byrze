document.addEventListener('DOMContentLoaded', () => {
  const sliders = $('.js-tablet-slider');

  $(window)
    .on('resize', () => {
      if ($(window).width() <= 850) {
        sliders.each((_, item) => {
          const slider = new Swiper(item, {
            speed: 700,
            adaptiveHeight: true,
            spaceBetween: 20,
            slidesPerView: 2.3,
          });
        });
      }
    })
    .resize();
});
