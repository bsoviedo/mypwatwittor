 //imports
importScripts('js/sw-utils.js') 

const STATIC_CACHE= 'static-v1';
const DYNAMIC_CACHE= 'dynamic-v1';
const INMUTABLE_CACHE=  'inmutable-v1'

const APP_SHELL= [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
];

const APP_SHELL_INMUTABLE = [
    'css/animate.css',
    'js/libs/jquery.js',  
]




self.addEventListener('install',  (e)=>{

    const saveCaches = async()=>{
        const cacheStatic = await caches.open( STATIC_CACHE )
        
        const cacheInmutable = await caches.open( INMUTABLE_CACHE )

        return Promise.all([cacheStatic.addAll(APP_SHELL) ,
                            cacheInmutable.addAll(APP_SHELL_INMUTABLE)])

    }

    e.waitUntil(saveCaches())

})


self.addEventListener('activate',  (e)=>{

   const respuesta = async()=>{
        let res= await caches.keys()

        res.forEach((key)=>{
                if(key !== STATIC_CACHE && key.includes('static')){
                    return caches.delete(key)
                }
            })

   }
   e.waitUntil(respuesta()) 
}) 


self.addEventListener('fetch', (e)=>{

     const respuesta = async(e)=>{
        let res = await caches.match(e.request)

        if(res){
            console.log(res)
            return res
        }else{
            //si se llega aca, no tenemos data

            let networkResponse =  await fetch(e.request)
             
            return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, networkResponse)// desde el sw.utils
        }

    }

    e.respondWith(respuesta(e)) 
}) 