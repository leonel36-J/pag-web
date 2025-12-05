//  VER DETALLES DEL PROD
function verDetalle(id, nombre, marca, precio) {
    document.getElementById('detalle-titulo').textContent = nombre;
    document.getElementById('detallePrecio').textContent = precio;
    document.getElementById('detalle').classList.add('visible');
    
    // Desplazar
    document.getElementById('detalle').scrollIntoView({ behavior: 'smooth' });
}
function cerrarDetalle() {
    document.getElementById('detalle').classList.remove('visible');
}
// confirmar compra
function confirmarCompra() {
    alert('¡ Su Compra fue realizada exitosamente :D!');
    cerrarDetalle();
}


// filtrar por marca
function filtrar(marca) {
    console.log('Filtrando por marca:', marca);
    
    // Desplazarse
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}
