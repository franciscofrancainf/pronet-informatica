// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Header scroll effect com sombra e transição suave
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'none';
    }
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação básica
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (!isValidEmail(email.value)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        // Por exemplo, usando fetch para enviar para um backend
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Função auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]');
        
        if (email.value.trim() === '') {
            alert('Por favor, insira seu e-mail.');
            return;
        }
        
        if (!isValidEmail(email.value)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        alert('Obrigado por se inscrever! Você receberá nossas novidades.');
        newsletterForm.reset();
    });
}

// Smooth scroll aprimorado para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Ignorar links vazios ou apenas "#"
        if (targetId === '#' || targetId === '') return;
        
        const target = document.querySelector(targetId);
        
        if (target) {
            // Fechar menu mobile se estiver aberto
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
            
            // Calcular posição considerando o header fixo
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada dos elementos quando scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Selecionar todos os elementos que devem ter animação
const animatedElements = document.querySelectorAll(
    '.product-card, .service-card, .plan-card, .accessory-card, .course-card, .section-header, .info-item'
);

// Configurar estado inicial
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
});

// Observer para animação
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Pequeno delay para efeito em cascata
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            // Parar de observar após animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer a todos os elementos
animatedElements.forEach(el => {
    observer.observe(el);
});

// Botão de voltar ao topo (opcional - você pode adicionar um botão flutuante)
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color, #2563eb);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
        z-index: 999;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--secondary-color, #1e40af)';
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--primary-color, #2563eb)';
        button.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

// Descomente a linha abaixo se quiser adicionar o botão de voltar ao topo
// createBackToTopButton();

// Prevenir comportamento padrão de links vazios
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Detectar seção ativa no menu (opcional - para destacar o link atual)
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset para header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remover active de todos os links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Adicionar active ao link correspondente
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        color: var(--primary-color, #2563eb) !important;
        font-weight: 600;
    }
    
    nav a.active::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: var(--primary-color, #2563eb);
        margin-top: 2px;
    }
`;
document.head.appendChild(style);

// Atualizar link ativo no scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Lazy loading para imagens (se você adicionar imagens no futuro)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Suporte para prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Desabilitar animações se o usuário preferir
    document.documentElement.style.scrollBehavior = 'auto';
    
    animatedElements.forEach(el => {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pro Net Informática - Site carregado com sucesso!');
    
    // Adicionar ano atual no copyright (opcional)
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
});