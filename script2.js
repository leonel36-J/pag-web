// Cargar datos del producto cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    console.log('Fut-Tennis página de compra cargada correctamente');
    
    //  datos del localStorage
    const nombreProducto = localStorage.getItem('productoNombre');
    const precio = localStorage.getItem('productoPrecio');
    const descripcion = localStorage.getItem('productoDescripcion');
    const imagen = localStorage.getItem('productoImagen');
    //mostrar
    if (nombreProducto && precio) {
    document.getElementById('productoNombre').textContent = nombreProducto;
    document.getElementById('productoPrecio').textContent = precio;
    if(descripcion) {
        document.getElementById('productoDescripcion').textContent = descripcion;
    }
   if(imagen) 
   {
        document.getElementById('productoImagen').src = imagen;
    }
    
    }});

// Función de compra
function comprar() {
    const boton = document.querySelector('.Comprar');
    const nombreProducto = document.getElementById('productoNombre').textContent;
    const precio = document.getElementById('productoPrecio').textContent;
    
    // Procesando botón
    boton.disabled = true;
    boton.textContent = 'Procesando...';
    
    // Simulacion
    setTimeout(() => {
        alert(`Su compra fue realizada exitosamente!\nProducto: ${nombreProducto}\nPrecio: ${precio}\n\nGracias por comprar en Fut-Tennis ☣`);
        // Limpiar localStorage
        localStorage.removeItem('productoNombre');
        localStorage.removeItem('productoPrecio');
        localStorage.removeItem('productoDescripcion');
        localStorage.removeItem('productoImagen');
        
        // Volver a la tienda
        window.location.href = 'index.html';
    }, 1000);
}

function volver() {
    // Limpiar
    localStorage.removeItem('productoNombre');
    localStorage.removeItem('productoPrecio');
    localStorage.removeItem('productoDescripcion');
    localStorage.removeItem('productoImagen');
    
    // Redirigir 
    window.location.href = 'index.html';}
 

document.addEventListener('DOMContentLoaded', () => {

    const nombre = localStorage.getItem('productoNombre');
    const precio = localStorage.getItem('productoPrecio');
    
    const telefonoVendedor = '59172079403'; 

    if (nombre && precio) {
        //  Crear mensaje 
        let mensaje = `¡Hola! Estoy interesado en comprar el producto: ${nombre}.`;
        mensaje += `\nEl precio es de ${precio}.`;
        mensaje += `¿Podrían confirmarme la disponibilidad y la forma de pago?`;

        // mensaje
        const mensajeCodificado = encodeURIComponent(mensaje);

        //enlace
        const whatsappURL = `https://wa.me/${telefonoVendedor}?text=${mensajeCodificado}`;

        // Asignar el enlace al elemento con el id 'whatsappLink'
        const whatsappLinkElement = document.getElementById('whatsappLink');
        if (whatsappLinkElement) {
            whatsappLinkElement.href = whatsappURL;
        }
    }
});
