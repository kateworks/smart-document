import './index.css';
import { getText, drawImage } from './check';

const baseUrl = 'http://page.smartdocument.ru/api/reg_users/';

const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__btn-submit');
const errorMessage = form.querySelector('.form__error');

const inputsArray = Array.from(form.querySelectorAll('.form__input'));
const textBlock = form.querySelector('.form__text-block');
const checkInput = form.querySelector('.form__check .form__input');

const checkContainer = document.querySelector('.form__check');
const canvas = checkContainer.querySelector('.form__check-image');
let isCaptchaVisible, testResult;

const hasInvalidInput = (inputList) => {
  const hasWrongInputs =  inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  const hasWrongCaptcha = ( +checkInput.value !== testResult);
  return hasWrongInputs || hasWrongCaptcha;
};

const renewCanvas = () => {
  if (isCaptchaVisible) {
    const context = canvas.getContext('2d');
    const { result, text } = getText();
    testResult = result;
    drawImage(context, canvas.width, canvas.height, text);
    submitButton.disabled = hasInvalidInput(inputsArray);
  }
};

const resetInputs = () => {
  //console.log('reset inputs');
  inputsArray.forEach((input) => {
    input.value = '';
  });
  textBlock.value = '';
  renewCanvas();
};

const postUser = (url, userData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: userData,
  };

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      errorMessage.textContent = "Ваша заявка успешно отправлена";
      resetInputs();
    })
    .catch(error => {
      console.log(error);
      errorMessage.textContent = "Что-то пошло не так...";
    });
}

const getUserData = (formElement) => {
  return {
    company: form.querySelector('#input-company').value || '',
    name: form.querySelector('#input-name').value || '',
    phone: form.querySelector('#input-phone').value || '',
    email: form.querySelector('#input-email').value || '',
    comment: form.querySelector('#text-block').value || '_',
  };
};

const handleClick = (event) => {
  event.preventDefault();
  const user = getUserData(form);
  const userInfo = JSON.stringify({
    "reg_users": {
        "Company_Reg_Users": user.company,
        "FIO_Reg_Users": user.name,
        "Phone_Reg_Users": user.phone,
        "Email_Reg_Users": user.email,
        "Comment_Reg_Users": user.comment
    }
  });
  postUser(baseUrl, userInfo);
};

const setEventListeners = () => {
  //console.log('set event listeners');
  submitButton.addEventListener('click', handleClick);
  inputsArray.forEach((item) => {
    item.addEventListener('input', () => {
      submitButton.disabled = hasInvalidInput(inputsArray);
    });
    item.addEventListener('click', () => {
      errorMessage.textContent = "";
    });
  });
  canvas.addEventListener('click', renewCanvas);
};

const start = () => {
  isCaptchaVisible = canvas.getContext;
  if (!isCaptchaVisible) {
    checkContainer.classList.add('form__check_hidden');
  }
  setEventListeners();
  resetInputs();
};

start();
