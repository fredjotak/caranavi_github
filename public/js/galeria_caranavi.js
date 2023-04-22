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
const datos = [
    {id:1, nombre:'SAM_100_6750_20221226_111117.jpg',thumb: '675020393.jpg'}, 
    {id:2, nombre:'SAM_100_6752_20221226_112035.jpg',thumb: '675232216.jpg'}, 
    {id:3, nombre:'SAM_100_6753_20221226_112100.jpg',thumb: '675318095.jpg'}, 
    {id:4, nombre:'SAM_100_6755_20221226_114205.jpg',thumb: '675524752.jpg'}, 
    {id:5, nombre:'SAM_100_6757_20221226_114700.jpg',thumb: '675730051.jpg'}, 
    {id:6, nombre:'SAM_100_6758_20221226_114729.jpg',thumb: '67584857.jpg'}, 
    {id:7, nombre:'SAM_100_6761_20221226_123214.jpg',thumb: '676112637.jpg'}, 
    {id:8, nombre:'SAM_100_6762_20221226_123343.jpg',thumb: '676220531.jpg'}, 
    {id:9, nombre:'SAM_100_6763_20221226_123403.jpg',thumb: '67631886.jpg'}, 
    {id:10, nombre:'SAM_100_6764_20221226_123521.jpg',thumb: '67648424.jpg'}, 
    {id:11, nombre:'SAM_100_6765_20221226_123608.jpg',thumb: '676529317.jpg'}, 
    {id:12, nombre:'SAM_100_6766_20221226_123713.jpg',thumb: '6766299.jpg'}, 
    {id:13, nombre:'SAM_100_6769_20221226_124239.jpg',thumb: '676919526.jpg'}, 
    {id:14, nombre:'SAM_100_6773_20221226_151720.jpg',thumb: '677312949.jpg'}, 
    {id:15, nombre:'SAM_100_6774_20221226_151740.jpg',thumb: '677415656.jpg'}, 
    {id:16, nombre:'SAM_100_6778_20221226_152030.jpg',thumb: '67781668.jpg'}, 
    {id:17, nombre:'SAM_100_6780_20221226_153541.jpg',thumb: '678031725.jpg'}, 
    {id:18, nombre:'SAM_100_6783_20221226_154647.jpg',thumb: '678315583.jpg'}, 
    {id:19, nombre:'SAM_100_6785_20221226_154858.jpg',thumb: '678529157.jpg'}, 
    {id:20, nombre:'SAM_100_6786_20221226_154917.jpg',thumb: '678614497.jpg'}, 
    {id:21, nombre:'SAM_100_6787_20221226_154928.jpg',thumb: '678721673.jpg'}, 
    {id:22, nombre:'SAM_100_6789_20221226_155221.jpg',thumb: '67893915.jpg'}, 
    {id:23, nombre:'SAM_100_6790_20221226_155237.jpg',thumb: '679018699.jpg'}, 
    {id:24, nombre:'SAM_100_6794_20221226_160749.jpg',thumb: '67945381.jpg'}, 
    {id:25, nombre:'SAM_100_6799_20221226_161012.jpg',thumb: '679915075.jpg'}, 
    {id:26, nombre:'SAM_100_6808_20221226_162236.jpg',thumb: '680832385.jpg'}, 
    {id:27, nombre:'SAM_100_6815_20221226_162437.jpg',thumb: '68151879.jpg'}, 
    {id:28, nombre:'SAM_100_6818_20221226_162453.jpg',thumb: '681832325.jpg'}, 
    {id:29, nombre:'SAM_100_6819_20221226_162501.jpg',thumb: '68194450.jpg'}, 
    {id:30, nombre:'SAM_100_6820_20221226_182459.jpg',thumb: '68204323.jpg'}, 
    {id:31, nombre:'SAM_100_6822_20221226_182916.jpg',thumb: '6822141.jpg'}, 
    {id:32, nombre:'SAM_100_6823_20221226_182945.jpg',thumb: '682330161.jpg'}, 
    {id:33, nombre:'SAM_100_6824_20221226_183030.jpg',thumb: '682413458.jpg'}, 
    {id:34, nombre:'SAM_100_6825_20221226_183048.jpg',thumb: '682532386.jpg'}, 
    {id:35, nombre:'SAM_100_6826_20221226_183126.jpg',thumb: '68268940.jpg'}, 
    {id:36, nombre:'SAM_100_6828_20221226_183945.jpg',thumb: '682810663.jpg'}, 
    {id:37, nombre:'SAM_100_6829_20221226_184004.jpg',thumb: '68296728.jpg'}, 
    {id:38, nombre:'SAM_100_6831_20221226_184200.jpg',thumb: '683110532.jpg'}, 
    {id:39, nombre:'SAM_100_6834_20221226_191804.jpg',thumb: '683430360.jpg'}, 
    {id:40, nombre:'SAM_100_6835_20221226_191820.jpg',thumb: '683528534.jpg'}, 
    {id:41, nombre:'SAM_100_6836_20221226_192007.jpg',thumb: '683610826.jpg'}, 
    {id:42, nombre:'SAM_100_6837_20221226_192028.jpg',thumb: '683728459.jpg'}, 
    {id:43, nombre:'SAM_100_6840_20221226_212027.jpg',thumb: '684026025.jpg'}, 
    {id:44, nombre:'SAM_100_6841_20221226_212031.jpg',thumb: '684119589.jpg'}, 
    {id:45, nombre:'SAM_100_6842_20221226_212035.jpg',thumb: '684216283.jpg'}, 
    {id:46, nombre:'SAM_100_6845_20221227_061458.jpg',thumb: '684527528.jpg'}, 
    {id:47, nombre:'SAM_100_6849_20221227_100113.jpg',thumb: '68492198.jpg'}, 
    {id:48, nombre:'SAM_100_6851_20221227_102413.jpg',thumb: '68513220.jpg'}, 
    {id:49, nombre:'SAM_100_6855_20221227_102755.jpg',thumb: '68556376.jpg'}, 
    {id:50, nombre:'SAM_100_6856_20221227_102824.jpg',thumb: '685614818.jpg'}, 
    {id:51, nombre:'SAM_100_6857_20221227_102838.jpg',thumb: '68574240.jpg'}, 
    {id:52, nombre:'SAM_100_6858_20221227_102854.jpg',thumb: '685831476.jpg'}, 
    {id:53, nombre:'SAM_100_6860_20221227_103549.jpg',thumb: '68606498.jpg'}, 
    {id:54, nombre:'SAM_100_6861_20221227_103601.jpg',thumb: '686113868.jpg'}, 
    {id:55, nombre:'SAM_100_6865_20221227_104513.jpg',thumb: '68652395.jpg'}, 
    {id:56, nombre:'SAM_100_6867_20221227_105950.jpg',thumb: '6867540.jpg'}, 
    {id:57, nombre:'SAM_100_6868_20221227_110008.jpg',thumb: '686817626.jpg'}, 
    {id:58, nombre:'SAM_100_6869_20221227_110033.jpg',thumb: '686910637.jpg'}, 
    {id:59, nombre:'SAM_100_6870_20221227_110137.jpg',thumb: '687026334.jpg'}, 
    {id:60, nombre:'SAM_100_6871_20221227_110222.jpg',thumb: '687119330.jpg'}, 
    {id:61, nombre:'SAM_100_6876_20221227_114131.jpg',thumb: '68763664.jpg'}, 
    {id:62, nombre:'SAM_100_6877_20221227_144638.jpg',thumb: '687714462.jpg'}, 
    {id:63, nombre:'SAM_100_6881_20221227_151218.jpg',thumb: '688125715.jpg'}, 
    {id:64, nombre:'SAM_100_6883_20221227_151316.jpg',thumb: '688332554.jpg'}, 
    {id:65, nombre:'SAM_100_6890_20221227_151713.jpg',thumb: '68904747.jpg'}, 
    {id:66, nombre:'SAM_100_6895_20221227_152856.jpg',thumb: '689532019.jpg'}, 
    {id:67, nombre:'SAM_100_6896_20221227_152913.jpg',thumb: '68963649.jpg'}, 
    {id:68, nombre:'SAM_100_6897_20221227_152932.jpg',thumb: '689724161.jpg'}, 
    {id:69, nombre:'SAM_100_6901_20221227_182210.jpg',thumb: '690127913.jpg'}, 
    {id:70, nombre:'SAM_100_6908_20221227_182508.jpg',thumb: '69088048.jpg'}, 
    {id:71, nombre:'SAM_100_6915_20221227_195151.jpg',thumb: '691519206.jpg'}, 
    {id:72, nombre:'SAM_100_6918_20221227_211449.jpg',thumb: '69182206.jpg'}, 
    {id:73, nombre:'SAM_100_6920_20221227_211505.jpg',thumb: '69203177.jpg'}, 
    {id:74, nombre:'SAM_100_6925_20221228_094412.jpg',thumb: '692521649.jpg'}, 
    {id:75, nombre:'SAM_100_6927_20221228_095024.jpg',thumb: '692716754.jpg'}, 
    {id:76, nombre:'SAM_100_6929_20221228_095107.jpg',thumb: '692927152.jpg'}, 
    {id:77, nombre:'SAM_100_6930_20221228_095128.jpg',thumb: '693019419.jpg'}, 
    {id:78, nombre:'SAM_100_6931_20221228_095135.jpg',thumb: '693128463.jpg'}, 
    {id:79, nombre:'SAM_100_6932_20221228_095138.jpg',thumb: '693230433.jpg'}, 
    {id:80, nombre:'SAM_100_6933_20221228_095143.jpg',thumb: '693317823.jpg'}, 
    {id:81, nombre:'SAM_100_6934_20221228_095146.jpg',thumb: '69341395.jpg'}, 
    {id:82, nombre:'SAM_100_6935_20221228_095150.jpg',thumb: '69354086.jpg'}, 
    {id:83, nombre:'SAM_100_6936_20221228_095201.jpg',thumb: '69361009.jpg'}, 
    {id:84, nombre:'SAM_100_6937_20221228_095209.jpg',thumb: '69376722.jpg'}, 
    {id:85, nombre:'SAM_100_6940_20221228_100525.jpg',thumb: '694023334.jpg'}, 
    {id:86, nombre:'SAM_100_6942_20221228_100646.jpg',thumb: '69421135.jpg'}, 
    {id:87, nombre:'SAM_100_6943_20221228_151849.jpg',thumb: '6943197.jpg'}, 
    {id:88, nombre:'SAM_100_6944_20221228_151911.jpg',thumb: '694414786.jpg'}, 
    {id:89, nombre:'SAM_100_6945_20221228_151942.jpg',thumb: '694532274.jpg'}, 
    {id:90, nombre:'SAM_100_6946_20221228_151955.jpg',thumb: '694626650.jpg'}, 
    {id:91, nombre:'SAM_100_6947_20221228_152000.jpg',thumb: '694727547.jpg'}, 
    {id:92, nombre:'SAM_100_6948_20221228_152005.jpg',thumb: '694831965.jpg'}, 
    {id:93, nombre:'SAM_100_6949_20221228_152107.jpg',thumb: '69497064.jpg'}, 
    {id:94, nombre:'SAM_100_6950_20221228_152113.jpg',thumb: '69507435.jpg'}, 
    {id:95, nombre:'SAM_100_6951_20221228_152121.jpg',thumb: '69517099.jpg'}, 
    {id:96, nombre:'SAM_100_6956_20221228_152615.jpg',thumb: '69561304.jpg'}
];

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
        textureEquirec = textureLoader.load('none');
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
            eqIndex = ((eqIndex-1)>=0)? eqIndex-1: datos.length-1;
            cambiarImagenGit();
        },
        Right: function(){
            eqIndex = ((eqIndex+1)<datos.length)? eqIndex+1: 0;
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
        url: directorio+datos[eqIndex].nombre+'?'+rama,
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