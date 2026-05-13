
function openTab(tabName) {
    document.querySelectorAll('.form-content').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName + 'Form').classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
}

function togglePass(id, el) {
    const input = document.getElementById(id);
    const svg = el.querySelector('svg');
    const eyePath = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    const linePath = '<line x1="3" y1="3" x2="21" y2="21" stroke-width="2"></line>';

    if (input.type === 'password') {
        input.type = 'text';
        svg.innerHTML = eyePath; 
    } else {
        input.type = 'password';
        svg.innerHTML = eyePath + linePath; 
    }
}

const cities = {
    Ukraine: ['Київ', 'Львів', 'Одеса'],
    USA: ['New York', 'Los Angeles', 'Chicago']
};

document.getElementById('countrySelect').addEventListener('change', function() {
    const citySelect = document.getElementById('citySelect');
    citySelect.innerHTML = '<option value="">Оберіть місто</option>';
    if (this.value) {
        citySelect.disabled = false;
        cities[this.value].forEach(c => citySelect.add(new Option(c, c)));
    } else {
        citySelect.disabled = true;
    }
});


function validate(field, condition, msg) {
    const err = field.closest('.form-group').querySelector('.error-msg');
    if (condition) {
        field.classList.add('valid');
        field.classList.remove('invalid');
        err.textContent = 'Виглядає чудово!';
        return true;
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
        err.textContent = msg;
        return false;
    }
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);        //витягує всі значення з полів 
    let ok = true;                 //зміна прапорець

    ok &= validate(this.firstName, fd.get('firstName').length >= 3 && fd.get('firstName').length <= 15, "3-15 символів"); 
    ok &= validate(this.lastName, fd.get('lastName').length >= 3 && fd.get('lastName').length <= 15, "3-15 символів"); 
    ok &= validate(this.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.get('email')), "Невірний Email"); 
    ok &= validate(this.password, fd.get('password').length >= 6, "Мін. 6 символів"); 
    ok &= validate(this.confirmPassword, fd.get('confirmPassword') === fd.get('password') && fd.get('confirmPassword') !== "", "Паролі не збігаються"); 
    ok &= validate(this.phone, /^\+380\d{9}$/.test(fd.get('phone')), "Формат +380XXXXXXXXX"); 

    const bValue = fd.get('birthDate');
    if (bValue) {
        const bDate = new Date(bValue);
        const age = new Date().getFullYear() - bDate.getFullYear();
        ok &= validate(this.birthDate, age >= 12 && bDate < new Date(), "Тільки від 12 років"); 
    } else {
        ok &= validate(this.birthDate, false, "Обов'язкове поле");
    }

    ok &= validate(this.sex, fd.get('sex') !== "", "Оберіть стать");
    ok &= validate(this.country, fd.get('country') !== "", "Оберіть країну");
    ok &= validate(this.city, fd.get('city') !== "", "Оберіть місто");

    if (ok) {
        alert("Успішно зареєстровано!"); 
        this.reset(); 
        document.querySelectorAll('.valid').forEach(i => i.classList.remove('valid'));
        document.querySelectorAll('.error-msg').forEach(m => m.textContent = '');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    let ok = true;
    ok &= validate(this.username, fd.get('username').length > 0, "Введіть ім'я");
    ok &= validate(this.loginPassword, fd.get('loginPassword').length >= 6, "Мін. 6 символів");
    if(ok) alert("Вхід виконано!");
});