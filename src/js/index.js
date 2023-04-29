'use strict';
const body = document.querySelector('body');
const btnContinue = document.querySelector('.btn-continue');
const btnStartNow = document.querySelector('.btn-start-now');
const showModal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const form = document.getElementById('formCreateAccount');
const txtEmail = document.getElementById('txtEmail');

const openModal = function () {
  showModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  body.classList.add('scroll');
};
const closeModal = function () {
  showModal.classList.add('hidden');
  overlay.classList.add('hidden');
  body.classList.remove('scroll');
};
btnContinue.addEventListener('click', openModal);
btnStartNow.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//press ESC close modal
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !showModal.classList.contains('.hidden')) {
    closeModal();
  }
});

form.addEventListener('submit', function (e) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(txtEmail.value)) {
    e.preventDefault();
  }
});
