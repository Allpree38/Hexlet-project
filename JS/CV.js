//Перенос данных и кнопка
document.getElementById('back_btn').onclick = ()=>{
    window.location.href = 'HI.html'
}

document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('CVData');
    const main = document.getElementById('CV-main');

    if (!rawData) {
        main.innerHTML = '<p>Нет данных. Сначала заполните форму на первой странице.</p>';
        return;
    }

    const data = JSON.parse(rawData);

    const CVHTML = generateCV(data);
    main.innerHTML = CVHTML;

    const backBtn = document.getElementById('back_btn');
    if (backBtn) {
        backBtn.onclick = () => {
            window.location.href = 'HI.html';
        };
    }
});

// (Де)Генерация резюме
function generateCV(data) {
    const fullName = `${data.firstName || ''} ${data.lastName || ''} ${data.patronymic || ''}`.trim();
    const phoneFormatted = data.phone ? `+7${data.phone}` : 'не указан';

    let html = `
        <div>
            <div class="CV-header">
                <img src="${data.photoSrc || './assets/images/profile.png'}" 
                     alt="Фото" 
                     class="CV-photo"
                     onerror="this.src='./assets/images/profile.png'">
                <div>
                    <h2>${escapeHtml(fullName) || 'Имя не указано'}</h2>
                    <p>Телефон: ${escapeHtml(phoneFormatted)}</p>
                </div>
            </div>
            <div class="CVJobInfo">
                <h3>Опыт работы</h3>
                <p>${escapeHtml(data.company || '—')} — ${escapeHtml(data.position || '—')}</p>
                <p>Период: ${escapeHtml(data.workPeriod || '—')}</p>
                <p>Обязанности: ${escapeHtml(data.duties || '—')}</p>
            </div>
            <div class="CVJobInfo">
                <h3>Образование</h3>
                <p>${escapeHtml(data.education || '—')}</p>
            </div>
            <div class="CVJobInfo">
                <h3>Навыки</h3>
                <p>${escapeHtml(data.skills || '—')}</p>
            </div>
            <div class="CVJobInfo">
                <h3>Дополнительная информация</h3>
                <p>${escapeHtml(data.infoAbout || '—')}</p>
            </div>
    `;

// Рекомендашки
    html += recommendation(data.specialisation);

    html += `</div>`;
    return html;
}

function recommendation(specialisation) {
    const blocks = {
        'IT': `
            <div class="CVJobInfo_recommendation">
                <h3>Рекомендация для IT-специалиста</h3>
                <p>Укажите стек технологий (JavaScript, Python, etc.), ссылку на GitHub/портфолио, сертификаты.</p>
            </div>`,
        'marketing': `
            <div class="CVJobInfo recommendation">
                <h3>Рекомендация для маркетолога</h3>
                <p>Добавьте примеры успешных кампаний, владение SEO/PPC, аналитику.</p>
            </div>`,
        'accountant': `
            <div class="CVJobInfo recommendation">
                <h3>Рекомендация для бухгалтера</h3>
                <p>Укажите знание 1С, налогового законодательства, опыт с отчётностью.</p>
            </div>`,
        'engineer': `
            <div class="CVJobInfo recommendation">
                <h3>Рекомендация для инженера</h3>
                <p>Перечислите проекты, знание ГОСТов, CAD-программы.</p>
            </div>`,
        'manager': `
            <div class="CVJobInfo recommendation">
                <h3>Рекомендация для менеджера</h3>
                <p>Опишите управленческий опыт, KPI, навыки командной работы.</p>
            </div>`
    };
    return blocks[specialisation] || `
        <div class="CVJobInfo recommendation">
            <p>Рекомендации по вашей профессии появятся позже.</p>
        </div>`;
}

// Да, да, я спёр XSS защиту с рандомного видоса
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}