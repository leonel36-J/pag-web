const TELEFONO_VENDEDOR = "59173054551"; // Número sin +

document.addEventListener("DOMContentLoaded", function () {
    cargarDatosYConfigurar();
});

function cargarDatosYConfigurar() {

    // Obtener datos o usar valores por defecto
    const nombreProducto = localStorage.getItem("productoNombre") || 
        "Adidas X Speedportal Messi.I FG";

    const precio = localStorage.getItem("productoPrecio") || 
        "Bs350.00";

    const descripcion = localStorage.getItem("productoDescripcion");
    const imagen = localStorage.getItem("productoImagen");

    // Insertar datos en la página
    document.getElementById("productoNombre").textContent = nombreProducto;
    document.getElementById("productoPrecio").textContent = precio;

    if (descripcion) {
        document.getElementById("productoDescripcion").textContent = descripcion;
    }

    if (imagen) {
        document.getElementById("productoImagen").src = imagen;
    }

    // Siempre configurar WhatsApp
    configurarWhatsappLink(nombreProducto, precio);
}

function configurarWhatsappLink(nombre, precio) {

    let mensaje = `¡Hola! Estoy interesado en comprar la promoción: ${nombre}.`;
    mensaje += ` El precio es de ${precio}.`;
    mensaje += ` ¿Podrían confirmarme disponibilidad y forma de pago?`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const whatsappURL = `https://wa.me/${TELEFONO_VENDEDOR}?text=${mensajeCodificado}`;

    const boton = document.getElementById("whatsappLink");

    boton.addEventListener("click", function (e) {
        e.preventDefault();
        window.open(whatsappURL, "_blank");
    });
}

function volver() {
    localStorage.clear();
    window.location.href = "index.html";
}
