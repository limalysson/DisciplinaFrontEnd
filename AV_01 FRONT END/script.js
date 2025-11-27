// JavaScript básico para a landing page da cafeteria
console.log("script.js carregado e executado!");

// Variáveis globais
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");

// Função para rolar suavemente até o menu
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

// Função para alternar o menu expansível
function toggleMenu(categoryId) {
    const menuItems = document.getElementById(categoryId + "-menu");
    const icon = document.getElementById(categoryId + "-icon");
    
    if (menuItems.classList.contains("active")) {
        menuItems.classList.remove("active");
        icon.textContent = "+";
        icon.style.transform = "rotate(0deg)";
    } else {
        menuItems.classList.add("active");
        icon.textContent = "−";
        icon.style.transform = "rotate(180deg)";
    }
}

// Função para mostrar depoimento específico
function showTestimonial(index) {
    // Esconder todos os depoimentos
    testimonials.forEach(testimonial => {
        testimonial.classList.remove("active");
    });
    
    // Remover classe active de todos os dots
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
    
    // Mostrar o depoimento selecionado
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    
    currentTestimonial = index;
}

// Função para rotação automática dos depoimentos
function autoRotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Função para validar e enviar formulário
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Validação básica
    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    // Validação de email básica
    const emailRegex = /^[^\]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }
    
    // Simular envio do formulário
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    
    // Limpar formulário
    document.getElementById("contactForm").reset();
}

// Função para adicionar efeitos de hover nos cards
function addHoverEffects() {
    const cards = document.querySelectorAll(".menu-category, .about-img");
    
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });
}

// Função para animação de entrada dos elementos
function animateOnScroll() {
    const elements = document.querySelectorAll(".about, .menu, .testimonials, .contact");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });
}

// Função para destacar link ativo na navegação
function highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a");
    
    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}

// Função para contador de visitantes (simulado)
function updateVisitorCounter() {
    const counter = Math.floor(Math.random() * 1000) + 500;
    console.log(`Visitantes hoje: ${counter}`);
}

// Função para horário de funcionamento dinâmico
function updateBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const isOpen = hour >= 7 && hour < 22;
    
    const statusElement = document.querySelector(".business-status");
    if (statusElement) {
        statusElement.textContent = isOpen ? "Aberto agora!" : "Fechado";
        statusElement.style.color = isOpen ? "#10b981" : "#ef4444";
    }
}

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
    // Iniciar rotação automática dos depoimentos
    setInterval(autoRotateTestimonials, 4000);
    
    // Adicionar efeitos de hover
    addHoverEffects();
    
    // Inicializar animações de scroll
    animateOnScroll();
    
    // Destacar seção ativa na navegação
    highlightActiveSection();
    
    // Atualizar contador de visitantes
    updateVisitorCounter();
    
    // Atualizar status de funcionamento
    updateBusinessHours();
    
    // Adicionar listener para redimensionamento da janela
    window.addEventListener("resize", function() {
        // Reajustar elementos se necessário
        console.log("Janela redimensionada");
    });
    
    // Adicionar efeito de digitação no título (opcional)
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = "";
        
        let i = 0;
        const typeWriter = setInterval(() => {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            if (i >= originalText.length) {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    console.log("Landing page da Cafeteria Artesanal carregada com sucesso!");
});

// Função para smooth scroll nos links de navegação
document.querySelectorAll(".nav a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Adicionar classe active ao CSS para links de navegação
const style = document.createElement("style");
style.textContent = `
    .nav a.active {
        color: #fbbf24 !important;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

(function scrollToShowFooter() {
    const SCROLL_OFFSET_MS = 50; // pequeno atraso para permitir layouts/calculos
    const contactAnchors = document.querySelectorAll('a[href="#contact"]');

    function scrollToFooter(instant = false) {
        const top = document.documentElement.scrollHeight - window.innerHeight;
        if (instant) {
            window.scrollTo(0, top);
        } else {
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    // intercepta cliques nos links que apontam para #contact
    contactAnchors.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            // permite que qualquer layout (variáveis CSS, header) seja atualizado
            setTimeout(() => scrollToFooter(false), SCROLL_OFFSET_MS);
            // atualiza a hash no URL sem pular instantaneamente
            history.pushState(null, '', '#contact');
        });
    });

    // se a página for carregada com #contact ou houver mudança de hash
    function maybeScrollOnHash() {
        if (location.hash === '#contact') {
            setTimeout(() => scrollToFooter(true), SCROLL_OFFSET_MS);
        }
    }

    window.addEventListener('load', maybeScrollOnHash);
    window.addEventListener('hashchange', maybeScrollOnHash);
})();
