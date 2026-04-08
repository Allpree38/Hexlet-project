//Кнопка перехода на другую страницу

document.getElementById('Hi_btn').onclick = ()=>{
    window.location.href = 'index.html'
}

//Вставление картинки в "рамку"

function previewYourPhoto() {
    const file = document.querySelector('input[type=file]').files[0]
    const photo = document.getElementById('previewImg')
    
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