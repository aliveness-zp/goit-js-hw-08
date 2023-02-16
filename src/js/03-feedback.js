import throttle from 'lodash.throttle';

const LOCALKEY = 'feedback-form-state';

const formData = {};

const formEl = document.querySelector('form');
const textAreaEl = document.querySelector('textarea');
const inputEl = document.querySelector('input');

const parsedData = JSON.parse(localStorage.getItem(LOCALKEY));

formEl.addEventListener('input', throttle(createLocalStorage, 500));
formEl.addEventListener('submit', clearAndSubmiForm);

reloadFormValue();

function createLocalStorage(e) {
  formData[e.target.name] = e.target.value;

  return localStorage.setItem(LOCALKEY, JSON.stringify(formData));
}

function clearAndSubmiForm(e) {
  e.preventDefault();
  const submit = { email: inputEl.value, message: textAreaEl.value };
  console.log(submit);

  e.target.reset();

  localStorage.removeItem(LOCALKEY);
}

function reloadFormValue() {
  if (parsedData) {
    textAreaEl.value = parsedData.message || '';
    inputEl.value = parsedData.email || '';
  }
}
