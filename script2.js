function comprar() {
    const boton = document.querySelector('.Comprar');
    
    // porcesando boton
    boton.disabled = true;
    boton.textContent = 'Procesando...';
    
    // Simula proceso de compra 
    setTimeout(() => {
        alert('¡Compra realizada exitosamente!\n\nGracias por comprar en Fut-Tennis');

        boton.disabled = false;
        boton.textContent = 'Comprar Ahora';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Fut-Tennis cargado correctamente');
    
});
