const {verify, decode} = require('jsonwebtoken')
const secret = '#$@^%#^@%#$%&^' //disini secretnya harus sama dengan yang di authroization nya (modul export login)

module.exports={
    checkToken: (req, res,next)=>{
        let token = req.get("authorization") //mengmbil authroization yang ada di postman itu

        if(token){
            let wow = token.slice(7) //memisahkan dr inputannya (explode-php) 
                                    // 7 nya ini, startnya dari 7 (karakter token)
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
