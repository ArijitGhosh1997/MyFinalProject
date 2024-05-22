const jwt= require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserSchema = require ('../model/authModel')


/*
     * @Method securerPassword
     * @Description Password Hashing
*/
const securerPassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10)
        return passwordHash

    } catch (error) {
        console.log(error.message);
    }
}
// *******compayarpass******//
const CompassPassword = async (password,salt) => {
    try {
        const compass = await bcryptjs.compare(password, salt)
        return compass

    } catch (error) {
        console.log(error.message);
    }
}
/*
     * @userauthchek
     * @user auth chek
*/
const UserAuthChek=(req,res,next)=>{
    if(req.cookies||req.cookies.userToken){
        jwt.verify(req.cookies.userToken,process.env.SECRETE_KEY,(err,data)=>{
            req.user=data
            next()
        })

    }
    else{
        next()
    }
}

/*
     * @Admin
     * @Admin token veryfi
     * 
*/
const AdminAuthChek=(req,res,next)=>{
    if(req.cookies||req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,process.env.SECRETE_KEY,(err,data)=>{
            req.admin=data
            next()
        })

    }
    else{
        next()
    }
}


module.exports={
    securerPassword,
    CompassPassword,
    UserAuthChek,
    AdminAuthChek
}
