// 1. إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAIYS5x-5qSun2b4FFsJhKUYGaChMbkfRQ",
    authDomain: "sanad-app-ad4a2.firebaseapp.com",
    projectId: "sanad-app-ad4a2",
    storageBucket: "sanad-app-ad4a2.firebasestorage.app",
    messagingSenderId: "1035303003073",
    appId: "1:1035303003073:web:9a243de3342d799d400540"
};

// تشغيل Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- العناصر من الـ HTML بتاعك ---
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const darkToggle = document.getElementById('darkToggle');
const breatheBtn = document.getElementById('breatheBtn');
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const painLevel = document.getElementById('painLevel');
const painValue = document.getElementById('painValue');
const painEmoji = document.getElementById('painEmoji');
const painNotes = document.getElementById('painNotes');
const savePainBtn = document.getElementById('savePain');
const historyList = document.getElementById('historyList');
const toast = document.getElementById('toast');
const currentDateEl = document.getElementById('currentDate');

const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];
const painEmojis = ['😌', '😊', '🙂', '😐', '😕', '😟', '😣', '😖', '😫', '😩'];
const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

// --- عند التشغيل ---
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavigation();
    initBreathing();
    initPainTracker();
    setCurrentDate();
    
    // تفعيل المقالات
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('expanded'));
    });
});

// 1. الوضع الداكن
function initDarkMode() {
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// 2. التنقل بين الصفحات (شغال 100%)
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-page');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            window.location.hash = target;
        });
    });
}

// 3. تمرين التنفس
let isBreathing = false;
let breathingInterval = null;

function toggleBreathing() {
    if (isBreathing) {
        isBreathing = false;
        breatheBtn.textContent = 'ابدأي التمرين';
        breathingCircle.classList.remove('active');
        breathingText.textContent = 'اضغطي على الدائرة وتنفسي بعمق';
        clearTimeout(breathingInterval);
    } else {
        isBreathing = true;
        breatheBtn.textContent = 'توقف';
        breathingCircle.classList.add('active');
        let phase = 0;
        const phases = [{t:'شدي نفسك كويس...', d:4000}, {t:'احبسي النفس...', d:4000}, {t:'زفير ببطئ...', d:4000}, {t:'ريحي شويه...', d:4000}];
        const run = () => {
            if (!isBreathing) return;
            breathingText.textContent = phases[phase].t;
            breathingInterval = setTimeout(() => { phase = (phase + 1) % 4; run(); }, phases[phase].d);
        };
        run();
    }
}

function initBreathing() {
    breatheBtn.addEventListener('click', toggleBreathing);
    breathingCircle.addEventListener('click', toggleBreathing);
}

// 4. تتبع الألم و Firebase
function initPainTracker() {
    painLevel.addEventListener('input', () => {
        const val = parseInt(painLevel.value);
        painValue.textContent = arabicNums[val];
        painEmoji.textContent = painEmojis[val - 1] || '😌';
    });

    savePainBtn.addEventListener('click', () => {
        const entry = {
            date: new Date().toISOString(),
            pain: parseInt(painLevel.value),
            notes: painNotes.value.trim()
        };
        db.collection("painHistory").add(entry).then(() => {
            painNotes.value = '';
            showToast('تم حفظ السجل بنجاح 💙');
            loadHistory();
        }).catch(() => showToast('خطأ في الاتصال'));
    });

    loadHistory();
}

function loadHistory() {
    db.collection("painHistory").orderBy("date", "desc").limit(10).get().then((snap) => {
        const history = [];
        snap.forEach(d => history.push({id: d.id, ...d.data()}));
        updateDashboard(history);
        
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-state">لا توجد سجلات سابقة</p>';
            return;
        }
        
        historyList.innerHTML = history.map(e => {
            const d = new Date(e.date);
            return `
                <div class="history-item">
                    <div class="history-item-info">
                        <span class="history-date">${dayNames[d.getDay()]}، ${d.getDate()} ${monthNames[d.getMonth()]}</span>
                        <span class="history-note">${e.notes || ''}</span>
                    </div>
                    <div class="history-pain">
                        <span class="history-pain-value">${arabicNums[e.pain]} ${painEmojis[e.pain-1]}</span>
                        <button class="delete-btn" onclick="deleteEntry('${e.id}')">✕</button>
                    </div>
                </div>`;
        }).join('');
    });
}

// جعل دالة الحذف Global
window.deleteEntry = function(id) {
    if(confirm('حذف هذا السجل؟')) {
        db.collection("painHistory").doc(id).delete().then(() => loadHistory());
    }
};

function updateDashboard(history) {
    const today = new Date().toDateString();
    const tEntries = history.filter(e => new Date(e.date).toDateString() === today);
    document.getElementById('todayLogged').textContent = tEntries.length > 0 ? 'نعم ✓' : 'لا';
    const avg = tEntries.length > 0 ? Math.round(tEntries.reduce((s, e) => s + e.pain, 0) / tEntries.length) : 0;
    document.getElementById('todayAvg').textContent = avg > 0 ? arabicNums[avg] : '-';
}

function setCurrentDate() {
    const n = new Date();
    currentDateEl.textContent = `${dayNames[n.getDay()]}، ${n.getDate()} ${monthNames[n.getMonth()]} ${n.getFullYear()}`;
}

function showToast(m) {
    toast.textContent = m; toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}