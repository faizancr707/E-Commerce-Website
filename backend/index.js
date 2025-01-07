const port =4000;
 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');


app.use(express.json());
app.use(cors());

//iDrOKCco7s2vqIKr
//mongoose connection with mongodb
mongoose.connect("mongodb+srv://smongojob1:<db_password>@cluster0.ylxi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//API Creation
app.get('/',(req,res)=>{
    res.send('Express is running');
})


//image storage engine
 const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

//creating upload endpoint images
app.use('/images',express.static('upload/images'));

app.post('/upload',upload.single('product'),(req,res)=>{
res.json({
    success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})

    const Product = mongoose.model("Prodeuct",{
        id:{
            type:number,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        category:{
            
                type:string,
                required:true,
            
        },
        new_price:{
            type:number,
            required:true,
        },
        old_price:{
            type:number,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now,

        },
        available:{
            type:Boolean,
            default:true
        }
    })

    //creating api for delete 
app.post('/removeproduct',async(req,res)=>{
    await product.findOneandDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})


app.post('/add-product',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.old_price,
        old_price:req.body.old_price,

    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success : true,
        "name":req.body.name,

    })

})    

//creating api for getting all product
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})
//schema creating for a user model

const Users = mongoose.model('Users',{
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
        type : Object,
    },
    date : {
        type : Data,
        default : Date.now,
    }
})
//creating endpoint for registering the user 
app.post('/signup',async(req,res)=>{
    let check = await  Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,erros:"Existing user found with same email addresses"});
      }
      let cart = {};
      for( let i=0;i<300;i++)
      {
        cart[i]=0;
      }
      const user = new Users({
        name : req.body.email,
        email : req.body.email,
        password : req.body.password,
        cartData : cart
      })
      await user.save();
      const data = {
        user : {
            id : user.id,
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success : true,token});

})

//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:false,token});
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"wrong email Id"})
    }
})

//creating endpoint for new collection data
app.get('/newcollectioned', async(req,res)=>{
    let products = await Product.find({});
    let newcollection = product.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let product  = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women Fetched");
    res.send(popular_in_women);
});

//creating middleware to fetch user
    const fetchUser = async(req,res,next) =>{
        const token = req.header('auth-token');
        if(!token){
            res.status(400).send({errors:"Please authenticate using valid token"});
        }
        else{
            try{
                const data = jwt.verify(token,'secret_com');
                req.user = data.user;
                next();
            } catch(error){
                res.status(401).send({error:"please authenticate a valid token"});
            }
        }
    }


//creating endpoint for adding products in cartdata
app.post('/addtocart',async(req,res)=>{
        console.log("Added",req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Added");
})
//creating endpoint for remove products in cartData
app.post('/removefromcart',async(req,res)=>{
    console.log("removed",req.body.itemId);
            let userData = await Users.findOne({_id:req.user.id});
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
            res.send("removed");
    })
    //creating endpoint to get cartData
    app.post('/getcart',fetchUser,async(req,res)=>{
        console.log('GetCart');
        let userData = await Users.findOne({_id:req.user.id});
        res.join(userData.cartData);
    })

app.listen(port,(error)=>{
    if(!error){
        console.log('server running on port 4000');
    }else{
        console.log('Error '+error);
    }
})