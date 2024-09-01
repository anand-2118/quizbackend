const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/users')


router.get("/",(req,res)=>{
    console.log("Reached GET /api/auth"); // Add this line

    res.status(200).send("Auth Route")
});

router.post('/register',register);
router.post('/login',login);
// router.get('/all',allUsers)

module.exports = router;