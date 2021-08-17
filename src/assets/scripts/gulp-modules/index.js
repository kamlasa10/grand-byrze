@@include('../libs/libs.js')

let menuTl = gsap.timeline()
const menu = document.querySelector('.js-menu')
const openMenu = document.querySelector('.js-menu-open')
const header = document.querySelector('.header')
const closeMenu = document.querySelector('.js-menu-close')

function animationCloseMenu() {
  menu.classList.remove('show')

  setTimeout(() => {
    header.classList.remove('hide')
  }, 200)
}

function animationShowMenu() {
  menuTl.kill()
  header.classList.add('hide')
  setTimeout(() => {
    menu.classList.add('show')
  }, 200)
}

openMenu.addEventListener('click', (e) => {
  e.preventDefault()
  animationShowMenu()
})

closeMenu.addEventListener('click', e => {
  e.preventDefault()
  animationCloseMenu()
})

function hidePopup() {
  $('[data-popup]')
    .hide();
  $('.overlay')
    .removeClass('show');
}

function showPopupByType(type) {
  $('[data-popup]')
    .hide();

  if (!type) return;

  $(`[data-popup-name=${type}]`)
    .show();
  $('.overlay')
    .addClass('show');
}

showPopupByType()

document.addEventListener('DOMContentLoaded', () => {
  let pageId = document.body.getAttribute('id')

  switch(pageId) {
    case 'documents-page':
      window.initCustomScroll(false)
      break
    case 'paymant-page':
      window.initCustomScroll(false)
      break
    case 'stitching-page':
      window.initCustomScroll(false)
      break
    case 'credit-page':
      window.initCustomScroll(false)
      break
    case 'company-page':
      window.initCustomScroll(false)
      break
    case 'service-page':
      window.initCustomScroll(false)
      break
    case 'developer-page':
      window.initCustomScroll(false)
      break
    case 'gallery-page':
      window.initCustomScroll(false)
      break
    case 'contacts-page':
      window.initCustomScroll(false)
      break
    case 'contacts-page':
      window.initCustomScroll(false)
      break
    default: 
      window.initCustomScroll()
  }
})

$('.js-popup-open')
  .on('click', e => {
    e.preventDefault();

    const typeName = e.currentTarget.dataset.popupType;

    showPopupByType(typeName);
});

$(document)
  .on('click', e => {
    if (e.target === $('.overlay')[0]) {
      hidePopup();
      menuTl.clear();
    }
});

$('.js-close-popup')
  .on('click', e => {
    e.preventDefault();
    hidePopup();

    if(e.currentTarget.dataset.close) {
      $('.js-popup[data-popup-name=callback]').find('.popup__item').removeClass('warn')
    }
});

$('[name=phone]').each(function() {
  if($(this).hasClass('js-footer-phone')) {
    $(this).attr('placeholder', '+ (38) ___ - ___ - ____');
    $(this).inputmask('+ (38) 999 - 999 - 9999', { clearMaskOnLostFocus: false });
    return
  }

  $(this).attr('placeholder', '+ (38) ___ - ___ - ____');
  $(this).inputmask('+ (38) 999 - 999 - 9999', { clearMaskOnLostFocus: false });
});

const currentLanguage = $('html').attr('lang')

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
          console.log($(e.currentTarget).val(), )
        if (
          $(e.target)
            .val()
            .replace(/\s+/g, '').length === 0 &&
          $(e.target).attr('name') === 'name'
        ) {
          const parent = $(this).parent().parent()

          parent.addClass('warn');
          isValid = false;
          return;
        } else if (
          $(e.target).attr('name') === 'phone' &&
          checkNumbers(e.currentTarget.value).length < 10
        ) {
          const parent = $(this).parent().parent()

          parent.addClass('warn');
          isValid = false;
          return;
        } else {
          const parent = $(this).parent().parent()

          parent.removeClass('warn');
          isValid = true;
          return;
        }
      });

      if ($(this).attr('name') === 'phone' && this.value.length < 10) {
        const parent = $(this).parent().parent()

        parent.addClass('warn');
        isValid = false;
        return;
      }

      if (
        !$(this)
          .val()
          .replace(/\s+/g, '')
      ) {
        const parent = $(this).parent().parent()

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
  let contentType = "application/x-www-form-urlencoded";

  selectorForm.find('button[type=submit]').css('pointer-events', 'none')

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
      selectorForm.find('button[type=submit]').css('pointer-events', 'initial')

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
      $(selectorForm).append(
        `<div class="form__status">${status.error[currentLanguage]}</div>`,
      );
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