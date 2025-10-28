// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dulce Gustito - Página cargada');
    
    // Smooth scroll para navegación
    initSmoothScroll();
    
    // Funcionalidad del formulario
    initFormulario();
    
    // Funcionalidad de botones de promociones
    initPromociones();
    
    // Animación de entrada
    initAnimaciones();
});

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Funcionalidad del formulario
function initFormulario() {
    const formulario = document.querySelector('.formulario-pedido');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const direccion = document.getElementById('direccion').value;
            const cantidad = document.getElementById('cantidad').value;
            
            if (fecha && hora && direccion && cantidad) {
                mostrarConfirmacion({
                    fecha,
                    hora,
                    direccion,
                    cantidad
                });
                
                // Resetear formulario
                formulario.reset();
            } else {
                mostrarMensaje('Por favor, completa todos los campos', 'error');
            }
        });
    }
}

// Funcionalidad de promociones
function initPromociones() {
    const botonesPromo = document.querySelectorAll('.btn-agregar');
    
    botonesPromo.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const promoCard = this.closest('.promo-card');
            const titulo = promoCard.querySelector('h3').textContent;
            
            mostrarMensaje(`${titulo} agregado al carrito`, 'success');
            actualizarCarrito();
        });
    });
}

// Función para mostrar confirmación
function mostrarConfirmacion(datos) {
    const mensaje = `✓ Pedido registrado con éxito!\n\nFecha: ${datos.fecha}\nHora: ${datos.hora}\nDirección: ${datos.direccion}\nCantidad: ${datos.cantidad}`;
    
    alert(mensaje);
    console.log('Pedido confirmado:', datos);
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo = 'info') {
    console.log(`[${tipo.toUpperCase()}] ${texto}`);
    
    // Aquí podrías agregar un toast o modal
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = texto;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Actualizar carrito
function actualizarCarrito() {
    console.log('Carrito actualizado');
    // Aquí puedes agregar lógica para actualizar el contador del carrito
}

// Animaciones de entrada
function initAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a los elementos
    const elementos = document.querySelectorAll('.item-cartilla, .promo-card, .popular-card');
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elemento);
    });
}

// Validar fecha (no permitir fechas pasadas)
document.addEventListener('DOMContentLoaded', function() {
    const inputFecha = document.getElementById('fecha');
    
    if (inputFecha) {
        const hoy = new Date().toISOString().split('T')[0];
        inputFecha.min = hoy;
        
        inputFecha.addEventListener('change', function() {
            const fechaSeleccionada = new Date(this.value);
            const hoy = new Date();
            
            if (fechaSeleccionada < hoy) {
                mostrarMensaje('No puedes seleccionar una fecha pasada', 'error');
                this.value = '';
            }
        });
    }
});

// Efecto hover suave para las tarjetas
document.querySelectorAll('.item-cartilla, .popular-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});
