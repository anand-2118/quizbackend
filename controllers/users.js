const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const register = async(req,res)=>{

    try{
        const {name,email,password,confirmPassword} = req.body;
        if(!name || !email || !password || !confirmPassword){
            console.log("please fill all the fields")
            return res.status(400).send("please fill all the fields");
        }
    
        const isUserExist = (await User.findOne({email}));
       //OR  const isUserExist = await User.findOne({ $or: [{ email }, { mobile }] });

        if (isUserExist){
            console.log('user already exist')
            return res.status(400).send("user already exists")
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = new User({
            name,
            email,
            password:hashedPassword, 
        });
        await newUser.save();
        console.log('user registed successfully')
        res.status(201).send('user registed successfully')
    }catch{
        // next(err)
    }
    
};
const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Please fill all the details");
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid email or password");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid email or password");
      }
  
      const token = jwt.sign({ userId: user._id }, "secret", {  // Corrected to user._id
        expiresIn: "240h",
      });
  
      res.status(200).json({
        token,
        userId: user._id,  // Corrected to user._id
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  };
  

// const allUsers = async (req,res,next)=>{
//     try{
//         const {email,password} = req.body
//         if(!email || !password){
//             return res.status(400).send("please fill all the deatils");

//         }
//         if(email==="admin@backend.com" &&  password === "admin"){
//             const users = await User.find();
//             return res.status(200).json(users);
//         }
//         else{
//             return res.status(400).send("invalid email or password");
//         }
//     } catch(err){
//         next(err);
//     }
// }

module.exports={register,login};