window.addEventListener('load', function() {
    let botonMenu = document.querySelector("#enc-boton-menu");
    let botonCerrar = document.querySelector("#barra-lateral-boton-cerrar");
    let sombraNav = document.querySelector("#navSombra");
    let navLateral = document.querySelector("#barra-lateral");

    let mostrarMenu = function(){
        navLateral.classList.remove("ocultar");
        sombraNav.classList.remove("ocultar");
    }

    let ocultarMenu = function(){
        navLateral.classList.add("ocultar");
        sombraNav.classList.add("ocultar");
    }

    botonMenu.addEventListener('click',() => {
        mostrarMenu();
    });

    botonCerrar.addEventListener('click',() => {
        ocultarMenu();
    });

    sombraNav.addEventListener('click',() => {
        ocultarMenu();
    });

    // ******** REPRODUCCIÓN AUTOMÁTICO DE VIDEOS CUANDO SE PASA EL CURSOR
    const videoAutoPlay = this.document.querySelectorAll(".contenido-elemento-video>video");
    for(let i=0; i<videoAutoPlay.length; i++){
        videoAutoPlay[i].addEventListener('mouseenter', function(e){
            videoAutoPlay[i].play();
        });
        videoAutoPlay[i].addEventListener('mouseout', function(e){
            videoAutoPlay[i].pause();
        });
    }

    // CREADOR DE CONTENEDOR GALERIA - MINIATURAS
    const nroImagenes = recursos360.length;
    const directorioMiniatura = '../public/thumbst/';
    const contenedorGaleria = document.querySelector('.contenedor-galeria');
    recursos360.forEach((obj360)=> {
        let elem360 = crearMiniaturaFoto(directorioMiniatura+obj360.thumb, obj360.nombre, obj360.id-1);
        contenedorGaleria.appendChild(elem360);
    });



    // ************* click En una elemento de la galeria
    // contenedores
    let elementoGaleria = this.document.querySelectorAll('.contenido-elemento');
    let modalVideoImagen = this.document.querySelector('#modal-imagen-video');
    let contenedorImagenVideo = this.document.querySelector('.modal-imagen-video-contenedor');

    // control de botones del Modal
    let modalBotonCerrar = this.document.querySelector('#modal-imagen-video-boton-cerrar');
    let modalBotonAnterior = this.document.querySelector('#modal-imagen-video-boton-anterior');
    let modalBotonSiguiente = this.document.querySelector('#modal-imagen-video-boton-siguiente');
    let indice = null;

    for(let i=0; i<elementoGaleria.length; i++){
        elementoGaleria[i].addEventListener('dblclick', function(e){
            let dato = elementoGaleria[i];
            indice = parseInt(dato.querySelector('img').dataset.id);
            cambiarSiguienteAnterior();
        });
    }
    modalBotonCerrar.addEventListener('click', function(e){
        modalVideoImagen.style.display = 'none';
    });
    modalBotonSiguiente.addEventListener('click', function(e){
        //console.log('tot: '+nroImagenes, ', actual '+ indice );
        if(indice+1<nroImagenes){
            indice++;
            cambiarSiguienteAnterior();
        }
    }); 
    modalBotonAnterior.addEventListener('click', (e)=> {
        //console.log('actual: '+ indice);
        if(indice-1>=0){
            indice--;
            cambiarSiguienteAnterior();
        }
    });

    function cambiarSiguienteAnterior(){
        console.log('sadsadsa');
        eliminarNodosHijos(contenedorImagenVideo);
        // Si es imagen asumiendo
        {
            // limpiar botones activos left right
            modalBotonAnterior.querySelector('svg').classList.remove('activo');
            modalBotonSiguiente.querySelector('svg').classList.remove('activo');

            if(nroImagenes>1){
                if(indice+1<nroImagenes){ // boton siguiente
                    modalBotonSiguiente.querySelector('svg').classList.add('activo');
                }
                if(indice>0){ // boton anterior
                    modalBotonAnterior.querySelector('svg').classList.add('activo');
                }
            }

            // foto
            let datoRecurso = directorioMiniatura+recursos360[indice].thumb;
            modalVideoImagen.style.display = 'block';
            
            modalVideoImagen.querySelector(".modal-imagen-video-info").querySelector("h3").textContent = datoRecurso;

            // Crear imagen 
            let contImg = document.createElement("img");
            contImg.src = datoRecurso;
            contenedorImagenVideo.append(contImg);

        }
    }
});


function eliminarNodosHijos(nodoPadre){
    if ( nodoPadre.hasChildNodes() ){
        while ( nodoPadre.childNodes.length >= 1 ) {
            nodoPadre.removeChild( nodoPadre.firstChild );
        }
    }
}

function crearMiniaturaFoto(inSrcThumb, inNombre, inFecha){
    let divContenedor = document.createElement('div');
    divContenedor.classList.add('contenido-elemento', 'contenido-elemento-foto');

    let miniatura = document.createElement('img');
    miniatura.src = inSrcThumb;
    miniatura.alt = inNombre;
    miniatura.dataset.id = inFecha;
    divContenedor.appendChild(miniatura);

    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('cont-ele-descripcion');
    {
        let divTipo = document.createElement('div');
        divTipo.classList.add('cont-ele-desc-foto360');
        divDescripcion.appendChild(divTipo);

        let pTitulo = document.createElement('p');
        pTitulo.innerText = inNombre;
        divDescripcion.appendChild(pTitulo);

        let spanFecha = document.createElement('span');
        spanFecha.innerText = inFecha;
        divDescripcion.appendChild(spanFecha);
    }
    divContenedor.appendChild(divDescripcion);

    return divContenedor;

}