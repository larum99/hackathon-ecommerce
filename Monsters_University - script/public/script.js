// Arreglo para almacenar los libros en el carrito
let carrito = [];

// Función para obtener libros de la API
async function obtenerLibros() {
    try {
        const response = await fetch('/api/libros');
        if (!response.ok) {
            throw new Error('Error en la red'); // Manejo de error si no es OK
        }
        const libros = await response.json();
        console.log(libros); // Verificar si llegan los libros
        mostrarLibros(libros);
    } catch (error) {
        console.error('Error al obtener libros:', error);
    }
}

// Función para mostrar los libros en la página
function mostrarLibros(libros) {
    const container = document.getElementById('libros-container');
    container.innerHTML = ''; // Limpiar el contenedor

    libros.forEach(libro => {
        const libroDiv = document.createElement('div');
        libroDiv.classList.add('box');
        libroDiv.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Precio:</strong> $${libro.precio}</p>
            <p><strong>Stock disponible:</strong> ${libro.stock}</p>
            <button onclick="agregarAlCarrito(${libro.id}, '${libro.titulo}', ${libro.precio}, ${libro.stock})">Agregar al Carrito</button>
        `;
        container.appendChild(libroDiv);
    });
}

// Función para agregar libros al carrito
function agregarAlCarrito(id, titulo, precio, stockDisponible) {
    const libroEnCarrito = carrito.find(item => item.id === id);

    // Verificar si el stock es suficiente
    if (libroEnCarrito) {
        if (libroEnCarrito.cantidad < stockDisponible) {
            libroEnCarrito.cantidad++;
        } else {
            alert(`No puedes agregar más de ${stockDisponible} copias de ${titulo}. Stock disponible: ${stockDisponible}`);
            return; // Salir de la función si no se puede agregar
        }
    } else {
        carrito.push({ id, titulo, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para eliminar un libro del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    const totalElement = document.getElementById('total');
    carritoList.innerHTML = ''; // Limpiar el carrito

    let total = 0;

    carrito.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.innerText = `${item.titulo} - $${item.precio} x ${item.cantidad}`;
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.onclick = () => eliminarDelCarrito(item.id);
        itemLi.appendChild(eliminarBtn);
        carritoList.appendChild(itemLi);
        total += item.precio * item.cantidad;
    });

    totalElement.innerText = `Total: $${total}`;
}

// Función para pagar
function pagar() {
    if (carrito.length === 0) {
        alert('No tienes productos en el carrito para pagar.');
        return;
    }

    // Aquí podrías realizar una llamada a la API para procesar el pago

    alert('Pago exitoso!'); // Mensaje de pago exitoso
    carrito = []; // Limpiar el carrito después del pago
    actualizarCarrito(); // Actualizar visualización del carrito
}

// Llamar a la función para obtener libros al cargar la página
obtenerLibros();
