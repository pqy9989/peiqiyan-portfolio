/**
 * CSES 多模块导航 + 顶部 tab 状态管理
 * ─────────────────────────────────────
 * 用法：
 *   <body data-module="task-list">   ← 当前模块 ID
 *   ...
 *   <div class="tabbar-left">
 *     <span class="win-ctrl">...</span>
 *     <cs-search-input>...</cs-search-input>
 *     <div class="tabbar-tabs"></div>   ← 容器，tab 由本脚本注入
 *   </div>
 *
 * localStorage：
 *   cses_open_tabs   = JSON.stringify([moduleId, ...])
 *   cses_active_tab  = moduleId
 */
(function () {
  'use strict';

  const STORE_TABS   = 'cses_open_tabs';
  const STORE_ACTIVE = 'cses_active_tab';

  const MODULES = {
    'workspace': { title: '工作台', url: '../workspace/index.html'  },
    'guide':     { title: '导向',   url: '../guide/index.html'      },
    'message':   { title: '消息',   url: '../message/index.html'    },
    'task-list': { title: '任务',   url: '../task-list/index.html'  },
    'meeting':   { title: '会议',   url: '../meeting/index.html'    },
    'doc':       { title: '文档',   url: '../doc/index.html'        },
    'form':      { title: '表单',   url: '../form/index.html'       },
    'approval':  { title: '审批',   url: '../approval/index.html'   },
  };

  function readTabs() {
    try {
      const raw = localStorage.getItem(STORE_TABS);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(id => MODULES[id]) : [];
    } catch (_) { return []; }
  }
  function writeTabs(ids)   { localStorage.setItem(STORE_TABS, JSON.stringify(ids)); }
  function readActive()     { return localStorage.getItem(STORE_ACTIVE) || ''; }
  function writeActive(id)  { localStorage.setItem(STORE_ACTIVE, id); }

  function currentModule() {
    return document.body.dataset.module || '';
  }

  /* ============ 渲染顶部 tab ============ */
  function renderTabs() {
    const container = document.querySelector('.tabbar-tabs');
    if (!container) return;

    const tabs   = readTabs();
    const active = readActive();

    container.innerHTML = tabs.map(id => {
      const m = MODULES[id];
      const isActive = id === active ? ' data-active' : '';
      return `
        <div class="page-tab"${isActive} data-tab-id="${id}">
          <span class="tab-label">${m.title}</span>
          <i class="tab-close cses-stratis-x-01" data-tab-close="${id}"></i>
        </div>
      `;
    }).join('');
  }

  /* ============ 打开 / 切换 tab ============ */
  function openTab(id, opts) {
    if (!MODULES[id]) return;
    const tabs = readTabs();
    if (!tabs.includes(id)) {
      tabs.push(id);
      writeTabs(tabs);
    }
    writeActive(id);

    const shouldNavigate = (!opts || opts.navigate !== false);
    if (shouldNavigate && id !== currentModule()) {
      window.location.href = MODULES[id].url;
    } else {
      renderTabs();
    }
  }

  /* ============ 关闭 tab ============ */
  function closeTab(id) {
    let tabs = readTabs();
    const idx = tabs.indexOf(id);
    if (idx < 0) return;

    tabs.splice(idx, 1);
    writeTabs(tabs);

    const wasActive = readActive() === id;
    if (wasActive) {
      // 优先选右侧、其次左侧、否则置空
      const next = tabs[idx] || tabs[idx - 1] || '';
      writeActive(next);

      if (id === currentModule()) {
        if (next) {
          window.location.href = MODULES[next].url;
        } else {
          // 没有 tab 了，回到工作台（默认入口）
          openTab('workspace');
          window.location.href = MODULES['workspace'].url;
        }
        return;
      }
    }
    renderTabs();
  }

  /* ============ 初始化：保证当前模块在 tab 列表里、并设为激活 ============ */
  function ensureSelfInTabs() {
    const id = currentModule();
    if (!id || !MODULES[id]) return;
    const tabs = readTabs();
    if (!tabs.includes(id)) {
      tabs.push(id);
      writeTabs(tabs);
    }
    writeActive(id);
  }

  /* ============ 事件代理 ============ */
  function wireEvents() {
    // 顶部 tab 区域：点击 tab 切换、点击 × 关闭
    const tabbar = document.querySelector('.tabbar');
    if (tabbar) {
      tabbar.addEventListener('click', function (e) {
        const closeEl = e.target.closest('[data-tab-close]');
        if (closeEl) {
          e.stopPropagation();
          closeTab(closeEl.dataset.tabClose);
          return;
        }
        const tabEl = e.target.closest('[data-tab-id]');
        if (tabEl) {
          openTab(tabEl.dataset.tabId);
        }
      });
    }

    // 一级导航：点击 sidebar nav-item 打开对应模块
    document.querySelectorAll('cs-sidebar .nav-item[data-module]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openTab(el.dataset.module);
      });
    });
  }

  /* ============ 启动 ============ */
  function init() {
    ensureSelfInTabs();
    renderTabs();
    wireEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
