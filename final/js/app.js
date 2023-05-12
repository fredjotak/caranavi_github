import  * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

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

    // elementos three.js
    let canvas;
    let controls, camera, scene, renderer;

    const directorio = 'https://gitlab.com/api/v4/projects/43998404/repository/files/calidad_25%2F';
    const ruta_imagen = 'SAM_100_6757_20221226_114700.jpg';
    const rama = 'ref=master';
    const llave = 'glpat-sn2ky_-gd1-YQgusXwQU';

    let textureLoader, textureEquirec;
    let sphereMesh, sphereMaterial;
    // fin elementos three,js

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
        let fecha = /* obj360.nombre.split('_')[3].substring(4, 6)+"/"+ */obj360.nombre.split('_')[3].substring(6, 8)+ " de Diciembre";
        let hora = obj360.nombre.split('_')[4].split('.')[0].substring(0, 2)+":"+obj360.nombre.split('_')[4].split('.')[0].substring(2, 4)
        let elem360 = crearMiniaturaFoto(obj360.id-1, directorioMiniatura+obj360.thumb, obj360.nombre, fecha+" "+hora);
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
    let indice = 0;
    //init();
    //animate();

    for(let i=0; i<elementoGaleria.length; i++){
        // dblclick
        elementoGaleria[i].addEventListener('click', function(e){ 
            let dato = elementoGaleria[i];
            indice = parseInt(dato.querySelector('img').dataset.id);
            elementoGaleria[i].classList.add('animar');
            setTimeout(()=> {
                modalVideoImagen.style.display = 'block';
                init();
                animate();
                cambiarSiguienteAnterior();
            }, 1500)
        });
    }
    modalBotonCerrar.addEventListener('click', function(e){
        modalVideoImagen.style.display = 'none';
        document.location = "#"+indice;
    });
    modalBotonSiguiente.addEventListener('click', function(e){
        if(indice+1<nroImagenes){
            indice++;
            cambiarSiguienteAnterior();
        }
    }); 
    modalBotonAnterior.addEventListener('click', (e)=> {
        if(indice-1>=0){
            indice--;
            cambiarSiguienteAnterior();
        }
    });

    function cambiarSiguienteAnterior(){
        // Si es imagen asumiendo
        {
            // limpiar botones activos left right
            modalBotonAnterior.querySelector('svg').classList.remove('activo');
            modalBotonSiguiente.querySelector('svg').classList.remove('activo');

            // esfera temporal con miniatura
            {
                const textureLoading  = new THREE.TextureLoader();
                const textureEquirectmp = textureLoading.load(directorioMiniatura+recursos360[indice].thumb);
                textureEquirectmp.mapping = THREE.EquirectangularReflectionMapping;
        
                sphereMaterial.envMap = textureEquirectmp;
                sphereMaterial.needsUpdate = true;
                scene.add(sphereMesh);
                controls.autoRotate = true;
            }
            if(nroImagenes>1){
                if(indice+1<nroImagenes){ // boton siguiente
                    modalBotonSiguiente.querySelector('svg').classList.add('activo');
                }
                if(indice>0){ // boton anterior
                    modalBotonAnterior.querySelector('svg').classList.add('activo');
                }
            }
            
            modalVideoImagen.querySelector(".modal-imagen-video-info").querySelector("h3").textContent = recursos360[indice].nombre;
            cambiarImagenGit();
        }
    }

    // funciones THREE.js
    function init(){
        canvas = document.querySelector('#canvas');
    
        renderer = new THREE.WebGLRenderer({canvas});
        renderer.setPixelRatio = window.devicePixelRatio;
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        //renderer.outputEncoding = THREE.sRGBEncoding; //Filtro
    
        // scena 
        scene = new THREE.Scene();
    
        //camera
        {
            camera = new THREE.PerspectiveCamera(70, canvas.clientWidth/canvas.clientHeight, 1, 1000);
            camera.position.set(0, 0, 1000);
        }
    
        //fondo
        {
            textureLoader = new THREE.TextureLoader();
            textureEquirec = textureLoader.load(directorioMiniatura+"blank.jpg");
            scene.background = textureEquirec;
            textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        }
    
        // esfera crear temporal
        {
            const geometry = new THREE.IcosahedronGeometry(300, 15);
            sphereMaterial = new THREE.MeshBasicMaterial({envMap: textureEquirec});
            sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
            sphereMaterial.envMap = textureEquirec;
            textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
            sphereMaterial.needsUpdate = true;
            scene.add(sphereMesh);
        }
        //renderer.setAnimationLoop( animation );
        //cambiarImagenGit();
    
        //control
        controls = new OrbitControls(camera, canvas);
        controls.autoRotateSpeed = 5.0;
        controls.autoRotate = true;

        document.addEventListener( 'wheel', onDocumentMouseWheel );
        window.addEventListener( 'resize', onWindowResize );
    }
    
    function animate(){
        requestAnimationFrame(animate);
        render();
    }
    /* function animation(msTime){
        console.log('Rotar');
        const time = msTime/1000;
        console.log(msTime, time)
        sphereMesh.rotation.x += .2;
        camera.update(renderer, scene);
        controls.update();
        renderer.render( scene, camera );
    } */
    
    function render(){
        controls.update();  /* actualiza la rotacion de Controls */
        renderer.render(scene, camera);
    }
    function onDocumentMouseWheel( event ) {
        const fov = camera.fov + event.deltaY * /* 0.05 */0.03;
        camera.fov = THREE.MathUtils.clamp( fov,/* 10 */25, /* 75 */75);
        //console.log(geometry);
        camera.updateProjectionMatrix();
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function cambiarImagenGit(){
        //console.log(directorio+recursos360[indice].nombre+'?'+rama);
        $.ajax({
            //url: "https://gitlab.com/api/v4/projects/43957839/repository/files/recursos%2FSAM_100_5825_20220130_135541.jpg?ref=main",
            url: directorio+recursos360[indice].nombre+'?'+rama,
            type: "GET",
            beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer "+llave);
            },
            dataType: 'json',
            success: function(data) {
                scene.remove(sphereMesh); // eliminar esfera
                controls.autoRotate = false;
                let extension =  data.file_name.split('.')[data.file_name.split('.').length-1];
               
                textureLoader = new THREE.TextureLoader();
                textureEquirec = textureLoader.load('data:image/'+extension+';'+data.encoding+','+data.content, ()=> {
                    scene.background = textureEquirec;
                    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
                }); 
                //$('#mi-imagen').attr('src','data:image/'+extension+';'+data.encoding+','+data.content);
            },
            error: function(jqXHR, textStatus/*, errorThrown*/) {
                console.log('Error', jqXHR, textStatus);
                //console.log(textStatus, errorThrown);
            },
            complete: function(xhr, textStatu){
                //console.log('loading '+indice);
            }
        });
    }
});

function crearMiniaturaFoto(idFoto, inSrcThumb, inNombre, inFecha){
    let divContenedor = document.createElement('div');
    divContenedor.classList.add('contenido-elemento', 'contenido-elemento-foto');
    divContenedor.id = idFoto;

    let miniatura = document.createElement('img');
    miniatura.src = inSrcThumb;
    miniatura.alt = inNombre;
    miniatura.dataset.id = idFoto;
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
