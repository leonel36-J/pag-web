// FUNCIÓN PARA VER EL DETALLE DEL PRODUCTO
// Se ejecuta cuando haces clic en un producto
function verDetalle(id, nombre, marca, precio, evento) {
    
    // Buscar producto clickeasdo para tenr su imagen
    var productoClickeado = evento.target.closest('.producto');
    var imgSrc = productoClickeado.querySelector('img').src;

    // Mostrar el nombre y precio en detalle
    document.getElementById('detalle-titulo').textContent = nombre;
    document.getElementById('detallePrecio').textContent = precio;
   
    // Variable para guardar la descripción
    let desc = '';
    // DESCRIPCIONES DE PRODUCTOS ADIDAS
    if(nombre == 'Adidas Predator League') desc = 'Versión de gama media del icónico Predator. Ofrecen buen control y agarre para tiros con efecto.';
    else if(nombre == 'Adidas Copa 11 Pure Elite FG') desc = 'Botas de alta gama con enfoque en la sensación del toque de balón y la comodidad, ideal para campos de césped natural (FG).';
    else if(nombre == 'Adidas Copa Pure Elite') desc = 'Diseño elegante y clásico que prioriza la comodidad y el toque gracias a su material premium.';
    else if(nombre == 'Adidas F50 FG Messi') desc = 'Edición especial inspirada en Messi, conocidas por ser extremadamente ligeras y enfocadas en la velocidad en césped natural (FG).';
    else if(nombre == 'adidas Predator League FT SG') desc = 'Versión Predator League con suela para terrenos blandos/césped mojado (SG), que ofrece máxima tracción.';
    else if(nombre == 'Adidas Predator X FG') desc = 'Modelo clásico de la línea Predator, conocido por su enfoque en la potencia y el control del balón en césped natural (FG).';
    else if(nombre == 'Adidas Crazyfast') desc = 'Botas diseñadas para la máxima velocidad y aceleración, con un ajuste ligero y minimalista.';
    else if(nombre == 'adidas Copa Pure.3 TF') desc = 'Versión para césped artificial o moqueta (TF), que ofrece amortiguación y buen agarre para un toque suave.';
   
    // DESCRIPCIONES DE PRODUCTOS NIKE
    else if(nombre == 'Nike Air Zoom Mercurial') desc = 'Incorpora la unidad Zoom Air para una sensación de respuesta rápida y propulsión, enfocada en la velocidad.';
    else if(nombre == 'Nike Mercurial Vapor 15') desc = 'Diseño minimalista y ligero, ideal para jugadores que buscan velocidad explosiva y un toque directo con el balón.';
    else if(nombre == 'Nike Mercurial Air Zoom AG') desc = 'Versión con tecnología Zoom Air y suela optimizada para césped artificial (AG), que reduce la presión en las articulaciones.';
    else if(nombre == 'Nike Mercurial Vapor Initial') desc = 'Bota de velocidad con un diseño ligero, enfocada en los arranques rápidos y la agilidad.';
    else if(nombre == 'Nike Phantom GX Elite') desc = 'Diseñadas para el control total y la precisión, con una zona de golpeo texturizada para un toque superior.';
    else if(nombre == 'Nike Zoom Mercurial Superfly 15 Elite') desc = 'Máxima gama de velocidad con cuello Dynamic Fit (calcetín) para un ajuste seguro y unidad Zoom Air.';
    else if(nombre == 'Nike Magista') desc = 'Centradas en la creatividad y el control en el campo, con un ajuste cómodo para el mediocampista.';
    else if(nombre == 'Nike Zoom Mercurial Vapor 15') desc = 'El modelo de velocidad de alta gama que combina un diseño ligero con tecnología de amortiguación Zoom Air para el rendimiento.';
   
    // DESCRIPCIONES DE PRODUCTOS PUMA
    else if(nombre == 'PUMA FUTURE 7 MATCH') desc = 'Bota versátil y adaptable que permite diferentes estilos de juego, con un buen ajuste y comodidad.';
    else if(nombre == 'Puma Future 8 Ultimate AG') desc = 'Máxima gama de la línea Future, conocida por su adaptabilidad al pie y su suela para césped artificial (AG).';
    else if(nombre == 'Puma Future 7 Match Plus FG') desc = 'Un buen equilibrio entre rendimiento y precio, ofreciendo comodidad y flexibilidad en césped natural (FG).';
    else if(nombre == 'Puma Future 7 Play') desc = 'Opción de entrada a la línea Future, enfocada en un ajuste sencillo y buen rendimiento en el campo.';
    else if(nombre == 'PUMA ULTRA 5 PLAY MG') desc = 'Diseñada para la velocidad con un peso muy ligero, y suela multi-terreno (MG) para diversas superficies.';
    else if(nombre == 'Puma King Ultimate IT') desc = 'Bota de gama alta con tecnología que busca un ajuste personalizado para el jugador más creativo.';
    else if(nombre == 'Puma Evopower') desc = 'Centradas en la potencia de golpeo y el remate, diseñadas para maximizar la fuerza del tiro.';
    else if(nombre == 'Puma Future 8 Play') desc = 'Bota que combina comodidad y versatilidad, ideal para jugadores que buscan un buen rendimiento en diferentes facetas del juego.';
   
    // la descripción en el detalle
    document.getElementById('detalleDescripcion').textContent = desc;
   
    // GUARDA info para la pag2
    // localStorage guarda datos
    localStorage.setItem('productoDescripcion', desc);
    localStorage.setItem('productoImagen', imgSrc);
   
    // lleva a detalle de producto
    document.getElementById('detalle').classList.add('visible');
    setTimeout(function() {
        document.getElementById('detalle').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

//CERRAR DETALLE
function cerrarDetalle() {
    document.getElementById('detalle').classList.remove('visible');
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

//CONFIRMAR LA COMPRA
function confirmarCompra() {
    // Obtener nombre y precio 
    var nombre = document.getElementById('detalle-titulo').textContent;
    var precio = document.getElementById('detallePrecio').textContent;
    
    // Guardarpara la pág2
    localStorage.setItem('productoNombre', nombre);
    localStorage.setItem('productoPrecio', precio);
    
    window.location.href = 'pag2.html';
}

//promocion
function comprarPromocion() {
    localStorage.setItem('productoNombre', 'Adidas X Speedportal Messi.I FG');
    localStorage.setItem('productoPrecio', 'Bs350,00');
    localStorage.setItem('productoDescripcion', 'Unas botas legendarias para un jugador legendario. Llevadas por Leo Messi fuera de Argentina una vez más, las botas de fútbol adidas X Speedportal Messi.I FG, que une el legado del mejor en dorado, con detalles inspirados por las botas que llevó en el escenario más grande en el 2006.');
    localStorage.setItem('productoImagen', 'https://ftblboots.com/cdn/shop/files/IMG_1295.jpg?v=1691264705&width=1445');
    window.location.href = 'pag2.html';
}

//FILTRAR POR MARCA
function filtrar(marca) {
    // mostrar todos
    var productos = document.querySelectorAll('.producto');
    for(var i = 0; i < productos.length; i++) {
        productos[i].style.display = 'flex';
    }
   
    // Resetear a "Todos"
    var botones = document.querySelectorAll('.filtro-tipo');
    for(var i = 0; i < botones.length; i++) {
        if(botones[i].textContent == 'Todos') {
            botones[i].classList.add('activo');
        } else {
            botones[i].classList.remove('activo');
        }
    }
   
    // Mostrar todas las grids de productos
    document.getElementById('gridadidas').style.display = 'grid';
    document.getElementById('gridnike').style.display = 'grid';
    document.getElementById('gridpuma').style.display = 'grid';
   
    // Ddesplaza a la marca
    var target;
    if(marca == 'Adidas') {
        target = document.getElementById('gridadidas').previousElementSibling;
    } else if(marca == 'NIKE') {
        target = document.getElementById('gridnike').previousElementSibling;
    } else if(marca == 'Puma') {
        target = document.getElementById('gridpuma').previousElementSibling;
    }
    if(target) {
        setTimeout(function() {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

//FILTRAR POR TIPO 
function filtrarTipo(tipo) {
    // Obtener todos los productos
    var productos = document.querySelectorAll('.producto');
    for(var i = 0; i < productos.length; i++) {
        if(tipo == 'todos') {
            // Si es "todos", mostrar todos los productos
            productos[i].style.display = 'flex';
        } else {
            // Obtener el tipo futbol11 o futbolsala
            var tipoProducto = productos[i].getAttribute('data-type');
            if(tipoProducto == tipo) {
                productos[i].style.display = 'flex';
            } else {
                productos[i].style.display = 'none';
            }
        }
    }
   
    document.getElementById('gridadidas').style.display = 'grid';
    document.getElementById('gridnike').style.display = 'grid';
    document.getElementById('gridpuma').style.display = 'grid';
}
