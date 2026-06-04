class CofreManager {
    constructor() {
        this.items = this.obtener();
        this.renderizarContador();
    }

    obtener() {
        const data = localStorage.getItem('carrito');
        return data ? JSON.parse(data) : [];
    }

    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
        this.renderizarContador();
    }

    agregarItem(item) {
        this.items.push({ ...item, cantidad: 1, precio: 0 });
        this.guardar();
        this.mostrarToast('Guardado en tu cofre ♥');
    }

    eliminarItem(id) {
        this.items = this.items.filter((i) => i.id !== id);
        this.guardar();
        this.mostrarToast('Eliminado del cofre');
    }

    limpiar() {
        this.items = [];
        this.guardar();
        this.mostrarToast('Cofre vaciado');
    }

    renderizarContador() {
        const el = document.getElementById('carrito-contador');
        if (el) el.textContent = this.items.length > 0 ? this.items.length : '';
    }

    mostrarToast(mensaje) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = mensaje;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2800);
    }

    obtenerItems() {
        return this.items;
    }
}

const carrito = new CofreManager();

function agregarAlCofre(nombre, nota, icono = '💕') {
    carrito.agregarItem({
        id: 'cofre_' + Date.now(),
        nombre,
        nota,
        icono,
        tipo: 'recuerdo'
    });
}

function agregarAlCarrito(nombre, precio, icono, tipo) {
    agregarAlCofre(nombre, tipo || 'Un momento especial', icono);
}

function renderizarCarrito() {
    const lista = document.getElementById('carrito-lista');
    if (!lista) return;

    const items = carrito.obtenerItems();

    if (items.length === 0) {
        lista.innerHTML = `
            <div class="cofre-vacio">
                <div class="emoji">📦</div>
                <h3>Tu cofre está vacío</h3>
                <p>Guarda recuerdos, sorpresas o cosas que amas de Dana desde las otras páginas.</p>
            </div>`;
        const resumen = document.getElementById('carrito-resumen');
        if (resumen) resumen.style.display = 'none';
        return;
    }

    lista.innerHTML = items
        .map(
            (item) => `
        <div class="cofre-item">
            <div class="cofre-item-icon">${item.icono || '💕'}</div>
            <div class="cofre-item-info">
                <h4>${item.nombre}</h4>
                <p class="cofre-item-nota">${item.nota || item.observaciones || 'Guardado con cariño'}</p>
            </div>
            <button type="button" class="btn-eliminar-cofre" onclick="eliminarDelCarrito('${item.id}')" aria-label="Eliminar">✕</button>
        </div>`
        )
        .join('');

    const resumen = document.getElementById('carrito-resumen');
    if (resumen) resumen.style.display = 'block';
}

function eliminarDelCarrito(id) {
    carrito.eliminarItem(id);
    renderizarCarrito();
}

function limpiarCarrito() {
    if (confirm('¿Vaciar todo el cofre?')) {
        carrito.limpiar();
        renderizarCarrito();
    }
}
