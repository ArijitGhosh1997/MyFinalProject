const express = require ('express');
const ejs = require ('ejs');
const path = require ('path');
const flash  = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser=require('body-parser')
const cors=require('cors')
const databaseConnection = require ('./config/databaseConnect')


const dotEnv = require('dotenv')
dotEnv.config();

databaseConnection()

const app = express ();

app.use(express.static(path.join(__dirname,'public')));
//set View engine
app.set('view engine', 'ejs');
//set View folder
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret:"arijit",
    cookie:{
        maxAge:50000
    },
    resave:false,
    saveUninitialized:false
}))



//require route for acess the route folder 
const router = require('./router/userRoute'); 
app.use(router); 
const Adminrouter = require('./router/adminRoute'); 
app.use(Adminrouter);


//HTTP Connections
/*const portNo = 9000;
  app.listen(portNo, () => {
  console.log(`Server running at port ${portNo}`);
});*/
/*const dbDriver="mongodb+srv://arijitg508:4PmBDJQDMLvbh6p1@arijitcluster.bn8zrjc.mongodb.net/Mentor"
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(PORT,()=>{
        console.log(`server running port : http://localhost:${PORT}`);
        console.log(`Db connected successfully`);
    })
}).catch(error=>{
    console.log(error);
})*/


//Database Connection
const PORT = process.env.PORT ||9000;
app.listen(PORT, () => {
    console.log(`server is running at http://localhost: ${PORT}`);
})
