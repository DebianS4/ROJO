// Carrito de compras
let carrito = [];

function agregarAlCarrito(nombre, imagen, precio) {
    const producto = {
        id: Date.now(),
        nombre: nombre,
        imagen: imagen,
        precio: precio
    };
    
    carrito.push(producto);
    actualizarCarrito();
    
    // Efecto visual
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'pulse 0.5s';
    }, 10);
}

function actualizarCarrito() {
    // Actualizar contador
    document.getElementById('cartCount').textContent = carrito.length;
    
    // Actualizar vista del carrito
    actualizarVistaCarrito();
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarVistaCarrito() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (carrito.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
    } else {
        cartItemsDiv.innerHTML = carrito.map((item, index) => `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">$${item.precio.toLocaleString('es-MX')}</div>
                </div>
                <button class="remove-btn" onclick="eliminarDelCarrito(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Actualizar total
    const total = carrito.reduce((suma, item) => suma + item.precio, 0);
    document.getElementById('totalPrice').textContent = `$${total.toLocaleString('es-MX')}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function abrirCarrito() {
    document.getElementById('cartModal').style.display = 'block';
}

function cerrarCarrito() {
    document.getElementById('cartModal').style.display = 'none';
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((suma, item) => suma + item.precio, 0);
    const mensaje = `Hola, me gustaría comprar los siguientes productos:\n\n${carrito.map(item => `- ${item.nombre}: $${item.precio.toLocaleString('es-MX')}`).join('\n')}\n\nTotal: $${total.toLocaleString('es-MX')}`;
    
    const urlWhatsApp = `https://wa.me/528116710029?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// Event Listeners
document.querySelector('.cart-icon').addEventListener('click', abrirCarrito);
document.querySelector('.close').addEventListener('click', cerrarCarrito);

window.addEventListener('click', function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Cargar carrito del localStorage
window.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});

// Animación de scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animación de entrada para productos
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

document.querySelectorAll('.tarjeta-producto').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Validación de formulario de contacto
document.querySelector('.contacto-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    this.reset();
});

// Animación pulse para el carrito
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);
