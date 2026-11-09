const translations = {
    ru: {
        title: "Регистрация профиля студентки",
        name: "ФИО и Университет",
        email: "Студенческая почта (.edu / .kz)",
        budget: "Бюджет на аренду (₸)",
        zodiac: "Знак зодиака ✨",
        schedule: "Режим дня",
        passport: "Ссылка на документ / Паспорт",
        why: "Зачем вам совместное проживание?",
        btn: "Создать аккаунт и войти",
        privacy: "🔒 <strong>Конфиденциально:</strong> Ваши документы используются только для проверки статуса студентки.",
        role: "Личный кабинет",
        editTitle: "⚙️ Управление моим профилем",
        listTitle: "👥 Каталог и Подбор сожительниц",
        lblVerify: "Статус верификации",
        btnSave: "Сохранить изменения",
        btnLogout: "Выйти",
        badge: "✅ Верифицировано",
        checkDoc: "Проверить документ",
        goal: "Цель",
        optLark: "Жаворонок",
        optOwl: "Сова",
        themeDark: "🌙 Темная",
        themeLight: "☀️ Светлая",
        phName: "Алия, ЕНУ (2 курс)",
        phEmail: "student@enu.kz",
        phBudget: "120000",
        phPassport: "https://drive.google.com/...",
        phWhy: "Ищу безопасное жилье рядом с вузом"
    },
    kz: {
        title: "Студент профилін тіркеу",
        name: "Аты-жөні және Университет",
        email: "Студенттік пошта (.edu / .kz)",
        budget: "Жалға алу бюджеті (₸)",
        zodiac: "Жұлдыз жорамал ✨",
        schedule: "Күн тәртібі",
        passport: "Құжатқа сілтеме / Паспорт",
        why: "Бірге тұру мақсатыңыз неде?",
        btn: "Аккаунт ашып, кіру",
        privacy: "🔒 <strong>Құпиялылық:</strong> Құжаттарыңыз тек студент мәртебесін тексеру үшін пайдаланылады.",
        role: "Жеке кабинет",
        editTitle: "⚙️ Профильді басқару",
        listTitle: "👥 Каталог және Бөлмелестер",
        lblVerify: "Тексеру мәртебесі",
        btnSave: "Өзгерістерді сақтау",
        btnLogout: "Шығу",
        badge: "✅ Расталған",
        checkDoc: "Құжатты тексеру",
        goal: "Мақсаты",
        optLark: "Жаворонок",
        optOwl: "Сова",
        themeDark: "🌙 Түнгі",
        themeLight: "☀️ Күндізгі",
        phName: "Әлия, ЕҰУ (2 курс)",
        phEmail: "student@enu.kz",
        phBudget: "120000",
        phPassport: "https://drive.google.com/...",
        phWhy: "Университетке жақын қауіпсіз баспана іздеймін"
    },
    en: {
        title: "Student Profile Registration",
        name: "Full Name & University",
        email: "Student Email (.edu / .kz)",
        budget: "Rent Budget (₸)",
        zodiac: "Zodiac Sign ✨",
        schedule: "Daily Schedule",
        passport: "Passport / Document Link",
        why: "Why do you need a roommate?",
        btn: "Create Account & Login",
        privacy: "🔒 <strong>Confidential:</strong> Your documents are used only to verify student status.",
        role: "Dashboard",
        editTitle: "⚙️ Manage Profile",
        listTitle: "👥 Roommates Catalog & Match",
        lblVerify: "Verification Status",
        btnSave: "Save Changes",
        btnLogout: "Log Out",
        badge: "✅ Verified",
        checkDoc: "Check Document",
        goal: "Goal",
        optLark: "Early bird",
        optOwl: "Night owl",
        themeDark: "🌙 Dark",
        themeLight: "☀️ Light",
        phName: "Aliya, ENU (2nd year)",
        phEmail: "student@enu.kz",
        phBudget: "120000",
        phPassport: "https://drive.google.com/...",
        phWhy: "Looking for safe housing near university"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.onclick = toggleTheme;

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.onchange = (e) => {
            const lang = e.target.value;
            localStorage.setItem('lang', lang);
            applyLanguage(lang);
            if (document.getElementById('girlsList')) renderGirlsList();
        };
    }

    // 1. Регистрация (index.html)
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.onsubmit = (e) => {
            e.preventDefault();
            const userData = {
                nameUni: document.getElementById('nameUni').value,
                email: document.getElementById('email').value,
                budget: document.getElementById('budget').value,
                zodiac: document.getElementById('zodiac').value,
                schedule: document.getElementById('schedule').value,
                passportLink: document.getElementById('passportLink').value,
                whyStay: document.getElementById('whyStay').value,
                verified: true
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));

            let allGirls = JSON.parse(localStorage.getItem('allGirls')) || getDefaultGirls();
            if (!allGirls.some(g => g.email === userData.email)) {
                allGirls.push(userData);
            } else {
                allGirls = allGirls.map(g => g.email === userData.email ? userData : g);
            }
            localStorage.setItem('allGirls', JSON.stringify(allGirls));

            window.location.href = "profile.html";
        };
    }

    // 2. Личный кабинет (profile.html)
    const editForm = document.getElementById('editForm');
    if (editForm) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }

        // Заполняем поля данными текущего пользователя
        if (document.getElementById('editName')) document.getElementById('editName').value = currentUser.nameUni || '';
        if (document.getElementById('editBudget')) document.getElementById('editBudget').value = currentUser.budget || '';
        if (document.getElementById('editZodiac')) document.getElementById('editZodiac').value = currentUser.zodiac || '';
        if (document.getElementById('editSchedule')) document.getElementById('editSchedule').value = currentUser.schedule || '';

        // Сохранение изменений в кабинете
        editForm.onsubmit = (e) => {
            e.preventDefault();
            currentUser.nameUni = document.getElementById('editName').value;
            currentUser.budget = document.getElementById('editBudget').value;

            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            let allGirls = JSON.parse(localStorage.getItem('allGirls')) || [];
            allGirls = allGirls.map(g => g.email === currentUser.email ? currentUser : g);
            localStorage.setItem('allGirls', JSON.stringify(allGirls));

            alert('Изменения успешно сохранены!');
            renderGirlsList();
        };

        // КНОПКА ВЫХОДА (Исправлено)
        const logoutBtn = document.getElementById('btnLogout');
        if (logoutBtn) {
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser'); // Удаляем сессию
                window.location.href = 'index.html';  // Перенаправляем на вход
            };
        }

        const fZodiac = document.getElementById('filterZodiac');
        const fSchedule = document.getElementById('filterSchedule');
        if (fZodiac) fZodiac.onchange = renderGirlsList;
        if (fSchedule) fSchedule.onchange = renderGirlsList;

        renderGirlsList();
    }
});

function getDefaultGirls() {
    return [
        { nameUni: "Айгерим Кенесбекова, КазНУ", email: "aigerim@kaznu.kz", budget: "135000", zodiac: "Скорпион", schedule: "жаворонок", passportLink: "https://example.com/doc1", whyStay: "Ищу тихую соседку", verified: true },
        { nameUni: "Динара Нургалиева, ЕНУ", email: "dinara@enu.kz", budget: "120000", zodiac: "Близнецы", schedule: "сова", passportLink: "https://example.com/doc2", whyStay: "Хочу разделить аренду", verified: true },
        { nameUni: "Алина Пак, КИМЭП", email: "alina@kimep.kz", budget: "150000", zodiac: "Лев", schedule: "жаворонок", passportLink: "https://example.com/doc3", whyStay: "Безопасный поиск жилья", verified: true }
    ];
}

function calculateCompatibility(user, candidate) {
    let score = 70;
    if (user.schedule && candidate.schedule && user.schedule === candidate.schedule) score += 20;
    if (user.budget && candidate.budget && Math.abs(Number(user.budget) - Number(candidate.budget)) <= 20000) score += 10;
    return Math.min(score, 99);
}

function renderGirlsList() {
    const listContainer = document.getElementById('girlsList');
    if (!listContainer) return;

    const lang = localStorage.getItem('lang') || 'ru';
    const t = translations[lang];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let allGirls = JSON.parse(localStorage.getItem('allGirls')) || getDefaultGirls();

    const zodiacFilter = document.getElementById('filterZodiac') ? document.getElementById('filterZodiac').value : '';
    const scheduleFilter = document.getElementById('filterSchedule') ? document.getElementById('filterSchedule').value : '';

    allGirls = allGirls.filter(girl => {
        if (girl.email === currentUser.email) return false;
        if (zodiacFilter && girl.zodiac && !girl.zodiac.includes(zodiacFilter)) return false;
        if (scheduleFilter && girl.schedule && girl.schedule !== scheduleFilter) return false;
        return true;
    });

    listContainer.innerHTML = '';
    if (allGirls.length === 0) {
        listContainer.innerHTML = `<p style="text-align:center; color:#94a3b8; padding: 20px;">Ничего не найдено по вашему фильтру.</p>`;
        return;
    }

    allGirls.forEach(girl => {
        const matchScore = calculateCompatibility(currentUser, girl);
        const item = document.createElement('div');
        item.className = 'girl-item';
        item.innerHTML = `
            <strong>${girl.nameUni}</strong> (${girl.zodiac || ''}, ${girl.schedule || ''})<br>
            ${t.budget}: ${girl.budget} ₸ | ${t.goal}: ${girl.whyStay || ''}<br>
            📄 <a href="${girl.passportLink}" target="_blank" rel="noopener">${t.checkDoc}</a><br>
            <div class="match-badge">🔥 Совместимость: ${matchScore}%</div>
        `;
        listContainer.appendChild(item);
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeToggle');
    const lang = localStorage.getItem('lang') || 'ru';
    if (btn && translations[lang]) {
        btn.innerText = theme === 'light' ? translations[lang].themeDark : translations[lang].themeLight;
    }
}

function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'ru';
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = savedLang;
    applyLanguage(savedLang);
}

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    setElemText('formTitle', t.title);
    setElemText('labelName', t.name);
    setElemText('labelEmail', t.email);
    setElemText('labelBudget', t.budget);
    setElemText('labelZodiac', t.zodiac);
    setElemText('labelSchedule', t.schedule);
    setElemText('labelPassport', t.passport);
    setElemText('labelWhy', t.why);
    setElemText('btnSubmit', t.btn);
    if (document.getElementById('privacyBox')) document.getElementById('privacyBox').innerHTML = t.privacy;
    setElemText('optLark', t.optLark);
    setElemText('optOwl', t.optOwl);

    setElemText('roleTitle', t.role);
    setElemText('editTitle', t.editTitle);
    setElemText('listTitle', t.listTitle);
    setElemText('lblEditName', t.name);
    setElemText('lblEditBudget', t.budget);
    setElemText('lblVerifyStatus', t.lblVerify);
    setElemText('btnSave', t.btnSave);
    setElemText('btnLogout', t.btnLogout);
    setElemText('verifyBadge', t.badge);

    if (document.getElementById('nameUni')) document.getElementById('nameUni').placeholder = t.phName;
    if (document.getElementById('email')) document.getElementById('email').placeholder = t.phEmail;
    if (document.getElementById('budget')) document.getElementById('budget').placeholder = t.phBudget;
    if (document.getElementById('passportLink')) document.getElementById('passportLink').placeholder = t.phPassport;
    if (document.getElementById('whyStay')) document.getElementById('whyStay').placeholder = t.phWhy;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeButton(currentTheme);
}

function setElemText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}