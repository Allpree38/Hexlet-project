// Вставка фото
function previewYourPhoto() {
    const file = document.querySelector('input[type=file]').files[0]
    const photo = document.getElementById('photo')
    
    if (file) {
        const reader = new FileReader()
        reader.onload = function(e) {
            photo.src = e.target.result
            photo.style.display = 'block'
        }
        reader.readAsDataURL(file)
    } else {
        photo.src = ''
        photo.style.display = 'none'
    }
}

// Гигакнопище с сохранением данных
document.getElementById('Hi_btn').onclick = (e) => {
    const CVData = {

        // Специализация
        specialisation: document.getElementById('Specialisations').value,  

        // Фио и фото
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('surname').value,      
        patronymic: document.getElementById('patronymic').value, 
        phone: document.getElementById('phone_number').value,
        photoSrc: document.getElementById('photo').src,

        // Прошлые места работы
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        workPeriod: document.getElementById('workTime').value,
        duties: document.getElementById('duties').value,

        // Образование
        education: document.getElementById('education').value,
        your_specialisation: document.getElementById('your_specialisation').value,
        education_time: document.getElementById('education_time').value,

        // Блок с доп инофой
        skills: document.getElementById('skills').value,
        infoAbout: document.getElementById('info').value
    };

    // Сохранение всего
    localStorage.setItem('CVData', JSON.stringify(CVData));

    // Переход на страницу c шабдлоном
    window.location.href = 'CV.html';
};

// Бэкап данных из LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('CVData');
    if (!savedData) return;

    const data = JSON.parse(savedData);

    // Специализация
    if (data.specialisation) document.getElementById('Specialisations').value = data.specialisation;

    // ФИО
    if (data.firstName) document.getElementById('first_name').value = data.firstName;
    if (data.lastName) document.getElementById('surname').value = data.lastName;
    if (data.patronymic) document.getElementById('patronymic').value = data.patronymic;
    if (data.phone) document.getElementById('phone_number').value = data.phone;

    // Прошлые места работ
    if (data.company) document.getElementById('company').value = data.company;
    if (data.position) document.getElementById('position').value = data.position;
    if (data.workPeriod) document.getElementById('workTime').value = data.workPeriod;
    if (data.duties) document.getElementById('duties').value = data.duties;

    // Образованик
    if (data.education) document.getElementById('education').value = data.education;
    if (data.your_specialisation) document.getElementById('your_specialisation').value = data.your_specialisation;
    if (data.education_time) document.getElementById('education_time').value = data.education_time;

    // Доп инфа
    if (data.skills) document.getElementById('skills').value = data.skills;
    if (data.infoAbout) document.getElementById('info').value = data.infoAbout;

    if (data.photoSrc && data.photoSrc !== './assets/images/profile.png') {
        const photoImg = document.getElementById('photo');
        photoImg.src = data.photoSrc;
        photoImg.style.display = 'block';
    }
});

// Кнопка очистки даных из LocalStorage
document.getElementById('clear_btn').onclick = () => {
    document.querySelectorAll('input, textarea, select').forEach(field => field.value = '');
    document.getElementById('photo').src = './assets/images/profile.png';
    localStorage.removeItem('CVData');
};

// Открытие кнопки Готово
const checkFormBtn = document.querySelector('button[type="submit"]');
const buttonsBlock = document.querySelector('footer');

function isFormValid() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            return false;
        }
    }
    return true;
}

checkFormBtn.addEventListener('click', (e) => {
    e.preventDefault(); 

    if (isFormValid()) {
        buttonsBlock.style.display = 'flex';
    } else {
        alert('Вы не заполнили бланк! Не забудте, ФИО с ЗАГЛАВНОЙ БУКВЫ!');
    }
});