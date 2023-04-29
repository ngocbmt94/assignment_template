'use strict';
const txtEmail = document.getElementById('txtEmail');
const selMonth = document.querySelector('#selMonth');
const selYear = document.querySelector('#selYear');
const monthName = new Array(
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
);
const init = function () {
  for (let i = 11; i >= 0; i--) {
    const monthOption = `<option ${i == 0 ? 'selected' : ''} value=${i + 1}>${
      i < 9 ? `0${i + 1}` : `${i + 1}`
    } - ${monthName[i]}</option>`;
    selMonth.insertAdjacentHTML('afterbegin', monthOption);
  }

  const currentYear = new Date().getFullYear();
  for (let i = 10; i >= 0; i--) {
    const yearOption = `<option ${i == 0 ? 'selected' : ''} value=${
      i + currentYear
    }>${i + currentYear}</option>`;
    selYear.insertAdjacentHTML('afterbegin', yearOption);
  }

  const searchParams = new URLSearchParams(window.location.search);
  txtEmail.value = searchParams.get('email');
};
init();
