const { securerPassword, CompassPassword } = require('../middleware/auth');
const Users=require('../model/authModel')
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken')

/*
     * @Method Get (reg) 
     * @Description To show register page
*/
const reg = (req, res) => {
    res.render('user/register',{
        title:"register page"
    })
}
/*
     * @Method Post (register) 
     * @Description For user register
*/
const USerCreatRegister=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body
        const chek=await Users.findOne({email})
        if(chek){
            return res.redirect('/Register')
        }
        const hasspass=await securerPassword(password)
        const users=new Users({
            name,email,phone,password:hasspass
        })
       const saveuser=await users.save()
       if(saveuser){
        return res.redirect('/login')
       }
        
    //     const chek=await Users.findOne({email})
    //     if(chek){
    //         res.redirect('/Register')
    //     }
    //     const haspass=await securerPassword(password)
    //     const users=new Users({
    //         name,email,PhoneNo,password:haspass
    //     })
    //    const saveuser=await users.save()
    //    if(saveuser){
    //     res.redirect('/login')
    //    }

    }catch(error){
        console.log(error)
    }
}
/*
     * @Method Get (log) 
     * @Description To show login page
*/
const log = (req, res) => {
    res.render('user/login',{
        title:"login page",
    })
}
/*
     * @Method (authCheck) 
     * @Description For Authentic user 
*/
const UserChek=(req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.redirect('/login')
    }
}

/*
     * @Method Post (login) 
     * @Description For user login
*/
const USerCreatLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const chek=await Users.findOne({email})
        if(!chek){
            return res.redirect('/login')
        }else{
            if(chek.status==true){
                const hasspass=await CompassPassword(password,chek.password)
                if(!hasspass){
                    return res.redirect('/login')
                }
                const token=jwt.sign({
                    _id:chek._id,
                    name:chek.name,
                    email:chek.email
                },process.env.SECRETE_KEY,{expiresIn:'12h'})
                if(token){
                    res.cookie('userToken',token)
                    res.redirect('/')
                }
            }
        }
 
    }catch(error){
        console.log(error)
    }
}

/*
     * @Method get (logout) 
     * @Description For user logout
*/
const logout = (req, res) => {
    res.clearCookie("userToken")
    return res.redirect('/login')
}

module.exports = {
    reg,
    log,
    USerCreatRegister,
    USerCreatLogin,
    UserChek,
    logout
}