//guarda en el cache dinamico

const actualizaCacheDinamico= async (dynamicCache, request, response)=>{

    if( response.ok ){

        let cache = await caches.open(dynamicCache)

        await cache.put(request, response.clone())

        return response.clone();
        
    }else{
        //si llega aca, no viene nada, no se puede hacer mucho mas
 
        return response
    }

}