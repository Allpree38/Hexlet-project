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
        specialisation: document.getElementById('Specialisations').value,  
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('surname').value,      
        patronymic: document.getElementById('patronymic').value, 
        phone: document.getElementById('phone_number').value,
        photoSrc: document.getElementById('photo').src,
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        workPeriod: document.getElementById('workTime').value,
        duties: document.getElementById('duties').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        infoAbout: document.getElementById('info').value
    };

    // Сохранение всего
    localStorage.setItem('CVData', JSON.stringify(CVData));

    // Переход на страницу-шаблон
    window.location.href = 'CV.html';
};