document.addEventListener('DOMContentLoaded', () => {
    const sliders = $('.js-tablet-slider')

    $(window).on('resize', () => {
        if($(window).width() <= 850) {
            console.log(sliders)
            sliders.each((_, item) => {
                const slider = new Swiper(item, {
                    speed: 700,
                    autoHeight: true,
                    freeMode: false,
                    adaptiveHeight: true,
                    spaceBetween: 20,
                    allowTouchMove: true,
                    slidesPerView: 2.2
                })
            })
        }
    }).resize()
})