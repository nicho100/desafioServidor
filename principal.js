class contenedor{
    constructor(archivo){
        this.archivo=archivo
        
    }

    crear(){
    
    fs.writeFileSync(this.archivo,"[]")
    
    }
    save(object){
        //traer el contenido del archivo y preguntar si tiene algo,si no se pone objet id en 1
        //si hay contenido se recorre y se guarda el id del ultimo y se le suma uno y al objeto.id se le asigna lo guardado
       let path=this.archivo
    
        async function leer(){
            try{
              const contenido= await fs.promises.readFile(path,'utf-8')
              
              let info =JSON.parse(contenido)
                    
              let mayor=0
              for(let i = 0;i <info.length;i++){
              if (info[i].id>mayor){
                      mayor=info[i].id
              }}
              object["id"]=mayor+1
              info.push(object)
              fs.writeFileSync(path,JSON.stringify(info,null,2))
              return mayor+1
            }
            catch(err){
                console.log("error de lectura",err)
            }
        }
        const retornar=async()=>{
            const ret= await leer()
          return ret   
        }
        return retornar()
    }
    getbyid(number){
        let resultado=null
        async function leer(){
            try{
              const contenido= await fs.promises.readFile(path,'utf-8')
              let bandera=0
              let info= JSON.parse(contenido)
              for(let i = 0;i <info.length;i++){
              if (info[i].id==number){
                  resultado = info[i]
                  
                  bandera=1
                    }  } 
              if (bandera===0){
                  resultado=null
                  console.log("no se encontro el elemento")   
              }
              
              return resultado
              
            }
            catch(err){
                console.log("error de lectura",err)
            }
        }
        const retornar=async()=>{
            const ret= await leer()
            
            return ret   
        }
        return ( retornar())  
    }//funciona
    getAll(){
        
    async function leer(){
    try{
      const contenido= await fs.promises.readFile(path,'utf-8')
      let info=JSON.parse(contenido)
      
      
      return info
    }
    catch(err){
        console.log("error de lectura",err)
    }
}
const retornar=async()=>{
    const ret= await leer()
  return ret   
}
return retornar()
       
    }//funciona
    deleteById(number){
        let info=""
        
        fs.readFile(this.archivo,'utf-8',(error,contenido)=>{
            if (error){
                console.log("no se pudo leer el archivo")
            }else{
                info =JSON.parse(contenido)
                console.log(info)
                let bandera=-1
                for(let i = 0;i <info.length;i++){
                    if (info[i].id===number){
                        info.splice(i,1)
                        bandera=1
                        fs.writeFileSync(this.archivo,JSON.stringify(info,null,2))
                        console.log(info)
                          }
                } if (bandera===-1){
                    console.log("el elemento no se encuentra en el archivo")
                    }
            }
        }) 
    }//funciona
    deleteAll(){
        fs.readFile(this.archivo,'utf-8',(error,contenido)=>{
            if (error){
                console.log("no se pudo leer el archivo")
            }else{ 
               let info =JSON.parse(contenido)
               console.log(info)
                info.splice(0,info.length)
                fs.writeFileSync(this.archivo,JSON.stringify(info,null,2))
                console.log(info)
            }
        })
    }//funciona

}


const express=require('express')
const fs=require('fs')
const path='./productos.txt'
const app= express()

let productos=[
    {
        Title: "Xbox Series x",
        price: 500,
        link: "url1",
        id: 1
        
    },
    {
        title: "Playstation 5",
        price: 550,
        link: "url2",
        id: 2
    },
    {
        title: "computadora",
        price: 700,
        link: "url3",
        id: 3  
    }
]

app.get('/productos',function(req,res){
    res.send(productos)
   
})


app.get('/productoRandom',function(req,res){
    const contenido=  fs.readFile(path,'utf-8')
    console.log(contenido)        
              
    let numeroRandom= Math.floor(Math.random() * productos.length);
    res.send(productos[numeroRandom])
    
})

app.listen(8080)

