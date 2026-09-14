/**
 * BRUTAL TASKS — Simple Task Manager
 * Clean ES6 OOP Architecture
 */

// ========================
// Task Class (Model)
// ========================
class Task {
  constructor(title, priority = 'medium') {
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    this.title = title;
    this.priority = priority; // 'high' | 'medium' | 'low'
    this.done = false;
    this.createdAt = new Date().toLocaleString();
  }
}

// ========================
// TaskManager Class (State)
// ========================
class TaskManager {
  constructor() {
    this.tasks = this._load();
  }

  // Load tasks from localStorage
  _load() {
    try {
      const data = localStorage.getItem('brutal_tasks');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Save tasks to localStorage
  _save() {
    localStorage.setItem('brutal_tasks', JSON.stringify(this.tasks));
  }

  // Add a new task
  add(title, priority) {
    const task = new Task(title.trim(), priority);
    this.tasks.unshift(task);
    this._save();
    return task;
  }

  // Toggle task done/undone
  toggle(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this._save();
    }
    return task;
  }

  // Delete a task
  delete(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this._save();
  }

  // Clear all completed tasks
  clearDone() {
    const count = this.tasks.filter(t => t.done).length;
    this.tasks = this.tasks.filter(t => !t.done);
    this._save();
    return count;
  }

  // Get stats
  getStats() {
    const total = this.tasks.length;
    const done = this.tasks.filter(t => t.done).length;
    const active = total - done;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, active, percent };
  }

  // Filter tasks
  filter(type) {
    if (type === 'active') return this.tasks.filter(t => !t.done);
    if (type === 'done') return this.tasks.filter(t => t.done);
    return this.tasks; // 'all'
  }
}

// ========================
// App Class (UI Controller)
// ========================
class App {
  constructor() {
    this.manager = new TaskManager();
    this.currentFilter = 'all';

    // Cache DOM elements
    this.$ = {
      input: document.getElementById('task-input'),
      priority: document.getElementById('priority-select'),
      btnAdd: document.getElementById('btn-add'),
      btnTheme: document.getElementById('btn-theme'),
      btnClear: document.getElementById('btn-clear'),
      taskList: document.getElementById('task-list'),
      emptyState: document.getElementById('empty-state'),
      clock: document.getElementById('clock'),
      statTotal: document.getElementById('stat-total'),
      statActive: document.getElementById('stat-active'),
      statDone: document.getElementById('stat-done'),
      statPercent: document.getElementById('stat-percent'),
      pills: document.querySelectorAll('.pill[data-filter]'),
    };

    this._bindEvents();
    this._startClock();
    this._loadTheme();
    this.render();
  }

  // Bind all event listeners
  _bindEvents() {
    // Add task
    this.$.btnAdd.addEventListener('click', () => this._addTask());
    this.$.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._addTask();
    });

    // Theme toggle
    this.$.btnTheme.addEventListener('click', () => this._toggleTheme());

    // Clear done
    this.$.btnClear.addEventListener('click', () => {
      const count = this.manager.clearDone();
      if (count > 0) this.render();
    });

    // Filter pills
    this.$.pills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.$.pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentFilter = pill.dataset.filter;
        this.render();
      });
    });
  }

  // Add a task from the input
  _addTask() {
    const title = this.$.input.value.trim();
    if (!title) {
      this.$.input.focus();
      return;
    }

    this.manager.add(title, this.$.priority.value);
    this.$.input.value = '';
    this.$.input.focus();
    this.render();
  }

  // Toggle dark/light theme
  _toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('brutal_theme', isDark ? 'dark' : 'light');
    this.$.btnTheme.textContent = isDark ? '☀️' : '🌙';
  }

  // Load saved theme
  _loadTheme() {
    if (localStorage.getItem('brutal_theme') === 'dark') {
      document.body.classList.add('dark');
      this.$.btnTheme.textContent = '☀️';
    }
  }

  // Live clock
  _startClock() {
    const update = () => {
      this.$.clock.textContent = new Date().toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    };
    update();
    setInterval(update, 1000);
  }

  // Main render function
  render() {
    const tasks = this.manager.filter(this.currentFilter);
    const stats = this.manager.getStats();

    // Update stats
    this.$.statTotal.textContent = stats.total;
    this.$.statActive.textContent = stats.active;
    this.$.statDone.textContent = stats.done;
    this.$.statPercent.textContent = stats.percent + '%';

    // Show empty state or task list
    if (tasks.length === 0) {
      this.$.taskList.style.display = 'none';
      this.$.emptyState.style.display = 'block';
      return;
    }

    this.$.taskList.style.display = 'flex';
    this.$.emptyState.style.display = 'none';

    // Build task cards
    this.$.taskList.innerHTML = tasks.map(task => `
      <div class="task-card ${task.done ? 'done' : ''}" data-id="${task.id}">
        <input type="checkbox" class="checkbox" ${task.done ? 'checked' : ''}>
        <div class="task-info">
          <div class="task-title">${this._escape(task.title)}</div>
          <div class="task-meta">${task.createdAt}</div>
        </div>
        <span class="badge badge-${task.priority}">
          ${task.priority === 'high' ? '🔥' : task.priority === 'medium' ? '⚡' : '🌱'} ${task.priority}
        </span>
        <button class="btn-delete" title="Delete">🗑️</button>
      </div>
    `).join('');

    // Attach card event listeners
    this.$.taskList.querySelectorAll('.task-card').forEach(card => {
      const id = card.dataset.id;

      card.querySelector('.checkbox').addEventListener('change', () => {
        this.manager.toggle(id);
        this.render();
      });

      card.querySelector('.btn-delete').addEventListener('click', () => {
        this.manager.delete(id);
        this.render();
      });
    });
  }

  // Escape HTML to prevent XSS
  _escape(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// ========================
// Start the app
// ========================
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
