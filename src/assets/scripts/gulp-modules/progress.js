document.addEventListener('DOMContentLoaded', () => {
    const slider = new Swiper('.js-progress-slider', {
        loop: true,
        navigation: {
            nextEl: '.js-progress-slider-next',
            prevEl: '.js-progress-slider-prev',
        },
        speed: 700,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent(number) {
              const isWithZero = number < 10 ? `0${number}` : `${number}`;
              return isWithZero.slice(-2);
            },
            formatFractionTotal(number) {
              const isWithZero = number < 10 ? `0${number}` : `${number}`;
              return isWithZero.slice(-2);
            },
            renderFraction(currentClass, totalClass) {
              return (
                `<span class="${currentClass}"></span>` + `<span class="${totalClass}"></span>`
              );
            },
          }
    })

    $('.js-progress-slider-close').on('click', e => {
        e.preventDefault()
        $('.js-progress-slider').removeClass('show')
    })

    $('.js-progress-item').on('click', () => {
        $('.js-progress-slider').addClass('show')
    })
})