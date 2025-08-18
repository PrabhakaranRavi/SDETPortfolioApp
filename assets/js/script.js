'use strict';

// tiny helper
const elementToggleFunc = (elem, cls = "active") => elem && elem.classList.toggle(cls);

document.addEventListener('DOMContentLoaded', () => {
  // ===== Sidebar toggle =====
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar, 'active'));
  }

  // ===== Testimonials modal =====
  const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const overlay = document.querySelector('[data-overlay]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  const testimonialsModalFunc = () => {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  };

  if (testimonialsItem.length && modalContainer && overlay && modalImg && modalTitle && modalText) {
    testimonialsItem.forEach((item) => {
      item.addEventListener('click', function () {
        const avatar = this.querySelector('[data-testimonials-avatar]');
        const title = this.querySelector('[data-testimonials-title]');
        const text = this.querySelector('[data-testimonials-text]');
        if (avatar && title && text) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt || '';
          modalTitle.innerHTML = title.innerHTML;
          modalText.innerHTML = text.innerHTML;
        }
        testimonialsModalFunc();
      });
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  if (overlay) overlay.addEventListener('click', testimonialsModalFunc);

  // ===== Custom select (optional section) =====
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  // NOTE: fixed original typo: data-selecct-value -> data-select-value
  const selectValue = document.querySelector('[data-select-value]');
  const filterBtn = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  const filterFunc = (selectedValue) => {
    if (!filterItems.length) return;
    filterItems.forEach((el) => {
      if (selectedValue === 'all' || selectedValue === el.dataset.category) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  if (select) {
    select.addEventListener('click', function () { elementToggleFunc(this, 'active'); });
  }

  if (selectItems.length && select && selectValue) {
    selectItems.forEach((item) => {
      item.addEventListener('click', function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select, 'active');
        filterFunc(selectedValue);
      });
    });
  }

  if (filterBtn.length && selectValue) {
    let lastClickedBtn = filterBtn[0];
    filterBtn.forEach((btn) => {
      btn.addEventListener('click', function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
      });
    });
  }

  // ===== Contact form enable/disable =====
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');
  if (form && formInputs.length && formBtn) {
    const validate = () => {
      formBtn.toggleAttribute('disabled', !form.checkValidity());
    };
    formInputs.forEach((inp) => inp.addEventListener('input', validate));
    validate();
  }

  // ===== Page navigation =====
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');
  if (navigationLinks.length && pages.length) {
    navigationLinks.forEach((link) => {
      link.addEventListener('click', function () {
        const target = this.innerHTML.trim().toLowerCase();
        pages.forEach((page, i) => {
          const isActive = (target === page.dataset.page);
          page.classList.toggle('active', isActive);
          navigationLinks[i].classList.toggle('active', isActive);
        });
        window.scrollTo(0, 0);
      });
    });
  }
});
