document.addEventListener('DOMContentLoaded', () => {
  const panorama = $('.panorama');

  $(window)
    .on('resize', () => {
      let avaliablesHeight = 'auto';

      if ($(window).width() <= 1025) {
        avaliablesHeight =
          document.documentElement.clientHeight - $('.page-top').outerHeight() / 1.4;
        panorama.height(avaliablesHeight + 'px');
      }
    })
    .resize();
});
