// Función para desplazarse suavemente a las secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Manejar el envío del formulario de contacto
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validar que los campos no estén vacíos
    let isValid = true;
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            break;
        }
    }
    
    if (isValid) {
        // Mostrar un mensaje de éxito
        alert('¡Gracias por tu mensaje! Pronto nos pondremos en contacto.');
        
        // Limpiar el formulario
        form.reset();
    } else {
        alert('Por favor, rellena todos los campos.');
    }
}

// Toggle del menú hamburguesa
function toggleHamburger() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Cerrar menú al hacer clic en un enlace
function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// Inicializar eventos cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el evento del hamburguesa
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleHamburger);
    }
    
    // Configurar enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMenu();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Efecto de scroll revelador para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar observador a las tarjetas de características y galería
    const elements = document.querySelectorAll(
        '.feature-card, .gallery-item, .service-card, .testimonio-card'
    );
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animar números de estadísticas
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observerStats = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    animateStats();
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        observerStats.observe(statsSection);
    }
});

// Animar números de estadísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = Math.ceil(numericValue / 50);
            
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(interval);
                } else {
                    stat.textContent = currentValue + (finalValue.includes('+') ? '+' : '');
                }
            }, 30);
        }
    });
}

// Smooth scroll nativo si no está soportado
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'auto' });
            }
        });
    });
}

// Detectar scroll para agregar efectos
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Validación de formulario en tiempo real
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderBottom = '2px solid rgba(245, 87, 108, 0.8)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderBottom = 'none';
        });
    });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navbar && navLinks && hamburger) {
        if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
            closeMenu();
        }
    }
});

console.log('Script de Skibidi cargado correctamente! 🎵');
