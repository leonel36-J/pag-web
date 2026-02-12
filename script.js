const PRODUCTS_PER_PAGE = 4; 
let currentPage = 1;
let activeBrand = 'todos'; // Filtro de marca
let activeType = 'todos';  // Filtro de tipo

// ALMACENAR LOS PRODUCTOS SELECCIONADOS
let carrito = []; 

// guardar el producto temp
let productoSeleccionado = null; 


// CONFIGURACIÓN DE WHATSAPP
const WHATSAPP_NUMBER = '59173054551'; 

// VER EL DETALLE DEL PRODUCTO
function verDetalle(id, nombre, marca, precio, evento) {
    
    // Buscar producto 
    var productoClickeado = evento.target.closest('.producto');
    var imgSrc = productoClickeado.querySelector('img').src;

    var precioVentaElemento = productoClickeado.querySelector('.precio-promo') || productoClickeado.querySelector('.producto-precio'); 

    if (precioVentaElemento) {
        precio = precioVentaElemento.textContent.trim();
    }
   
    // guardar descripción
    const descripcion = obtenerDescripcion(nombre); // Uso la función auxiliar
    
    // Llenar con el producto temporal
    productoSeleccionado = {
        nombre: nombre,
        precio: precio
    };

    // Llenar el contenido del Modal
    document.getElementById('modalNombre').textContent = nombre;
    document.getElementById('modalDescripcion').textContent = descripcion;
    document.getElementById('modalPrecio').textContent = precio;
    document.getElementById('modalImagen').src = imgSrc;

    
    document.getElementById('productModal').style.display = 'block';

    // Asignar el evento al botón de comprar dentro del modal
    document.getElementById('modalBotonComprar').onclick = agregarProductoAlCarrito;
}

// CERRAR
function cerrarModal() {
    document.getElementById('productModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        cerrarModal();
    }
}

// CERRAR CARRITO
function cerrarDetalle() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}


// WHATSAPP
function generarMensajeWhatsApp() {
    let mensaje = "¡Hola!... Quiero hacer un pedido con los siguientes productos:\n\n";
    let total = 0;

    if (carrito.length === 0) {
        return "¡Hola!... Mi carrito está vacío, pero me gustaría recibir información sobre sus productos.";
    }

    
    carrito.forEach((item, index) => {
        const precioLimpio = parseFloat(item.precio.replace('Bs', '').trim().replace(',', '.'));
        
        mensaje += `${index + 1}. ${item.nombre} - ${item.precio}\n`;
        total += precioLimpio;
    });

    // Total
    const totalFormateado = total.toFixed(2).replace('.', ',');

    mensaje += "\n------------------------------------";
    mensaje += `\nTOTAL A PAGAR: Bs${totalFormateado}`;
    mensaje += "\n------------------------------------";
    mensaje += "\nPor favor, confírmenme el stock y el método de pago.";
    
    return mensaje;
}

/*Abre la URL DE WHTS */
function enviarPedidoPorWhatsApp() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. ¡Selecciona productos antes de comprar!');
        return;
    }

    const mensaje = generarMensajeWhatsApp();
    const mensajeCodificado = encodeURIComponent(mensaje);


    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;


    window.open(whatsappUrl, '_blank');
    
    // Limpiar el carrito después de enviar el pedido
    carrito = [];
    renderCart(); // Actualizar 
}

// CONFIRMAR LA COMPRA
function confirmarCompra() {
    enviarPedidoPorWhatsApp();
}

// COMPRAR PROMOCION
function comprarPromocion() {
    const promocion = {
        nombre: 'Adidas X Speedportal Messi.I FG',
        precio: 'Bs350,00'
    };
    
    // producto de promoción al carrito actual
    carrito.push(promocion);
    renderCart(); //actualización del carrito 
    
 
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
    
    // Obtener los contenedores de marcas
    var gridAdidas = document.getElementById('gridadidas');
    var gridNike = document.getElementById('gridnike');
    var gridPuma = document.getElementById('gridpuma');

    gridAdidas.style.display = 'grid'; 
    gridNike.style.display = 'grid';
    gridPuma.style.display = 'grid';

    for(var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        
        if(tipo === 'todos') {
            //mostrar todos los productos
            producto.style.display = 'flex';
        } else {
            //tipo futbol11 o futbolsala
            var tipoProducto = producto.getAttribute('data-type');
            
            if(tipoProducto === tipo) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        }
    }
}



function renderBrandProducts(brandName, page) {
    const brandElementId = `grid${brandName}`;
    const brandContainer = document.getElementById(brandElementId);
    if (!brandContainer) return;

    const allProducts = Array.from(brandContainer.querySelectorAll('.producto'));
    const filteredProducts = allProducts.filter(p => {
        const typeMatch = activeType === 'todos' || p.getAttribute('data-type') === activeType;
        return typeMatch;
    });

    // 2. Determinar el total de páginas
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    
 
    let currentPageBrand = page;
    if (currentPageBrand > totalPages && totalPages > 0) {
        currentPageBrand = totalPages;
    } else if (totalPages === 0) {
        currentPageBrand = 1;
    }

  
    allProducts.forEach(p => p.style.display = 'none');
    
    // Mostrar los productos de la página actual
    const startIndex = (currentPageBrand - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    
    filteredProducts.slice(startIndex, endIndex).forEach(p => {
        p.style.display = 'flex';
    });

    // botones de paginación para esta marca
    setupBrandPagination(brandName, currentPageBrand, totalPages);

    return currentPageBrand; 
}

function setupBrandPagination(brandName, currentPageBrand, totalPages) {
    const pageNumbersContainer = document.getElementById(`pageNumbers-${brandName}`);
    const prevBtn = document.getElementById(`prevBtn-${brandName}`);
    const nextBtn = document.getElementById(`nextBtn-${brandName}`);
    const paginationWrapper = document.getElementById(`pagination-wrapper-${brandName}`);

    if (!pageNumbersContainer || !paginationWrapper) return;
    
    pageNumbersContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        paginationWrapper.style.display = 'none';
        return;
    } else {
        paginationWrapper.style.display = 'flex'; 
    }

    
   // Botones numéricos
for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    const pageNumber = i; 

    btn.textContent = pageNumber;
    btn.classList.toggle('active', pageNumber === currentPageBrand);

    // IMPLEMENTACIÓN DE LA LÓGICA 
    btn.onclick = () => { 
        if (pageNumber === 1) {
            // El botón '1' ahora llama a "Anterior" 
            changeBrandPage(brandName, -1);
        } else if (pageNumber === 2) {
            // El botón '2' ahora llama a "Siguiente"
            changeBrandPage(brandName, 1);
        } else {
            changeBrandPage(brandName, pageNumber); 
        }
    };
    
    pageNumbersContainer.appendChild(btn);
}
    
    // Configurar los botones Anterior y Siguiente 
    if (prevBtn) {
        prevBtn.disabled = currentPageBrand === 1;
        //onclick para el botón Anterior
        prevBtn.onclick = () => { changeBrandPage(brandName, -1); }; 
    }
    if (nextBtn) {
        nextBtn.disabled = currentPageBrand === totalPages;
        // onclick para el botón Siguiente
        nextBtn.onclick = () => { changeBrandPage(brandName, 1); }; 
    }
}

/**
 * Manejador del clic para cambiar de página de una marca.
*/
function changeBrandPage(brandName, pageOrDelta) {
    let newPage;

    const wrapper = document.getElementById(`pagination-wrapper-${brandName}`);
    let currentPageBrand = parseInt(wrapper.getAttribute('data-current-page')) || 1;
    
    if (typeof pageOrDelta === 'number' && (pageOrDelta === -1 || pageOrDelta === 1)) {
        newPage = currentPageBrand + pageOrDelta;
    } else {

        newPage = pageOrDelta;
    }
    
    newPage = renderBrandProducts(brandName, newPage);
    wrapper.setAttribute('data-current-page', newPage);
}

// RENDERIZAR PRODUCTOS SEGÚN FILTROS Y PAGINACIÓN
function renderProducts() {
    // Inicializar la paginación para cada marca
    changeBrandPage('adidas', 1);
    changeBrandPage('nike', 1);
    changeBrandPage('puma', 1);
    
    //títulos de marca estén visibles si hay productos
    document.getElementById('titulo-adidas').style.display = 'block';
    document.getElementById('titulo-nike').style.display = 'block';
    document.getElementById('titulo-puma').style.display = 'block';
    
    // Mantenemos visible los contenedores de marcas
    document.getElementById('gridadidas').style.display = 'grid'; 
    document.getElementById('gridnike').style.display = 'grid';
    document.getElementById('gridpuma').style.display = 'grid';
}


// REEMPLAZAR LA FUNCIÓN FILTRARTIPO POR ESTA
function filtrarTipo(tipo) {
    activeType = tipo; // Actualizar el filtro global

    var botones = document.querySelectorAll('.filtro-tipo');
    botones.forEach(btn => {
        btn.classList.remove('activo');
        if(btn.textContent.toLowerCase().includes(tipo.toLowerCase())) {
            btn.classList.add('activo');
        }
    });
    renderProducts();
}



window.onload = function() {
    document.getElementById('pagination-wrapper-adidas').setAttribute('data-current-page', 1);
    document.getElementById('pagination-wrapper-nike').setAttribute('data-current-page', 1);
    document.getElementById('pagination-wrapper-puma').setAttribute('data-current-page', 1);
    
    renderProducts(); // INICIALIZA EL FILTRADO Y PAGINACIÓN
    renderCart(); // Inicializar el carrito
};

/*Genera y actualiza los botones de paginación*/
function setupPaginationButtons(totalPages) {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const paginationWrapper = document.getElementById('pagination-wrapper');
    pageNumbersContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        paginationWrapper.style.display = 'none';
        return;
    } else {
        paginationWrapper.style.display = 'flex'; // Mostrar la paginación si hay más de una página
    }

    // Botones numéricos
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.toggle('active', i === currentPage);
        btn.onclick = () => { 
            currentPage = i; 
            renderProducts(); 
        };
        pageNumbersContainer.appendChild(btn);
    }
    
    // Habilitar/deshabilitar Anterior/Siguiente
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function changePage(delta) {
    currentPage += delta;
    renderProducts();
}


// FUNCIONES DE CARRITO Y UTILIDAD
// FUNCIÓN PARA CALCULAR Y MOSTRAR EL CARRITO 
function renderCart() {
    const lista = document.getElementById('listaProductosSeleccionados');
    const totalElement = document.getElementById('detalleTotal');
    const detalleSection = document.getElementById('detalle');
    let total = 0;
    let htmlContent = '';

    if (carrito.length === 0) {
        htmlContent = '<p>Aún no has seleccionado ningún producto.</p>';
        detalleSection.classList.remove('visible'); 
        totalElement.textContent = 'Bs0,00'; // Corregido a formato coma
    } else {
        htmlContent = '<ul>';
        carrito.forEach((item, index) => {
            // Aseguramos que el precio sea un número para sumar
            const precioLimpio = parseFloat(item.precio.replace('Bs', '').replace(',', '.'));
            total += precioLimpio;
            
            htmlContent += `
                <li>
                    <span>${item.nombre}</span> 
                    <span class="precio-carrito">${item.precio}</span>
                    <button class="btn-eliminar" data-index="${index}" onclick="eliminarDelCarrito(${index})">X</button>
                </li>
            `;
        });
        htmlContent += '</ul>';
        
        detalleSection.classList.add('visible');
        totalElement.textContent = `Bs${total.toFixed(2).replace('.', ',')}`;
    }

    lista.innerHTML = htmlContent;
}

//ELIMINAR UN PRODUCTO DEL CARRITO
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    renderCart();
}

//AÑADE EL PRODUCTO DESDE EL MODAL AL CARRITO 
function agregarProductoAlCarrito() {
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        productoSeleccionado = null;
        cerrarModal();
        renderCart(); // Actualizar la vista del carrito
        
        setTimeout(function() {
            document.getElementById('detalle').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

//OBTENER LA DESCRIPCIÓN 
function obtenerDescripcion(nombre) {

    let desc = 'Bota de fútbol de alta calidad, diseñada para un rendimiento superior en el campo.';
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
    else if(nombre == 'PUMA FUTURE 8 ULTIMATE AG') desc = 'Máxima gama de la línea Future, conocida por su adaptabilidad al pie y su suela para césped artificial (AG).';
    else if(nombre == 'Puma Future 7 Match Plus FG') desc = 'Un buen equilibrio entre rendimiento y precio, ofreciendo comodidad y flexibilidad en césped natural (FG).';
    else if(nombre == 'Puma Future 7 Play') desc = 'Opción de entrada a la línea Future, enfocada en un ajuste sencillo y buen rendimiento en el campo.';
    else if(nombre == 'PUMA ULTRA 5 PLAY MG') desc = 'Diseñada para la velocidad con un peso muy ligero, y suela multi-terreno (MG) para diversas superficies.';
    else if(nombre == 'Puma Future 7 Pro') desc = 'Bota de gama media-alta que ofrece buen rendimiento y un ajuste seguro para el jugador moderno.';
    else if(nombre == 'Puma Evopower') desc = 'Centradas en la potencia de golpeo y el remate, diseñadas para maximizar la fuerza del tiro.';
    else if(nombre == 'Puma Future 8 Play') desc = 'Bota que combina comodidad y versatilidad, ideal para jugadores que buscan un buen rendimiento en diferentes facetas del juego.';
    return desc;
}


const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {
    
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('activo');
    }
    
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', function(e) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('activo');
        });
    });
}


window.onload = function() {
    renderProducts(); // <-- INICIALIZA EL FILTRADO Y PAGINACIÓN
    renderCart(); // Inicializar el carrito
};
