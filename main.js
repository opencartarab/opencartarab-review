// دالة شاملة لجلب المكونات وتفعيل الروابط النشطة
function loadComponents() {
    const components = [
        { id: 'header-placeholder', file: 'header.html' },
        { id: 'footer-placeholder', file: 'footer.html' }
    ];

    components.forEach(comp => {
        const el = document.getElementById(comp.id);
        if (el) {
            fetch(comp.file)
                .then(response => response.text())
                .then(data => {
                    el.innerHTML = data;
                    if (comp.id === 'header-placeholder') {
                        setActiveLink();
                    }
                });
        }
    });
}

// دالة تحديد الرابط النشط تلقائياً
function setActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .dropdown-item');
    
    links.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.nav-link').classList.add('active');
                }
            }
        }
    });
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadComponents);