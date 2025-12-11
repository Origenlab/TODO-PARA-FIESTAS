/**
 * Todo Para Fiestas - JavaScript Principal
 * Directorio de proveedores para fiestas y eventos en México
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURACIÓN GLOBAL
    // ============================================
    const CONFIG = {
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024,
        animationDuration: 300,
        scrollOffset: 80
    };

    // ============================================
    // UTILIDADES
    // ============================================
    const Utils = {
        // Debounce para optimizar eventos
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle para eventos frecuentes
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Verificar si es dispositivo móvil
        isMobile() {
            return window.innerWidth < CONFIG.mobileBreakpoint;
        },

        // Verificar si es tablet
        isTablet() {
            return window.innerWidth >= CONFIG.mobileBreakpoint &&
                   window.innerWidth < CONFIG.tabletBreakpoint;
        },

        // Scroll suave a elemento
        smoothScrollTo(target, offset = CONFIG.scrollOffset) {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        },

        // Formatear número con separadores
        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        // Formatear precio en pesos mexicanos
        formatPrice(price) {
            return '$' + this.formatNumber(price) + ' MXN';
        }
    };

    // ============================================
    // MENÚ MÓVIL
    // ============================================
    const MobileMenu = {
        menuToggle: null,
        navMenu: null,
        isOpen: false,

        init() {
            this.menuToggle = document.querySelector('.mobile-menu-toggle');
            this.navMenu = document.querySelector('.nav-menu');

            if (!this.menuToggle || !this.navMenu) return;

            this.menuToggle.addEventListener('click', () => this.toggle());

            // Cerrar menú al hacer clic en un enlace
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
                    this.close();
                }
            });

            // Cerrar menú en resize
            window.addEventListener('resize', Utils.debounce(() => {
                if (!Utils.isMobile() && this.isOpen) {
                    this.close();
                }
            }, 250));
        },

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.isOpen = true;
            this.navMenu.classList.add('active');
            this.menuToggle.classList.add('active');
            this.menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        },

        close() {
            this.isOpen = false;
            this.navMenu.classList.remove('active');
            this.menuToggle.classList.remove('active');
            this.menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // NAVEGACIÓN DROPDOWN
    // ============================================
    const DropdownNav = {
        dropdowns: [],

        init() {
            this.dropdowns = document.querySelectorAll('.nav-item.has-dropdown');

            this.dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                const menu = dropdown.querySelector('.dropdown-menu');

                if (!link || !menu) return;

                // En móvil, toggle al hacer clic
                link.addEventListener('click', (e) => {
                    if (Utils.isMobile()) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });

                // En desktop, mostrar/ocultar con hover (ya manejado por CSS)
                // Pero agregamos soporte para teclado
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });

            // Cerrar dropdowns al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-item.has-dropdown')) {
                    this.closeAll();
                }
            });
        },

        closeAll() {
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    };

    // ============================================
    // HEADER STICKY CON SCROLL
    // ============================================
    const StickyHeader = {
        header: null,
        lastScroll: 0,
        isHidden: false,

        init() {
            this.header = document.querySelector('.header');
            if (!this.header) return;

            window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
        },

        handleScroll() {
            const currentScroll = window.pageYOffset;

            // Agregar clase scrolled cuando no está en el top
            if (currentScroll > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Ocultar header al hacer scroll hacia abajo, mostrar al subir
            if (currentScroll > this.lastScroll && currentScroll > 200) {
                if (!this.isHidden) {
                    this.header.classList.add('header-hidden');
                    this.isHidden = true;
                }
            } else {
                if (this.isHidden) {
                    this.header.classList.remove('header-hidden');
                    this.isHidden = false;
                }
            }

            this.lastScroll = currentScroll;
        }
    };

    // ============================================
    // BÚSQUEDA
    // ============================================
    const Search = {
        form: null,
        input: null,
        suggestions: null,

        init() {
            this.form = document.querySelector('.search-form, .hero-search-form');
            this.input = document.querySelector('.search-input, .hero-search-input');

            if (!this.form || !this.input) return;

            // Prevenir submit vacío
            this.form.addEventListener('submit', (e) => {
                if (!this.input.value.trim()) {
                    e.preventDefault();
                    this.input.focus();
                }
            });

            // Búsqueda en tiempo real (preparado para AJAX)
            this.input.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        },

        handleSearch(query) {
            if (query.length < 2) {
                this.hideSuggestions();
                return;
            }
            // Aquí se implementaría la búsqueda AJAX
            console.log('Buscando:', query);
        },

        showSuggestions(results) {
            // Implementar mostrar sugerencias
        },

        hideSuggestions() {
            // Implementar ocultar sugerencias
        }
    };

    // ============================================
    // FILTROS DE CATEGORÍA
    // ============================================
    const Filters = {
        sidebar: null,
        toggleBtn: null,
        closeBtn: null,
        overlay: null,
        checkboxes: [],
        activeFilters: {},

        init() {
            this.sidebar = document.querySelector('.filters-sidebar');
            this.toggleBtn = document.querySelector('.filter-toggle-btn, [data-filter-toggle]');
            this.closeBtn = document.querySelector('.filters-close');
            this.overlay = document.querySelector('.filters-overlay');

            if (!this.sidebar) return;

            // Crear overlay si no existe
            if (!this.overlay) {
                this.overlay = document.createElement('div');
                this.overlay.className = 'filters-overlay';
                document.body.appendChild(this.overlay);
            }

            // Toggle sidebar en móvil
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
            }

            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeSidebar());
            }

            this.overlay.addEventListener('click', () => this.closeSidebar());

            // Inicializar checkboxes
            this.checkboxes = this.sidebar.querySelectorAll('input[type="checkbox"]');
            this.checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => this.handleFilterChange(e));
            });

            // Inicializar rangos de precio
            this.initPriceRange();

            // Botón limpiar filtros
            const clearBtn = this.sidebar.querySelector('.filters-clear, [data-clear-filters]');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => this.clearAll());
            }

            // Expandir/colapsar grupos de filtros
            this.initFilterGroups();
        },

        toggleSidebar() {
            this.sidebar.classList.toggle('active');
            this.overlay.classList.toggle('active');
            document.body.classList.toggle('filters-open');
        },

        closeSidebar() {
            this.sidebar.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.classList.remove('filters-open');
        },

        handleFilterChange(e) {
            const checkbox = e.target;
            const filterGroup = checkbox.closest('.filter-group');
            const groupName = filterGroup?.dataset.filterGroup || checkbox.name;

            if (!this.activeFilters[groupName]) {
                this.activeFilters[groupName] = [];
            }

            if (checkbox.checked) {
                this.activeFilters[groupName].push(checkbox.value);
            } else {
                const index = this.activeFilters[groupName].indexOf(checkbox.value);
                if (index > -1) {
                    this.activeFilters[groupName].splice(index, 1);
                }
            }

            this.applyFilters();
            this.updateFilterCount();
        },

        applyFilters() {
            // Aquí se implementaría la lógica de filtrado
            // Puede ser filtrado en cliente o solicitud AJAX
            console.log('Filtros activos:', this.activeFilters);

            // Disparar evento personalizado
            document.dispatchEvent(new CustomEvent('filtersChanged', {
                detail: this.activeFilters
            }));
        },

        clearAll() {
            this.checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            this.activeFilters = {};
            this.applyFilters();
            this.updateFilterCount();
        },

        updateFilterCount() {
            const count = Object.values(this.activeFilters)
                .reduce((total, arr) => total + arr.length, 0);

            const badge = document.querySelector('.filter-count-badge');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
        },

        initPriceRange() {
            const rangeInputs = this.sidebar.querySelectorAll('.price-range input[type="range"]');
            rangeInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const output = e.target.nextElementSibling ||
                                   e.target.parentElement.querySelector('.range-value');
                    if (output) {
                        output.textContent = Utils.formatPrice(e.target.value);
                    }
                });
            });
        },

        initFilterGroups() {
            const groupHeaders = this.sidebar.querySelectorAll('.filter-group-header');
            groupHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const group = header.closest('.filter-group');
                    group.classList.toggle('collapsed');
                });
            });
        }
    };

    // ============================================
    // GALERÍA DE IMÁGENES
    // ============================================
    const Gallery = {
        mainImage: null,
        thumbnails: [],
        lightbox: null,
        currentIndex: 0,
        images: [],

        init() {
            this.mainImage = document.querySelector('.gallery-main img, .vendor-gallery-main img');
            this.thumbnails = document.querySelectorAll('.gallery-thumb, .vendor-gallery-thumb');

            if (!this.mainImage || !this.thumbnails.length) return;

            // Guardar todas las imágenes
            this.images = Array.from(this.thumbnails).map(thumb => ({
                src: thumb.dataset.fullsize || thumb.querySelector('img')?.src || thumb.src,
                alt: thumb.querySelector('img')?.alt || thumb.alt || ''
            }));

            // Click en miniaturas
            this.thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => this.selectImage(index));
            });

            // Click en imagen principal para lightbox
            this.mainImage.addEventListener('click', () => this.openLightbox());

            // Inicializar lightbox
            this.initLightbox();
        },

        selectImage(index) {
            this.currentIndex = index;

            // Actualizar imagen principal
            const newSrc = this.images[index].src;
            this.mainImage.style.opacity = '0';

            setTimeout(() => {
                this.mainImage.src = newSrc;
                this.mainImage.alt = this.images[index].alt;
                this.mainImage.style.opacity = '1';
            }, 150);

            // Actualizar clase activa en miniaturas
            this.thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        },

        initLightbox() {
            // Crear lightbox si no existe
            if (document.querySelector('.lightbox')) return;

            this.lightbox = document.createElement('div');
            this.lightbox.className = 'lightbox';
            this.lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
                    <button class="lightbox-prev" aria-label="Anterior">&#10094;</button>
                    <img class="lightbox-image" src="" alt="">
                    <button class="lightbox-next" aria-label="Siguiente">&#10095;</button>
                    <div class="lightbox-counter"></div>
                </div>
            `;
            document.body.appendChild(this.lightbox);

            // Event listeners
            this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.closeLightbox());
            this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
            this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
            this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

            // Teclado
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;

                switch(e.key) {
                    case 'Escape': this.closeLightbox(); break;
                    case 'ArrowLeft': this.prevImage(); break;
                    case 'ArrowRight': this.nextImage(); break;
                }
            });
        },

        openLightbox() {
            if (!this.lightbox || !this.images.length) return;

            const img = this.lightbox.querySelector('.lightbox-image');
            const counter = this.lightbox.querySelector('.lightbox-counter');

            img.src = this.images[this.currentIndex].src;
            img.alt = this.images[this.currentIndex].alt;
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        closeLightbox() {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        },

        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.updateLightboxImage();
        },

        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.updateLightboxImage();
        },

        updateLightboxImage() {
            const img = this.lightbox.querySelector('.lightbox-image');
            const counter = this.lightbox.querySelector('.lightbox-counter');

            img.style.opacity = '0';
            setTimeout(() => {
                img.src = this.images[this.currentIndex].src;
                img.alt = this.images[this.currentIndex].alt;
                counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
                img.style.opacity = '1';
            }, 150);

            // Actualizar miniaturas también
            this.thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === this.currentIndex);
            });
        }
    };

    // ============================================
    // TABS
    // ============================================
    const Tabs = {
        init() {
            const tabContainers = document.querySelectorAll('.tabs, [data-tabs]');

            tabContainers.forEach(container => {
                const tabs = container.querySelectorAll('.tab, [data-tab]');
                const panels = container.querySelectorAll('.tab-panel, [data-tab-panel]');

                tabs.forEach((tab, index) => {
                    tab.addEventListener('click', () => {
                        // Desactivar todos
                        tabs.forEach(t => t.classList.remove('active'));
                        panels.forEach(p => p.classList.remove('active'));

                        // Activar seleccionado
                        tab.classList.add('active');
                        if (panels[index]) {
                            panels[index].classList.add('active');
                        }
                    });
                });
            });
        }
    };

    // ============================================
    // CARDS INTERACTIVAS
    // ============================================
    const Cards = {
        init() {
            // Hacer cards completamente clickeables
            const cards = document.querySelectorAll('.vendor-card, .category-card');

            cards.forEach(card => {
                const link = card.querySelector('a');
                if (!link) return;

                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    // No navegar si se hizo clic en un botón o enlace específico
                    if (e.target.closest('button, .btn, .card-actions')) return;

                    // Si hay un enlace principal, navegar
                    if (link.href) {
                        window.location.href = link.href;
                    }
                });
            });

            // Botón de favoritos
            const favButtons = document.querySelectorAll('.btn-favorite, [data-favorite]');
            favButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    btn.classList.toggle('active');

                    const icon = btn.querySelector('svg, i');
                    if (icon) {
                        icon.style.transform = 'scale(1.3)';
                        setTimeout(() => {
                            icon.style.transform = '';
                        }, 200);
                    }
                });
            });
        }
    };

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    const ContactForm = {
        init() {
            const forms = document.querySelectorAll('.contact-form, [data-contact-form]');

            forms.forEach(form => {
                form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            });
        },

        handleSubmit(e, form) {
            e.preventDefault();

            // Validación básica
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                this.showMessage(form, 'Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && !this.isValidEmail(emailField.value)) {
                emailField.classList.add('error');
                this.showMessage(form, 'Por favor ingresa un email válido', 'error');
                return;
            }

            // Simular envío (aquí iría AJAX real)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                form.reset();
                this.showMessage(form, '¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            }, 1500);
        },

        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        showMessage(form, message, type) {
            // Remover mensaje anterior
            const oldMsg = form.querySelector('.form-message');
            if (oldMsg) oldMsg.remove();

            // Crear nuevo mensaje
            const msg = document.createElement('div');
            msg.className = `form-message form-message--${type}`;
            msg.textContent = message;

            form.appendChild(msg);

            // Auto-remover después de 5 segundos
            setTimeout(() => {
                msg.remove();
            }, 5000);
        }
    };

    // ============================================
    // RATING ESTRELLAS
    // ============================================
    const StarRating = {
        init() {
            const ratingInputs = document.querySelectorAll('.star-rating-input, [data-star-rating]');

            ratingInputs.forEach(container => {
                const stars = container.querySelectorAll('.star, [data-star]');
                const input = container.querySelector('input[type="hidden"]');

                stars.forEach((star, index) => {
                    star.addEventListener('mouseenter', () => this.highlight(stars, index));
                    star.addEventListener('mouseleave', () => this.resetHighlight(stars, input?.value));
                    star.addEventListener('click', () => this.select(stars, index, input));
                });
            });
        },

        highlight(stars, index) {
            stars.forEach((star, i) => {
                star.classList.toggle('highlighted', i <= index);
            });
        },

        resetHighlight(stars, value) {
            stars.forEach((star, i) => {
                star.classList.remove('highlighted');
                star.classList.toggle('selected', value && i < parseInt(value));
            });
        },

        select(stars, index, input) {
            const value = index + 1;
            if (input) input.value = value;

            stars.forEach((star, i) => {
                star.classList.toggle('selected', i <= index);
            });
        }
    };

    // ============================================
    // LAZY LOADING DE IMÁGENES
    // ============================================
    const LazyLoad = {
        init() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                                img.removeAttribute('data-srcset');
                            }
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });

                document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback para navegadores sin IntersectionObserver
                document.querySelectorAll('img[data-src]').forEach(img => {
                    img.src = img.dataset.src;
                });
            }
        }
    };

    // ============================================
    // ANIMACIONES AL SCROLL
    // ============================================
    const ScrollAnimations = {
        init() {
            if ('IntersectionObserver' in window) {
                const animationObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                document.querySelectorAll('.animate-on-scroll, [data-animate]').forEach(el => {
                    animationObserver.observe(el);
                });
            }
        }
    };

    // ============================================
    // CONTADOR ANIMADO
    // ============================================
    const AnimatedCounters = {
        init() {
            const counters = document.querySelectorAll('.counter, [data-counter]');

            if ('IntersectionObserver' in window) {
                const counterObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                            this.animateCounter(entry.target);
                            entry.target.classList.add('counted');
                        }
                    });
                }, { threshold: 0.5 });

                counters.forEach(counter => counterObserver.observe(counter));
            }
        },

        animateCounter(element) {
            const target = parseInt(element.dataset.target || element.textContent);
            const duration = parseInt(element.dataset.duration) || 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = Utils.formatNumber(target);
                    clearInterval(timer);
                } else {
                    element.textContent = Utils.formatNumber(Math.floor(current));
                }
            }, 16);
        }
    };

    // ============================================
    // COMPARTIR EN REDES SOCIALES
    // ============================================
    const SocialShare = {
        init() {
            const shareButtons = document.querySelectorAll('[data-share]');

            shareButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const network = btn.dataset.share;
                    const url = btn.dataset.url || window.location.href;
                    const title = btn.dataset.title || document.title;

                    this.share(network, url, title);
                });
            });
        },

        share(network, url, title) {
            const encodedUrl = encodeURIComponent(url);
            const encodedTitle = encodeURIComponent(title);

            const shareUrls = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
                pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`
            };

            if (shareUrls[network]) {
                window.open(shareUrls[network], '_blank', 'width=600,height=400');
            }
        }
    };

    // ============================================
    // SCROLL TO TOP
    // ============================================
    const ScrollToTop = {
        button: null,

        init() {
            // Crear botón si no existe
            if (!document.querySelector('.scroll-to-top')) {
                this.button = document.createElement('button');
                this.button.className = 'scroll-to-top';
                this.button.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 15l-6-6-6 6"/>
                    </svg>
                `;
                this.button.setAttribute('aria-label', 'Volver arriba');
                document.body.appendChild(this.button);
            } else {
                this.button = document.querySelector('.scroll-to-top');
            }

            // Mostrar/ocultar según scroll
            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.pageYOffset > 500) {
                    this.button.classList.add('visible');
                } else {
                    this.button.classList.remove('visible');
                }
            }, 100));

            // Click para subir
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ============================================
    // VISTA DE LISTA/GRID
    // ============================================
    const ViewToggle = {
        init() {
            const toggles = document.querySelectorAll('.view-toggle, [data-view-toggle]');

            toggles.forEach(toggle => {
                const buttons = toggle.querySelectorAll('button, .view-btn');
                const container = document.querySelector(toggle.dataset.target || '.vendors-grid, .results-grid');

                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const view = btn.dataset.view;

                        // Actualizar botones
                        buttons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Actualizar contenedor
                        if (container) {
                            container.classList.remove('view-grid', 'view-list');
                            container.classList.add(`view-${view}`);
                        }

                        // Guardar preferencia
                        localStorage.setItem('preferredView', view);
                    });
                });

                // Restaurar preferencia
                const savedView = localStorage.getItem('preferredView');
                if (savedView) {
                    const btn = toggle.querySelector(`[data-view="${savedView}"]`);
                    if (btn) btn.click();
                }
            });
        }
    };

    // ============================================
    // ORDENAMIENTO
    // ============================================
    const Sorting = {
        init() {
            const sortSelects = document.querySelectorAll('.sort-select, [data-sort]');

            sortSelects.forEach(select => {
                select.addEventListener('change', (e) => {
                    const sortBy = e.target.value;
                    console.log('Ordenar por:', sortBy);

                    // Disparar evento personalizado
                    document.dispatchEvent(new CustomEvent('sortChanged', {
                        detail: { sortBy }
                    }));

                    // Aquí se implementaría la lógica de ordenamiento
                    // Puede ser ordenamiento en cliente o solicitud AJAX
                });
            });
        }
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    function init() {
        // Componentes de navegación
        MobileMenu.init();
        DropdownNav.init();
        StickyHeader.init();

        // Funcionalidades principales
        Search.init();
        Filters.init();
        Gallery.init();
        Tabs.init();
        Cards.init();

        // Formularios
        ContactForm.init();
        StarRating.init();

        // Optimización y UX
        LazyLoad.init();
        ScrollAnimations.init();
        AnimatedCounters.init();
        ScrollToTop.init();

        // Interacciones adicionales
        SocialShare.init();
        ViewToggle.init();
        Sorting.init();

        console.log('Todo Para Fiestas - Inicializado correctamente');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer módulos para uso externo si es necesario
    window.TodoParaFiestas = {
        Utils,
        MobileMenu,
        Filters,
        Gallery,
        Search
    };

})();
