document.addEventListener('DOMContentLoaded', () => {
    const panorama = $('.panorama')

    $(window).on('resize', () => {
        if($(window).width() <= 1025) {
            const avaliablesHeight = document.documentElement.clientHeight - $('.page-top').outerHeight() + (panorama.width() / 100) * 7
            panorama.height(avaliablesHeight + 'px')
        }
    }).resize()
})