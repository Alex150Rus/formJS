'use strict';

class Form {
  constructor(formId, formAction, formMethod, labelForIdInputName, labelNameText, labelForIdInputPhone, labelPhoneText,
              labelForIdInputEmail, labelEmailText, labelForTextIdText, labelTextText, buttonType, buttonValue,
              placeHolderName, placeHolderPhone, placeHolderEmail, placeHolderText) {

    // атрибуты для формы
    this.formId = formId;
    this.formAction = formAction;
    this.formMethod = formMethod;

    // фтрибуты для поля введения имени
    this.labelForIdInputName = labelForIdInputName;
    this.labelNameText = labelNameText;

    // атрибуты для поля введения телефона
    this.labelForIdInputPhone = labelForIdInputPhone;
    this.labelPhoneText = labelPhoneText;

    //атрибуты для поля введения e-mail
    this.labelForIdInputEmail = labelForIdInputEmail;
    this.labelEmailText = labelEmailText;

    // атрибуты для поля введения текста
    this.labelForTextIdText = labelForTextIdText;
    this.labelTextText = labelTextText;

    // атрибуты для кнопки
    this.buttonType = buttonType;
    this.buttonValue = buttonValue;

    // атрибуты placeholder
    this.placeHolderName = placeHolderName;
    this.placeHolderPhone = placeHolderPhone;
    this.placeHolderEmail = placeHolderEmail;
    this.placeHolderText = placeHolderText;
  }

  // метод отрисовывет форму, вызывая методы отрисовывания внуьренних блоков (модульность)
  render() {
    document.body.innerHTML = `<form id="${this.formId}" action="${this.formAction}" method="${this.formMethod}">` +
      `</form>`;
    this.renderNameInput();
    this.renderTelephoneInput();
    this.renderMailInput();
    this.renderTextInput();
    this.renderCityInput();
    this.renderSubmitButton();
    this.buttonEventHandler();
  }

    //метод отрисовывет блок с полем 'Имя'
  renderNameInput() {
    //вставляю в форму конструкцию для поля 'Имя'
    // ищу форму
    const formEl = document.getElementById(this.formId);
    formEl.innerHTML +=`<label for="${this.labelForIdInputName}">` +
      `${this.labelNameText}</label>`;
    formEl.innerHTML += `<input type="text" id="${this.labelForIdInputName}" placeholder="${this.placeHolderName}">`;
    // поле для вывода ошибки
    formEl.innerHTML += '<div id="errorName" class="opacity">здесь будет<br> сообщение об ошибке</div>';
  }

  //метод отрисовывает блок с полем 'Телефон'
  renderTelephoneInput() {
    // ищу форму
    const formEl = document.getElementById(this.formId);
    //вставляю в форму конструкцию для поля 'Телефон'
    formEl.innerHTML += `<label for="${this.labelForIdInputPhone}">` +
      `${this.labelPhoneText}</label>`;
    formEl.innerHTML += `<input type="text" id="${this.labelForIdInputPhone}" placeholder="${this.placeHolderPhone}">`;
    // поле для вывода ошибки
    formEl.innerHTML += '<div id="errorPhone" class="opacity">здесь будет<br> сообщение об ошибке</div>';
  }

  //метод отрисовывает блок с полем 'E-mail'
  renderMailInput() {
    // ищу форму
    const formEl = document.getElementById(this.formId);
    //вставляю в форму конструкцию для поля 'E-mail'
    formEl.innerHTML += `<label for="${this.labelForIdInputEmail}">` +
      `${this.labelEmailText}</label>`;
    formEl.innerHTML += `<input type="text" id="${this.labelForIdInputEmail}" placeholder="${this.placeHolderEmail}">`;
    // поле для вывода ошибки
    formEl.innerHTML += '<div id="errorMail" class="opacity">здесь будет<br> сообщение об<br> ошибке</div>'
  }

  //метод отрисовывает блок с полем 'Текст'
  renderTextInput() {
    // ищу форму
    const formEl = document.getElementById(this.formId);
    //вставляю в форму конструкцию для поля 'Текст'
    formEl.innerHTML += `<label for="${this.labelForTextIdText}">` +
      `${this.labelTextText}</label>`;
    formEl.innerHTML += `<input type="text" id="${this.labelForTextIdText}" placeholder="${this.placeHolderText}">`;
  }

  //метод отрисовывает кнопку
  renderSubmitButton() {
    // ищу форму
    const formEl = document.getElementById(this.formId);
    //вставляю в форму кнопку 'Отправить'
    formEl.innerHTML += `<button id="submit" type="${this.buttonType}">${this.buttonValue}</button>`
  }

  // метод ставит отбработчик события на кнопку, по её нажатию запускает проверку полей
  buttonEventHandler() {
    document.getElementById(this.formId).addEventListener('submit', e => {
      e.preventDefault();
      this.validate()
    })
  }

  // проверка каждого поля
  validate() {
    // полe name
    if (document.getElementById(this.labelForIdInputName)) {
      const name = document.getElementById(this.labelForIdInputName).value;
      this.checkName(name);
    }
    // поле phone
    if (document.getElementById(this.labelForIdInputPhone)) {
      const phone = document.getElementById(this.labelForIdInputPhone).value;
      this.checkPhone(phone);
    }
    // поле email
    if (document.getElementById(this.labelForIdInputEmail)) {
      const email = document.getElementById(this.labelForIdInputEmail).value;
      this.checkEmail(email);
    }
  }

  // проверка введённого имени
  checkName(name){
    if (/^[a-zа-яё]{1,30}$/i.test(name)){
      console.log('Имя введено верно');
      document.getElementById('errorName').innerHTML = '<br><br>';
    } else if (name === '') {
      const errorNameEl = document.getElementById('errorName');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Заполните<br> поле ввода имени";
      console.log('Имя введено неверно Заполните поле ввода имени');
    } else {
      const errorNameEl = document.getElementById('errorName');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Для ввода имени<br> допустимы только буквы";
      console.log('Имя введено неверно');
    }
  }

  // проверка введённого телефона
  checkPhone(phone) {
    if (/^\+\d\(\d{3}\)\d{3}-\d{3}$/.test(phone)){
      console.log('Телефон введено верно');
      document.getElementById('errorPhone').innerHTML = '<br><br>';
    } else if (phone === '') {
      const errorNameEl = document.getElementById('errorPhone');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Заполните<br> поле ввода телефона";
      console.log('Телефон введён неверно. Заполните поле ввода телефона');
    } else {
      const errorNameEl = document.getElementById('errorPhone');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Шаблон ввода телефона<br> +7(000)000-000";
      console.log('Телефон введён неверн');
    }
  }

  // проверка введённого Email
  checkEmail(email) {
    if (/^(\w{1,}|\w{1,}[.-]\w{1,})\@\w{1,}\.(ru|com)$/.test(email)){
      console.log('Email введено верно');
      document.getElementById('errorMail').innerHTML = '<br><br><br>';
    } else if (email === '') {
      const errorNameEl = document.getElementById('errorMail');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Заполните<br> поле ввода<br> email";
      console.log('Email введён неверно. Заполните поле ввода email');
    } else {
      const errorNameEl = document.getElementById('errorMail');
      errorNameEl.classList.add('errorColor');
      errorNameEl.innerHTML = "Шаблон ввода email<br> mymail@mail.ru, my.mail@mail.ru,<br> my-mail@mail.ru";
      console.log('Email введён неверно');
    }
  }

  //метод отрисовывает блок с селектором 'City'
  renderCityInput() {
    // ищу форму
    const formEl = document.getElementById(this.formId);
    //вставляю в форму конструкцию для поля 'City'
    formEl.innerHTML += `<div id="cityLabel"><label for="cityInp" id="cityLabel">` +
      `Выберите свой город:</label>`;
    formEl.innerHTML += `<input id="cityInp" list="city"><datalist id="city"></datalist></div>`;
  }

}

