//  VER DETALLES DEL PROD
function verDetalle(id, nombre, marca, precio) {
    // Primero mostrar el detalle
    const detalleElement = document.getElementById('detalle');
    document.getElementById('detalle-titulo').textContent = nombre;
    document.getElementById('detallePrecio').textContent = precio;
    
    // Agregar descripción personalizada según la marca
    let descripcion = `Botines de fútbol ${marca} de alta calidad. Diseñados para máximo rendimiento y comodidad en la cancha. Tecnología de punta para control del balón y velocidad.`;
    document.getElementById('detalleDescripcion').textContent = descripcion;
    
    detalleElement.classList.add('visible');
    
    // Esperar un momento para que el elemento se muestre antes de hacer scroll
    setTimeout(() => {
        detalleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function cerrarDetalle() {
    document.getElementById('detalle').classList.remove('visible');
    // Volver a la sección de productos
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}


// confirmar compra
function confirmarCompra() {
    const nombreProducto = document.getElementById('detalle-titulo').textContent;
    const precio = document.getElementById('detallePrecio').textContent;
    alert(`¡Compra realizada exitosamente!\n\nProducto: ${nombreProducto}\nPrecio: ${precio}\n\n¡Gracias por tu compra! 🎉`);
    cerrarDetalle(); 
}

function comprar() {
    // Definimos el nombre del archivo HTML que contendrá el mensaje de "Compra exitosa"
    const paginaDeConfirmacion = 'compra_exitosa.html'; 
    
    // Abre la nueva pestaña/ventana
    window.open(paginaDeConfirmacion, '_blank');

    // Puedes añadir una alerta opcionalmente:
    alert("Procesando compra de K.mbappe x New Nike Mercurial. ¡Serás redirigido a la confirmación!");
}
// filtrar por marca
function filtrar(marca) {
    console.log('Filtrando por marca:', marca);
    
    // Ocultar todas las secciones de productos
    document.getElementById('gridadidas').style.display = 'none';
    document.getElementById('gridnike').style.display = 'none';
    document.getElementById('gridpuma').style.display = 'none';
    
    // Mostrar solo la marca seleccionada
    if (marca === 'Adidas') {
        document.getElementById('gridadidas').style.display = 'grid';
    } else if (marca === 'NIKE') {
        document.getElementById('gridnike').style.display = 'grid';
    } else if (marca === 'Puma') {
        document.getElementById('gridpuma').style.display = 'grid';
    }
    
    // Desplazarse a productos
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// filtrar por tipo de fútbol
function filtrarTipo(tipo) {
    // Actualizar botones activos
    const botones = document.querySelectorAll('.filtro-tipo');
    botones.forEach(btn => btn.classList.remove('activo'));
    event.target.classList.add('activo');
    
    // Obtener todos los productos
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        if (tipo === 'todos') {
            producto.style.display = 'flex';
        } else {
            const tipoProducto = producto.getAttribute('data-type');
            if (tipoProducto === tipo) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        }
    });
}

