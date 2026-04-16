let state = {
  tasks: [],
  sortBy: null,
  nextId: 1,
};
 
// Pure helpers 
 
const createTask = (id, text, now) => ({
  id,
  text,
  done: false,
  createdAt: now,
  updatedAt: now,
});
 
const toggleTask = (task) => ({
  ...task,
  done: !task.done,
  updatedAt: Date.now(),
});
 
const updateTaskText = (task, text) => ({
  ...task,
  text,
  updatedAt: Date.now(),
});
 
const removeTaskById = (tasks, id) =>
  tasks.filter((t) => t.id !== id);
 
const replaceTask = (tasks, updated) =>
  tasks.map((t) => (t.id === updated.id ? updated : t));
 
const sortTasks = (tasks, sortBy) => {
  if (!sortBy) return tasks;
  return [...tasks].sort((a, b) => {
    if (sortBy === 'createdAt') return a.createdAt - b.createdAt;
    if (sortBy === 'updatedAt') return b.updatedAt - a.updatedAt;
    if (sortBy === 'done') return Number(a.done) - Number(b.done);
    return 0;
  });
};
 
const countDone = (tasks) => tasks.filter((t) => t.done).length;
 
const formatTime = (ts) =>
  new Date(ts).toLocaleString('uk-UA', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
 
const escapeHtml = (str) => {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
};
 
//  DOM helpers 
 
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const setText = (el, t) => { el.textContent = t; };
const setHtml = (el, h) => { el.innerHTML = h; };
const show = (el) => { el.style.display = ''; };
const hide = (el) => { el.style.display = 'none'; };
 
// Toast 
 
const showToast = (message) => {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 3000);
};
 
//Modal 
 
const openEditModal = (task) => {
  $('#editId').value = task.id;
  $('#editTaskInput').value = task.text;
  setText($('#editError'), '');
  $('#editModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#editTaskInput').focus(), 80);
};
 
const closeEditModal = () => {
  $('#editModal').classList.remove('open');
  document.body.style.overflow = '';
};
 
//Validation
 
const validateTaskText = (value, errorEl) => {
  if (!value || value.trim().length < 2) {
    setText(errorEl, 'Текст завдання має містити щонайменше 2 символи.');
    return false;
  }
  setText(errorEl, '');
  return true;
};
 
//  Render 
 
const buildTaskItem = (task) => {
  const li = document.createElement('li');
  li.className = `task-item${task.done ? ' done' : ''}`;
  li.dataset.id = task.id;
  li.setAttribute('role', 'listitem');
 
  li.innerHTML = `
    <input
      type="checkbox"
      class="task-check"
      aria-label="Відмітити завдання як виконане"
      ${task.done ? 'checked' : ''}
    />
    <div class="task-body">
      <div class="task-text">${escapeHtml(task.text)}</div>
      <div class="task-meta">
        Створено: ${formatTime(task.createdAt)}
        ${task.updatedAt !== task.createdAt ? ` · Оновлено: ${formatTime(task.updatedAt)}` : ''}
      </div>
    </div>
    <div class="task-actions">
      <button class="btn-icon" data-action="edit" aria-label="Редагувати">✏️</button>
      <button class="btn-icon btn-del" data-action="delete" aria-label="Видалити">🗑️</button>
    </div>
  `;
  return li;
};
 
const renderTasks = () => {
  const list = $('#taskList');
  const emptyState = $('#emptyState');
 
  const sorted = sortTasks(state.tasks, state.sortBy);
 
  if (state.tasks.length === 0) {
    hide(list);
    show(emptyState);
  } else {
    show(list);
    hide(emptyState);
  }
 
  setHtml(list, '');
  sorted.forEach((task) => {
    list.appendChild(buildTaskItem(task));
  });
 
  renderStats();
};
 
const renderStats = () => {
  const done = countDone(state.tasks);
  setText($('#todoStats'), `${state.tasks.length} завдань · ${done} виконано`);
};
 
// Handlers 
 
const handleAddTask = (text) => {
  const now = Date.now();
  const task = createTask(state.nextId, text.trim(), now);
  state = { ...state, tasks: [...state.tasks, task], nextId: state.nextId + 1 };
  renderTasks();
};
 
const handleToggleTask = (id) => {
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;
  const updated = toggleTask(task);
  state = { ...state, tasks: replaceTask(state.tasks, updated) };
  renderTasks();
};
 
const handleDeleteTask = (id) => {
  const li = $(`[data-id="${id}"]`);
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;
 
  if (li) {
    li.classList.add('removing');
    li.addEventListener('animationend', () => {
      state = { ...state, tasks: removeTaskById(state.tasks, id) };
      renderTasks();
      showToast(`🗑️ Завдання видалено.`);
    }, { once: true });
  } else {
    state = { ...state, tasks: removeTaskById(state.tasks, id) };
    renderTasks();
    showToast(`🗑️ Завдання видалено.`);
  }
};
 
const handleEditSave = () => {
  const id = parseInt($('#editId').value, 10);
  const text = $('#editTaskInput').value;
  const errorEl = $('#editError');
 
  if (!validateTaskText(text, errorEl)) return;
 
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;
 
  const updated = updateTaskText(task, text.trim());
  state = { ...state, tasks: replaceTask(state.tasks, updated) };
  renderTasks();
  closeEditModal();
  showToast(`✏️ Завдання оновлено.`);
};
 
//  Init 
 
const init = () => {
  
  const now = Date.now();
  [
    'Полити кімнатні рослини ',
    'Скласти список покупок для тижня',
    'Прочитати 30 сторінок книги',
  ].forEach((text, i) => {
    const task = createTask(state.nextId, text, now - (3 - i) * 60000);
    state = { ...state, tasks: [...state.tasks, task], nextId: state.nextId + 1 };
  });
 
  renderTasks();
 
  
  $('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#newTaskInput');
    const errorEl = $('#addError');
    if (!validateTaskText(input.value, errorEl)) return;
    handleAddTask(input.value);
    input.value = '';
    setText(errorEl, '');
    showToast('✅ Завдання додано!');
  });
 
  $('#newTaskInput').addEventListener('input', () => {
    validateTaskText($('#newTaskInput').value, $('#addError'));
  });
 
  
  $('#taskList').addEventListener('click', (e) => {
    const li = e.target.closest('.task-item');
    if (!li) return;
    const id = parseInt(li.dataset.id, 10);
 
    
    if (e.target.classList.contains('task-check')) {
      handleToggleTask(id);
      return;
    }
 
   
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
 
    if (btn.dataset.action === 'delete') {
      handleDeleteTask(id);
    } else if (btn.dataset.action === 'edit') {
      const task = state.tasks.find((t) => t.id === id);
      if (task) openEditModal(task);
    }
  });
 
  
  $('#editModalClose').addEventListener('click', closeEditModal);
  $('#editCancel').addEventListener('click', closeEditModal);
  $('#editModal').addEventListener('click', (e) => {
    if (e.target === $('#editModal')) closeEditModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEditModal();
  });
 
  
  $('#editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    handleEditSave();
  });
 
  $('#editTaskInput').addEventListener('input', () => {
    validateTaskText($('#editTaskInput').value, $('#editError'));
  });
 
  
  $$('.btn-sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sort = btn.dataset.sort;
      state = { ...state, sortBy: state.sortBy === sort ? null : sort };
      $$('.btn-sort').forEach((b) => b.classList.toggle('active', b.dataset.sort === state.sortBy));
      renderTasks();
    });
  });
 
  $('#resetSort').addEventListener('click', () => {
    state = { ...state, sortBy: null };
    $$('.btn-sort').forEach((b) => b.classList.remove('active'));
    renderTasks();
  });
};
 
document.addEventListener('DOMContentLoaded', init);