const AdminModel=require('../model/authModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { securerPassword ,CompassPassword} = require('../middleware/auth')


// ****admindashbord*******//
const Admindashboard = (req, res) => {
    res.render('admin/dashboard', {
        title: "dashboard page",
        data:req.admin,
    })
   
}
const Testimonals = (req, res) => {
    //console.log('done'),
    res.render('admin/testimonals', {
        title: "testimonal page",
        data:req.admin,
    })
}

// ***********registerpage******//
const AdminRegisterPage=async(req,res)=>{
    try{
        res.render('admin/register')
    }catch(error){
        console.log(error)
    }

}
// ********admin creat register********//
const AdminCreatRegister=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body
        const chek=await AdminModel.findOne({email})
        if(chek){
            res.redirect('/admin/register')
        }else{
            const hasspas=await securerPassword(password)
            const admin=new AdminModel({
                name,email,phone,password:hasspas,
                isAdmin:true
            })
           const saveadmmin=await admin.save()
           if(saveadmmin){
            res.redirect('/admin')
           }
            console.log(admin)
        }
        

    }catch(error){
        console.log(error)
    }
}
// **loginpagge********//
const AdminLoginPage=async(req,res)=>{
    try{
        res.render('admin/login')
    }catch(error){
        console.log(error)
    }
}
// ************creatlogin*********//
const AdminCreatLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const chek=await AdminModel.findOne({email})
        if(!chek){
            return res.redirect('/admin')
        }else{
            if(chek.isAdmin==true){
                const hasspass=await CompassPassword(password,chek.password)
                if(!hasspass){
                    return res.redirect('/admin')
                }
                const token=jwt.sign({
                    _id:chek._id,
                    name:chek.name,
                    email:chek.email
                },process.env.SECRETE_KEY,{expiresIn:'12h'})
                if(token){
                    res.cookie('adminToken',token)
                    res.redirect('/admin/dashbord')
                }
            }else{
                return res.redirect('/admin')
            }
        }
 
    }catch(error){
        console.log(error)
    }
}

// **********adminchek**********//
const AdminChek=(req,res,next)=>{
    if(req.admin){
        next()
    }else{
        return res.redirect('/admin')
    }

}
// **********adminlogout*******//
const AdminLogout=(req,res)=>{
    res.clearCookie('adminToken')
    res.redirect('/admin')
}




module.exports = {
    AdminRegisterPage,
    AdminLoginPage,
    AdminCreatRegister,
    Admindashboard,
    AdminCreatLogin,
    AdminChek,
    AdminLogout,
    Testimonals
}