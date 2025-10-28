// Sistema de Carrito usando localStorage

// Clase para manejar el carrito
class CarritoManager {
    constructor() {
        this.items = this.obtenerCarrito();
        this.renderizarContador();
    }

    obtenerCarrito() {
        const carrito = localStorage.getItem('carrito');
        return carrito ? JSON.parse(carrito) : [];
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
        this.renderizarContador();
    }

    agregarItem(producto) {
        const itemExistente = this.items.find(item => item.id === producto.id);
        
        if (itemExistente) {
            itemExistente.cantidad += producto.cantidad || 1;
        } else {
            this.items.push({
                ...producto,
                cantidad: producto.cantidad || 1
            });
        }
        
        this.guardarCarrito();
        this.mostrarToast('Producto agregado al carrito');
    }

    eliminarItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarCarrito();
        this.mostrarToast('Producto eliminado del carrito');
    }

    actualizarCantidad(id, nuevaCantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad = nuevaCantidad;
            this.guardarCarrito();
        }
    }

    limpiarCarrito() {
        this.items = [];
        this.guardarCarrito();
        this.mostrarToast('Carrito limpiado');
    }

    obtenerTotal() {
        return this.items.reduce((total, item) => {
            return total + (parseFloat(item.precio) * item.cantidad);
        }, 0);
    }

    renderizarContador() {
        const contador = document.getElementById('carrito-contador');
        if (contador) {
            const total = this.items.reduce((sum, item) => sum + item.cantidad, 0);
            contador.textContent = total > 0 ? total : '';
        }
    }

    mostrarToast(mensaje) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = mensaje;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    obtenerItems() {
        return this.items;
    }
}

// Instanciar carrito global
const carrito = new CarritoManager();

// Función auxiliar para agregar al carrito desde cualquier botón
function agregarAlCarrito(nombre, precio, icono = '🎂', tipo = 'producto') {
    const producto = {
        id: Date.now().toString(),
        nombre,
        precio,
        icono,
        tipo
    };
    
    carrito.agregarItem(producto);
}

// Función para renderizar el carrito en la página de carrito
function renderizarCarrito() {
    const carritoContainer = document.getElementById('carrito-lista');
    if (!carritoContainer) return;

    const items = carrito.obtenerItems();

    if (items.length === 0) {
        carritoContainer.innerHTML = `
            <div class="carrito-vacio">
                <div class="emoji">🛒</div>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos desde nuestra cartilla o promociones</p>
            </div>
        `;
        const resumenElement = document.getElementById('carrito-resumen');
        if (resumenElement) resumenElement.style.display = 'none';
        return;
    }

    carritoContainer.innerHTML = items.map(item => {
        const tieneDetalles = item.tipo === 'pedido-agendado';
        
        return `
        <div class="carrito-item">
            <div class="carrito-item-icon">${item.icono}</div>
            <div class="carrito-item-info" style="flex: 1;">
                <h4>${item.nombre}</h4>
                <p class="carrito-item-precio">$${item.precio.toLocaleString()}</p>
                ${tieneDetalles ? `
                    <div style="margin-top: 10px; padding: 10px; background: var(--gris-claro); border-radius: 8px; font-size: 0.85rem;">
                        <p style="margin: 3px 0;"><strong>📅 Fecha:</strong> ${item.fecha}</p>
                        <p style="margin: 3px 0;"><strong>🕐 Hora:</strong> ${item.hora}</p>
                        <p style="margin: 3px 0;"><strong>📍 Dirección:</strong> ${item.direccion}</p>
                        <p style="margin: 3px 0;"><strong>📦 Cantidad:</strong> ${item.cantidad}</p>
                        ${item.observaciones ? `<p style="margin: 3px 0;"><strong>📝 Observaciones:</strong> ${item.observaciones}</p>` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="carrito-item-cantidad">
                <button class="btn-cantidad" onclick="actualizarCantidad('${item.id}', ${item.cantidad - 1})">-</button>
                <span>${item.cantidad}</span>
                <button class="btn-cantidad" onclick="actualizarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
            </div>
            <div class="carrito-item-total">
                <p>$${item.precio.toLocaleString()}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.id}')">🗑️</button>
        </div>
    `;
    }).join('');

    const total = carrito.obtenerTotal();
    const totalElement = document.getElementById('carrito-total');
    if (totalElement) {
        totalElement.textContent = `$${total.toLocaleString()}`;
    }

    // Mostrar resumen
    const resumenElement = document.getElementById('carrito-resumen');
    if (resumenElement) resumenElement.style.display = 'block';

    // Botón de limpiar
    const limpiarBtn = document.getElementById('btn-limpiar-carrito');
    if (limpiarBtn) {
        limpiarBtn.style.display = 'block';
    }
}

// Funciones globales para los botones
function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
    } else {
        carrito.actualizarCantidad(id, nuevaCantidad);
        renderizarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito.eliminarItem(id);
    renderizarCarrito();
}

function limpiarCarrito() {
    if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
        carrito.limpiarCarrito();
        renderizarCarrito();
    }
}

// Exportar para uso en otras páginas
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { carrito, agregarAlCarrito, renderizarCarrito };
}

