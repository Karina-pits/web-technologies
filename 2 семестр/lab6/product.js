//State 
let state = {
  products: [],
  filterCategory: null,
  sortBy: null,
  nextId: 1,
};
 
// Pure helpers 
 
const generateId = (nextId) => `#${String(nextId).padStart(4, '0')}`;
 
const createProduct = (id, name, price, category, imageUrl, now) => ({
  id: generateId(id),
  _seq: id,
  name,
  price: parseFloat(price),
  category,
  imageUrl,
  createdAt: now,
  updatedAt: now,
});
 
const updateProduct = (product, name, price, category, imageUrl, now) => ({
  ...product,
  name,
  price: parseFloat(price),
  category,
  imageUrl,
  updatedAt: now,
});
 
const removeProductById = (products, id) =>
  products.filter((p) => p.id !== id);
 
const replaceProduct = (products, updated) =>
  products.map((p) => (p.id === updated.id ? updated : p));
 
const filterProducts = (products, category) =>
  category ? products.filter((p) => p.category === category) : products;
 
const sortProducts = (products, sortBy) => {
  if (!sortBy) return products;
  return [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'createdAt') return a.createdAt - b.createdAt;
    if (sortBy === 'updatedAt') return a.updatedAt - b.updatedAt;
    return 0;
  });
};
 
const getCategories = (products) =>
  Array.from(new Set(products.map(p => p.category))); //set прибирає дублікати 
 
const calcTotal = (products) =>
  products.reduce((sum, p) => sum + p.price, 0);
 
const formatPrice = (price) =>
  price.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₴';
 
const formatDate = (ts) =>
  new Date(ts).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
 
//DOM helpers 
 
const $ = (sel) => document.querySelector(sel);       //sel - параметр функції             Ця функція використовується для пошуку одного елемента на сторінці за CSS-селектором
const $$ = (sel) => document.querySelectorAll(sel);  //Ця функція повертає всі елементи, які відповідають селектору
 
const setHtml = (el, html) => { el.innerHTML = html; };    //Ця функція вставляє HTML-код всередину елемента.
const setText = (el, text) => { el.textContent = text; };   //Ця функція вставляє звичайний текст в елемент.
const show = (el) => { el.style.display = ''; };           //Ця функція показує елемент, прибираючи стиль display: none.
const hide = (el) => { el.style.display = 'none'; };   //Ця функція приховує елемент, встановлюючи йому display: none.
 
// Toast 
 
const showToast = (message, type = 'success') => {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 3500);
};
 
// Modal 
 
const openModal = (title) => {
  setText($('#modalTitle'), title);
  $('#modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#fieldName').focus(), 100);
};
 
const closeModal = () => {
  $('#modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  resetForm();
};
 
const resetForm = () => {
  $('#productForm').reset();
  $('#editId').value = '';
  $$('.field-error').forEach((el) => setText(el, ''));
};
 
const fillForm = (product) => {
  $('#editId').value = product.id;
  $('#fieldName').value = product.name;
  $('#fieldPrice').value = product.price;
  $('#fieldCategory').value = product.category;
  $('#fieldImage').value = product.imageUrl;
};
 
// Validation 
 
const validateField = (input) => {
  const error = input.closest('.form-group').querySelector('.field-error');
  if (!input.validity.valid) {
    setText(error, input.validationMessage);
    return false;
  }
  setText(error, '');
  return true;
};
 
const validateForm = () => {
  const fields = ['#fieldName', '#fieldPrice', '#fieldCategory', '#fieldImage'];
  return fields.map((sel) => validateField($(sel))).every(Boolean);
};
 
// Render 
 
const buildCardHTML = (product) => `
  <div class="product-img-wrap">
    <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" loading="lazy"
         onerror="this.src='https://placehold.co/400x300/b8dfc5/357a52?text='"/>
  </div>
  <div class="product-body">
    <span class="product-id">${escapeHtml(product.id)}</span>
    <h3 class="product-name">${escapeHtml(product.name)}</h3>
    <div class="product-price">${formatPrice(product.price)}</div>
    <span class="product-category">${escapeHtml(product.category)}</span>
  </div>
  <div class="card-actions">
    <button class="btn btn-edit" data-action="edit" data-id="${escapeHtml(product.id)}" aria-label="Редагувати ${escapeHtml(product.name)}">✏️ Редагувати</button>
    <button class="btn btn-delete" data-action="delete" data-id="${escapeHtml(product.id)}" aria-label="Видалити ${escapeHtml(product.name)}">🗑️ Видалити</button>
  </div>
`;
 
const escapeHtml = (str) => {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
};
 
const renderProducts = () => {
  const list = $('#productList');
  const emptyMsg = $('#emptyMessage');
 
  const visible = sortProducts(
    filterProducts(state.products, state.filterCategory),
    state.sortBy
  );
 
  if (state.products.length === 0) {
    hide(list);
    show(emptyMsg);
  } else {
    show(list);
    hide(emptyMsg);
  }
 
  
  const existingIds = new Set([...list.querySelectorAll('.product-card')].map((li) => li.dataset.id));
  const visibleIds = new Set(visible.map((p) => p.id));
 
  
  list.querySelectorAll('.product-card').forEach((li) => {
  if (!visibleIds.has(li.dataset.id)) li.remove();
});
 
  
  setHtml(list, '');
  visible.forEach((product) => {
    const li = document.createElement('li');
    li.className = 'product-card';
    li.dataset.id = product.id;
    setHtml(li, buildCardHTML(product));
    list.appendChild(li);
  });
 
  renderTotal();
  renderFilterButtons();
};
 
const renderTotal = () => {
  const total = calcTotal(state.products);
  setText($('#totalValue'), formatPrice(total));
};
 
const renderFilterButtons = () => {
  const container = $('#filterButtons');
  const categories = getCategories(state.products);
  setHtml(container, '');
  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = `btn btn-filter${state.filterCategory === cat ? ' active' : ''}`;
    btn.textContent = cat;
    btn.dataset.category = cat;
    container.appendChild(btn);
  });
};
 
//  Event Handlers 
 
const handleAddProduct = (formData) => {
  const now = Date.now();
  const product = createProduct(
    state.nextId,
    formData.name, formData.price,
    formData.category, formData.imageUrl,
    now
  );
  state = { ...state, products: [...state.products, product], nextId: state.nextId + 1 };
  renderProducts();
  closeModal();
  showToast(`✅ Товар "${product.name}" додано!`);
};
 
const handleEditProduct = (formData) => {
  const now = Date.now();
  const existing = state.products.find((p) => p.id === formData.editId);
  if (!existing) return;
  const updated = updateProduct(existing, formData.name, formData.price, formData.category, formData.imageUrl, now);
  state = { ...state, products: replaceProduct(state.products, updated) };
  renderProducts();
  closeModal();
  showToast(`✏️ Оновлено: ${updated.id} — "${updated.name}"`);
};
 
const handleDeleteProduct = (id) => {
  const card = $(`[data-id="${id}"]`);
  const product = state.products.find((p) => p.id === id);
  if (!product) return;
 
  if (card) {
    card.classList.add('card-removing');
    card.addEventListener('animationend', () => {
      state = { ...state, products: removeProductById(state.products, id) };
      renderProducts();
      showToast(`🗑️ Товар "${product.name}" видалено.`);
    }, { once: true });
  } else {
    state = { ...state, products: removeProductById(state.products, id) };
    renderProducts();
    showToast(`🗑️ Товар "${product.name}" видалено.`);
  }
};
 
const handleFormSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;
 
  const formData = {
    editId: $('#editId').value,
    name: $('#fieldName').value.trim(),
    price: $('#fieldPrice').value,
    category: $('#fieldCategory').value,
    imageUrl: $('#fieldImage').value.trim(),
  };
 
  if (formData.editId) {
    handleEditProduct(formData);
  } else {
    handleAddProduct(formData);
  }
};
 
// Init 
 
const seedProducts = () => {
  const now = Date.now();
  const samples = [
    { name: 'Зелений чай', price: 185, category: 'Напої', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
    { name: 'Листовий м"ятний чай', price: 95, category: 'Напої', img: 'https://images.unsplash.com/photo-1597481499666-5ece01dbac5a?w=400&h=300&fit=crop' },
    { name: 'Крем для обличчя Aloe', price: 320, category: 'Косметика', img: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=300&fit=crop' },
    { name: 'Зволожуюча маска', price: 155, category: 'Косметика', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop' },
    { name: 'Фікус бенджаміна', price: 480, category: 'Рослини', img: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=400&h=300&fit=crop' },
    { name: 'Суккулент Ехеверія', price: 210, category: 'Рослини', img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop' },
  ];
 
  samples.forEach((s, i) => {
    const p = createProduct(state.nextId + i, s.name, s.price, s.category, s.img, now - (samples.length - i) * 60000);
    state = { ...state, products: [...state.products, p] };
  });
  state = { ...state, nextId: state.nextId + samples.length };
};
 
const init = () => {
  seedProducts();
  renderProducts();
 
  
  $('#openAddModal').addEventListener('click', () => {
    $('#modalTitle').textContent = 'Додати товар';
    resetForm();
    openModal('Додати товар');
  });
 
  
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalCancel').addEventListener('click', closeModal);
  $('#modalOverlay').addEventListener('click', (e) => {
    if (e.target === $('#modalOverlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
 
 
  $('#productForm').addEventListener('submit', handleFormSubmit);
 
  ['#fieldName', '#fieldPrice', '#fieldCategory', '#fieldImage'].forEach((sel) => {
    $(sel).addEventListener('input', () => validateField($(sel)));
  });
 
 //"Цей блок реалізує обробку відправки форми та live-валідацію полів. При submit викликається функція обробки форми, а при введенні даних у кожне поле виконується перевірка в реальному часі для покращення користувацького досвіду."
 
 
 
 $('#productList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'delete') {
      handleDeleteProduct(id);
    } else if (btn.dataset.action === 'edit') {
      const product = state.products.find((p) => p.id === id);
      if (!product) return;
      fillForm(product);
      openModal('Редагувати товар');
    }
  });
 
  
  $('#filterButtons').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;
    const cat = btn.dataset.category;
    state = { ...state, filterCategory: state.filterCategory === cat ? null : cat };
    renderProducts();
  });
 
  
  $('#resetFilter').addEventListener('click', () => {
    state = { ...state, filterCategory: null };
    renderProducts();
  });
 
 
  $$('.btn-sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sort = btn.dataset.sort;
      state = { ...state, sortBy: state.sortBy === sort ? null : sort };
      $$('.btn-sort').forEach((b) => b.classList.toggle('active', b.dataset.sort === state.sortBy));
      renderProducts();
    });
  });
 
  
  $('#resetSort').addEventListener('click', () => {
    state = { ...state, sortBy: null };
    $$('.btn-sort').forEach((b) => b.classList.remove('active'));
    renderProducts();
  });
};
 
document.addEventListener('DOMContentLoaded', init);