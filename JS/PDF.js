document.getElementById('downloadPDF').addEventListener('click', function() {
    const element = document.getElementById('CV-main'); // контейнер с резюме
    // Показываем индикатор загрузки (опционально)
    element.style.opacity = '0.5';
    
    html2canvas(element, {
        scale: 2,          // качество
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        });
        
        // НАСТРОЙКА ЛИСТА
        const imgWidth = 210; 
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        
        // Если наполнения много то создаёт ещё 1 страницу
        let heightLeft = imgHeight - pageHeight;
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Сохранение документа
        pdf.save('Your_CV.pdf');
        element.style.opacity = '1';
    }).catch(error => {
        console.error('Ошибка:', error);
        element.style.opacity = '1';
        alert('Не удалось создать PDF. Попробуйте позже.');
    });
});