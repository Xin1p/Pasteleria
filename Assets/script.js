// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    // Botón de explorar
    const btnExplorar = document.getElementById('btnExplorar');
    if (btnExplorar) {
        btnExplorar.addEventListener('click', function() {
            mostrarMensaje('¡Bienvenido a nuestra pastelería!', 'Explorando productos...');
            animarScroll('#productos');
        });
    }
    
    // Agregar efectos de hover a las tarjetas de productos
    const productoCards = document.querySelectorAll('.producto-card');
    productoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Smooth scroll para navegación
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    animarScroll(targetId);
                }
            }
        });
    });
});

// Función para animar el scroll
function animarScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para mostrar mensajes
function mostrarMensaje(titulo, mensaje) {
    console.log(`${titulo}: ${mensaje}`);
    // Aquí puedes agregar un toast o modal si lo deseas
}

// Función para agregar animación a la carga
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

