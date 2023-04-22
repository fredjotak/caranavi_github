import  * as THREE from 'three';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let canvas;
let controls, camera, scene, renderer;

const directorio = 'https://gitlab.com/api/v4/projects/43998404/repository/files/calidad_25%2F';
const ruta_imagen = 'SAM_100_6757_20221226_114700.jpg';
const rama = 'ref=master';
const llave = 'glpat-sn2ky_-gd1-YQgusXwQU';

let textureLoader, textureEquirec;
let sphereMesh, sphereMaterial;
const mapSrcPhotoEquirec = {
    './src/equirectangular/SAM_100_6753_20221226_112100.jpg': 0, 
    './src/equirectangular/SAM_100_6761_20221226_123214.jpg': 1, 
    './src/equirectangular/SAM_100_6785_20221226_154858.jpg': 2,
    './src/equirectangular/SAM_100_6845_20221227_061458.jpg': 3,
    './src/equirectangular/SAM_100_6920_20221227_211505.jpg': 4
};
const srcGitlist = {
    'SAM_100_6750_20221226_111117.jpg': 0,
    'SAM_100_6752_20221226_112035.jpg': 1,
    'SAM_100_6753_20221226_112100.jpg': 2,
    'SAM_100_6755_20221226_114205.jpg': 3,
    'SAM_100_6757_20221226_114700.jpg': 4,
    'SAM_100_6758_20221226_114729.jpg': 5,
    'SAM_100_6761_20221226_123214.jpg': 6,
    'SAM_100_6762_20221226_123343.jpg': 7,
    'SAM_100_6763_20221226_123403.jpg': 8,
    'SAM_100_6764_20221226_123521.jpg': 9,
    'SAM_100_6765_20221226_123608.jpg': 10,
    'SAM_100_6766_20221226_123713.jpg': 11,
    'SAM_100_6769_20221226_124239.jpg': 12,
    'SAM_100_6773_20221226_151720.jpg': 13,
    'SAM_100_6774_20221226_151740.jpg': 14,
    'SAM_100_6778_20221226_152030.jpg': 15,
    'SAM_100_6780_20221226_153541.jpg': 16,
    'SAM_100_6783_20221226_154647.jpg': 17,
    'SAM_100_6785_20221226_154858.jpg': 18,
    'SAM_100_6786_20221226_154917.jpg': 19,
    'SAM_100_6787_20221226_154928.jpg': 20,
    'SAM_100_6789_20221226_155221.jpg': 21,
    'SAM_100_6790_20221226_155237.jpg': 22,
    'SAM_100_6794_20221226_160749.jpg': 23,
    'SAM_100_6799_20221226_161012.jpg': 24,
    'SAM_100_6808_20221226_162236.jpg': 25,
    'SAM_100_6815_20221226_162437.jpg': 26,
    'SAM_100_6818_20221226_162453.jpg': 27,
    'SAM_100_6819_20221226_162501.jpg': 28,
    'SAM_100_6820_20221226_182459.jpg': 29,
    'SAM_100_6822_20221226_182916.jpg': 30,
    'SAM_100_6823_20221226_182945.jpg': 31,
    'SAM_100_6824_20221226_183030.jpg': 32,
    'SAM_100_6825_20221226_183048.jpg': 33,
    'SAM_100_6826_20221226_183126.jpg': 34,
    'SAM_100_6828_20221226_183945.jpg': 35,
    'SAM_100_6829_20221226_184004.jpg': 36,
    'SAM_100_6831_20221226_184200.jpg': 37,
    'SAM_100_6834_20221226_191804.jpg': 38,
    'SAM_100_6835_20221226_191820.jpg': 39,
    'SAM_100_6836_20221226_192007.jpg': 40,
    'SAM_100_6837_20221226_192028.jpg': 41,
    'SAM_100_6840_20221226_212027.jpg': 42,
    'SAM_100_6841_20221226_212031.jpg': 43,
    'SAM_100_6842_20221226_212035.jpg': 44,
    'SAM_100_6845_20221227_061458.jpg': 45,
    'SAM_100_6849_20221227_100113.jpg': 46,
    'SAM_100_6851_20221227_102413.jpg': 47,
    'SAM_100_6855_20221227_102755.jpg': 48,
    'SAM_100_6856_20221227_102824.jpg': 49,
    'SAM_100_6857_20221227_102838.jpg': 50,
    'SAM_100_6858_20221227_102854.jpg': 51,
    'SAM_100_6860_20221227_103549.jpg': 52,
    'SAM_100_6861_20221227_103601.jpg': 53,
    'SAM_100_6865_20221227_104513.jpg': 54,
    'SAM_100_6867_20221227_105950.jpg': 55,
    'SAM_100_6868_20221227_110008.jpg': 56,
    'SAM_100_6869_20221227_110033.jpg': 57,
    'SAM_100_6870_20221227_110137.jpg': 58,
    'SAM_100_6871_20221227_110222.jpg': 59,
    'SAM_100_6876_20221227_114131.jpg': 60,
    'SAM_100_6877_20221227_144638.jpg': 61,
    'SAM_100_6881_20221227_151218.jpg': 62,
    'SAM_100_6883_20221227_151316.jpg': 63,
    'SAM_100_6890_20221227_151713.jpg': 64,
    'SAM_100_6895_20221227_152856.jpg': 65,
    'SAM_100_6896_20221227_152913.jpg': 66,
    'SAM_100_6897_20221227_152932.jpg': 67,
    'SAM_100_6901_20221227_182210.jpg': 68,
    'SAM_100_6908_20221227_182508.jpg': 69,
    'SAM_100_6915_20221227_195151.jpg': 70,
    'SAM_100_6918_20221227_211449.jpg': 71,
    'SAM_100_6920_20221227_211505.jpg': 72,
    'SAM_100_6925_20221228_094412.jpg': 73,
    'SAM_100_6927_20221228_095024.jpg': 74,
    'SAM_100_6929_20221228_095107.jpg': 75,
    'SAM_100_6930_20221228_095128.jpg': 76,
    'SAM_100_6931_20221228_095135.jpg': 77,
    'SAM_100_6932_20221228_095138.jpg': 78,
    'SAM_100_6933_20221228_095143.jpg': 79,
    'SAM_100_6934_20221228_095146.jpg': 80,
    'SAM_100_6935_20221228_095150.jpg': 81,
    'SAM_100_6936_20221228_095201.jpg': 82,
    'SAM_100_6937_20221228_095209.jpg': 83,
    'SAM_100_6940_20221228_100525.jpg': 84,
    'SAM_100_6942_20221228_100646.jpg': 85,
    'SAM_100_6943_20221228_151849.jpg': 86,
    'SAM_100_6944_20221228_151911.jpg': 87,
    'SAM_100_6945_20221228_151942.jpg': 88,
    'SAM_100_6946_20221228_151955.jpg': 89,
    'SAM_100_6947_20221228_152000.jpg': 90,
    'SAM_100_6948_20221228_152005.jpg': 91,
    'SAM_100_6949_20221228_152107.jpg': 92,
    'SAM_100_6950_20221228_152113.jpg': 93,
    'SAM_100_6951_20221228_152121.jpg': 94,
    'SAM_100_6956_20221228_152615.jpg': 95
};
const reverseMapEquirec = [];
for(const i in srcGitlist) reverseMapEquirec[srcGitlist[i]] = i;
let eqIndex = 0;
let estado = false;

init();
animate();

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
        textureEquirec = textureLoader.load(reverseMapEquirec[0]);
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = textureEquirec;
    }

    // esfera
    {
        const geometry = new THREE.IcosahedronGeometry(400, 15);
        sphereMaterial = new THREE.MeshBasicMaterial({envMap: textureEquirec});
        sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
        scene.add(sphereMesh);
    }
    cambiarImagenGit();

    //control
    controls = new OrbitControls(camera, canvas);

    const params = {
        Left: function(){
            eqIndex = ((eqIndex-1)>=0)? eqIndex-1: reverseMapEquirec.length-1;
            cambiarImagenGit();
        },
        Right: function(){
            eqIndex = ((eqIndex+1)<reverseMapEquirec.length)? eqIndex+1: 0;
            cambiarImagenGit();
        },
        Refraction: false
    };

    const gui = new GUI();
    gui.add(params, 'Left');
    gui.add(params, 'Right');
    gui.add(params, 'Refraction').onChange( function(value){
        estado = value;
        if(value){
            textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
        } else {
            textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        }
        sphereMaterial.needsUpdate = true;
    });
    gui.open();
}

function animate(){
    requestAnimationFrame(animate);
    render();
}

function render(){
    renderer.render(scene, camera);
}

function cambiarImagenGit(){
    $.ajax({
        //url: "https://gitlab.com/api/v4/projects/43957839/repository/files/recursos%2FSAM_100_5825_20220130_135541.jpg?ref=main",
        url: directorio+reverseMapEquirec[eqIndex]+'?'+rama,
        type: "GET",
        beforeSend: function(xhr) {
           xhr.setRequestHeader("Authorization", "Bearer "+llave);
        },
        dataType: 'json',
        success: function(data) {
            let extension =  data.file_name.split('.')[data.file_name.split('.').length-1];
           
            textureLoader = new THREE.TextureLoader();
            textureEquirec = textureLoader.load('data:image/'+extension+';'+data.encoding+','+data.content, ()=> {
                scene.background = textureEquirec;
                sphereMaterial.envMap = textureEquirec;
                sphereMaterial.needsUpdate = true;
        
                // Esfera
                if(estado){
                    textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
                } else {
                    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
                }
                sphereMaterial.needsUpdate = true;
            }); 
            
            //$('#mi-imagen').attr('src','data:image/'+extension+';'+data.encoding+','+data.content);
        },
        error: function(jqXHR, textStatus/*, errorThrown*/) {
            console.log('Error', jqXHR, textStatus);
            //console.log(textStatus, errorThrown);
        },
        complete: function(xhr, textStatu){
            
        }
    });
}