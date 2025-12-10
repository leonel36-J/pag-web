const TELEFONO_VENDEDOR = '59173054551'; 

// Función principal que carga los datos
function cargarDatosYConfigurar() {
    console.log('Fut-Tennis página de compra cargada correctamente');
    
    //Obtener datos
    const nombreProducto = localStorage.getItem('productoNombre');
    const precio = localStorage.getItem('productoPrecio');
    const descripcion = localStorage.getItem('productoDescripcion');
    const imagen = localStorage.getItem('productoImagen');

    if (nombreProducto && precio) {
        document.getElementById('productoNombre').textContent = nombreProducto;
        document.getElementById('productoPrecio').textContent = precio;
        
        // Mostrar descripción e imagen 
        const descElement = document.getElementById('productoDescripcion');
        if(descElement && descripcion) {
            descElement.textContent = descripcion;
        }
        
        const imgElement = document.getElementById('productoImagen');
        if(imgElement && imagen) {
            imgElement.src = imagen;
        }
        
        // Configurar el enlace de WhatsApp
        configurarWhatsappLink(nombreProducto, precio);
    }
}

// enlace de WhatsApp
function configurarWhatsappLink(nombre, precio) {
    // Crear mensaje
    let mensaje = `¡Hola, Estoy interesado en comprar la promocion: ${nombre}.`;
    mensaje += `\nEl precio es de ${precio}.`;
    mensaje += ` ¿Podrían confirmarme la disponibilidad y la forma de pago?`;

    // Codificar mensaje y crear URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const whatsappURL = `https://wa.me/${TELEFONO_VENDEDOR}?text=${mensajeCodificado}`;

    const whatsappLinkElement = document.getElementById('whatsappLink');
    if (whatsappLinkElement) {
        whatsappLinkElement.href = whatsappURL;
    }
}

// Función para volver a la tienda
function volver() {
    // Limpiar
    localStorage.removeItem('productoNombre');
    localStorage.removeItem('productoPrecio');
    localStorage.removeItem('productoDescripcion');
    localStorage.removeItem('productoImagen');
    
    // Redirigir
    window.location.href = 'index.html';
}
document.addEventListener('DOMContentLoaded', cargarDatosYConfigurar);
