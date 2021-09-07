@@include('../libs/libs.js');

let menuTl = gsap.timeline();
const menu = document.querySelector('.js-menu');
const openMenu = document.querySelector('.js-menu-open');
const header = document.querySelector('.header');
const closeMenu = document.querySelector('.js-menu-close');
let mobilePopupTl = gsap.timeline();

function isSmoothScroll() {
  return window.locoScroll;
}

function stopScroll() {
  if (isSmoothScroll()) {
    window.locoScroll.stop();
    return;
  }

  document.body.style.overflow = 'hidden';
}

function startScroll() {
  if (isSmoothScroll()) {
    window.locoScroll.start();
    return;
  }

  document.body.style.overflow = 'visible';
}

function animationCloseMenu() {
  startScroll();

  menu.classList.remove('show');

  setTimeout(() => {
    header.classList.remove('hide');
  }, 200);
}

function animationShowMenu() {
  stopScroll();
  menuTl.kill();
  header.classList.add('hide');

  setTimeout(() => {
    menu.classList.add('show');
  }, 200);
}

openMenu.addEventListener('click', e => {
  e.preventDefault();
  animationShowMenu();
});

closeMenu.addEventListener('click', e => {
  e.preventDefault();
  animationCloseMenu();
});

function hidePopup() {
  $('[data-popup]').hide();
  $('.overlay').removeClass('show');
}

function showPopupByType(type) {
  $('[data-popup]').hide();

  if (!type) return;

  $(`[data-popup-name=${type}]`).show();
  $('.overlay').addClass('show');
}

showPopupByType();

document.addEventListener('DOMContentLoaded', () => {
  let pageId = document.body.getAttribute('id');

  switch (pageId) {
    case 'index-page':
      window.initCustomScroll();
      break;
    case 'features-page':
      window.initCustomScroll();
      break;
    case 'location-page':
      window.initCustomScroll(false);
      break;
    case 'investor-page':
      window.initCustomScroll();
      break;
    default:
      window.initCustomScroll(false);
  }
});

function showMobilePopup() {
  mobilePopupTl.clear();

  mobilePopupTl
    .to('.popup-actions', {
      opacity: 0,
      display: 'none',
      duration: 0.5,
    })
    .to('.popup-callback', {
      opacity: 1,
      display: 'block',
      duration: 0.5,
    });
}

function hideMobilePopup() {
  setTimeout(() => {
    $('.overlay').removeClass('open-popup');
    $('.popup').hide();
    $('.popup-actions')
      .show()
      .css('opacity', 1);
  }, 500);
}

$('.js-open-call').on('click', () => {
  hidePopup();
  startScroll();
  hideMobilePopup();
});

$('.js-popup-open').on('click', e => {
  e.preventDefault();
  mobilePopupTl.clear();
  const typeName = e.currentTarget.dataset.popupType;

  if ($(window).width() <= 480) {
    showMobilePopup();

    return;
  }

  showPopupByType(typeName);
});

$(document).on('click', e => {
  if (e.target === $('.overlay')[0]) {
    hidePopup();
    menuTl.clear();
    startScroll();
  }

  if ($(window).width() <= 480) {
    hideMobilePopup();
  }
});

$('.js-close-popup').on('click', e => {
  e.preventDefault();
  hidePopup();
  startScroll();
  console.log('close');

  if (e.currentTarget.dataset.close) {
    $('.js-popup[data-popup-name=callback]')
      .find('.popup__item')
      .removeClass('warn');
  }

  if ($(window).width() <= 480) {
    hideMobilePopup();
  }
});

$('[name=phone]').each(function() {
  if ($(this).hasClass('js-footer-phone')) {
    $(this).attr('placeholder', '+ (38) ___ - ___ - ____');
    $(this).inputmask('+ (38) 999 - 999 - 9999', { clearMaskOnLostFocus: false });
    return;
  }

  $(this).attr('placeholder', '+ (38) ___ - ___ - ____');
  $(this).inputmask('+ (38) 999 - 999 - 9999', { clearMaskOnLostFocus: false });
});

const currentLanguage = $('html').attr('lang');

const msgWarnObj = {
  uk: {
    email: 'Введіть коректний Email',
    phone: 'телефон повинен містити не менше 8 символів',
    warn: "Це поле обов'язкове",
  },
  ru: {
    email: 'Введите корректный Email',
    phone: 'телефон повинен містити не менше 8 символів',
    warn: 'Это поле обязательное',
  },
  en: {
    email: 'Enter a valid Email',
    phone: 'Phone must have not less 8 symbol',
    warn: 'field is required',
  },
};

function removeFormTextWarn(input) {
  input
    .parent()
    .find('.field__error-msg')
    .remove();
}

function checkNumbers(str) {
  return str.replace(/[\W_]+/g, '');
}

function removeNodeByDelay(node, delay) {
  setTimeout(() => {
    node.remove();
  }, delay);
}

function validateForm(inputs) {
  let isValid = true;
  inputs.each(function() {
    if (this.dataset.required) {
      $(this).on('input', e => {
        console.log($(e.currentTarget).val());
        if (
          $(e.target)
            .val()
            .replace(/\s+/g, '').length === 0 &&
          $(e.target).attr('name') === 'name'
        ) {
          const parent = $(this)
            .parent()
            .parent();

          parent.addClass('warn');
          isValid = false;
          return;
        } else if (
          $(e.target).attr('name') === 'phone' &&
          checkNumbers(e.currentTarget.value).length < 10
        ) {
          const parent = $(this)
            .parent()
            .parent();

          parent.addClass('warn');
          isValid = false;
          return;
        } else {
          const parent = $(this)
            .parent()
            .parent();

          parent.removeClass('warn');
          isValid = true;
          return;
        }
      });

      if ($(this).attr('name') === 'phone' && this.value.length < 10) {
        const parent = $(this)
          .parent()
          .parent();

        parent.addClass('warn');
        isValid = false;
        return;
      }

      if (
        !$(this)
          .val()
          .replace(/\s+/g, '')
      ) {
        const parent = $(this)
          .parent()
          .parent();

        parent.addClass('warn');
        isValid = false;
      }
    }
  });

  return isValid;
}

$('form').on('submit', e => {
  e.preventDefault();

  let $form = $(e.currentTarget);
  const inputs = $form.find($('[name]'));
  const isValid = validateForm(inputs);

  if (isValid) {
    sendAjaxForm('static/mail.php', $form);
  }
});

function sendAjaxForm(url, selectorForm) {
  const data = new FormData(selectorForm[0]);
  let processData = true;
  let contentType = 'application/x-www-form-urlencoded';

  selectorForm.find('button[type=submit]').css('pointer-events', 'none');

  contentType = processData = false;

  $.ajax({
    url: url, //url страницы (action_ajax_form.php)
    type: 'POST', //метод отправки
    processData: processData,
    contentType: contentType,
    dataType: 'html', //формат данных
    data: data, // Сеарилизуем объект
    success: function(response) {
      //Данные отправлены успешно
      selectorForm.find('button[type=submit]').css('pointer-events', 'initial');

      $('.form__status').remove();
      if (selectorForm[0].tagName.toLowerCase() === 'form') {
        selectorForm[0].reset();
      } else {
        selectorForm.find('form')[0].reset();
      }
    },
    error: function(response) {
      // Данные не отправлены
      $('.form__status').remove();
      $(selectorForm).append(`<div class="form__status">${status.error[currentLanguage]}</div>`);
      const msg = $(selectorForm).find('.form__status');

      removeNodeByDelay(msg, 5000);

      if (selectorForm[0].tagName.toLowerCase() === 'form') {
        selectorForm[0].reset();
      } else {
        selectorForm.find('form')[0].reset();
      }
    },
  });
}
const preloader = document.querySelector('.js-preloader')
const preloaderPercent = preloader.querySelector('.js-preloader-percent')
const preloaderLogo = preloader.querySelector('.js-preloader-logo')

function preloaderFinish() {
  const preloaderTl = gsap.timeline()

  preloaderTl.to('.js-preloader-bg', {
    duration: 0.9,
    opacity: 0,
    pointerEvents: 'none',
    delay: 0.7,
    onStart() {
      gsap.set('.preloader__content', {
        'display': 'none'
      })
      gsap.set('.js-preloader', {
        pointerEvents: 'none'
      })
    },
  })
    .from('.header__left', {
      y: -50,
      duration: 0.9
    }, 0.6)
    .from('.header__right', {
      duration: 0.9,
      y: -50
    }, 0.6)
    .from('.swiper-slide-img img', {
      scale: 1.45,
      duration: 1.3,
    }, 0.3)
}

let w = 0,
        t = setInterval(function() {
            w = w + 1;
            preloaderPercent.textContent = w;
            if (w === 100){
                clearInterval(t);
                preloaderLogo.classList.add('finish')

                setTimeout(() => {
                  preloader.classList.add('finish')
                  preloaderFinish()
                  
                  setTimeout(() => {
                    window.initMainSlider()
                  }, 700)
                }, 150)

                w = 0;
            }
        }, 43);

const pageId = document.body.getAttribute('id');

$(window)
  .on('resize', () => {
    // if(pageId === 'gallery-page') {
    //   const offsetTop = $('.page-top').outerHeight()

    //   $('.gallery').css('margin-top', offsetTop - 100 + 'px')
    // }

    if ($(window).width() <= 1100 && $(window).width() >= 525) {
      $('.js-footer__item').each((_, item) => {
        document.querySelector('.footer__item-tablet').append(item);
      });
    } else {
      $('.js-footer__item').each((_, item) => {
        document.querySelector('.footer__left').append(item);
      });
    }

    if ($(window).width() <= 480) {
      $('.js-header-phone').on('click', e => {
        e.preventDefault();
        stopScroll();

        $('.overlay').addClass('show');
      });
    }
  })
  .resize();
