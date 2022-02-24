const {verify, decode} = require('jsonwebtoken')
const secret = '#$@^%#^@%#$%&^' //disini secretnya harus sama dengan yang di controllernya nya (modul export login)

module.exports={
    checkToken: (req, res,next)=>{
        let token = req.get("authorization") //mengmbil authroization yang ada di postman itu
        // barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTY0NTU3NzY1OH0.s5F7e8X0iipjoQWMrWfmXCe1RtiYZFiHARbpwimbI50

        if(token){
            let wow = token.slice(7) //memisahkan dr inputannya (explode-php) 
                                    // 7 nya ini, startnya dari 7 (karakter token) ini slice 7 karena mau ngambik tokennya saja
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTY0NTU3NzY1OH0.s5F7e8X0iipjoQWMrWfmXCe1RtiYZFiHARbpwimbI50
            verify(wow, secret, (err, decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message: "login first",
                        err
                    })
                }else{
                    let user = decoded.result
                    next()
                }
            })
        }else{
            res.json({
                success:0,
                message: "Access Denied : unauthorized user"
            })
        }
    }
}
//hasil token : 
//header berisi informasi tentang algoritma dan jenis token yang digunakan
//payload berisi data yang ingin dirimkan melalui token berupa data user
//signature adalah hash gabungan dari header payload dan sebuah secret key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTY0NTU3NzY1OH0.s5F7e8X0iipjoQWMrWfmXCe1RtiYZFiHARbpwimbI50