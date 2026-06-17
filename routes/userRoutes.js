const express = require('express');

const router = express.Router();

const User = require('../models/user');

const {jwtAuthMiddleware,generatetoken} = require('./../jwt');

router.post('/signup', async (req, res) => {

    try {

        const data = req.body;

        const newuser = new User(data);

        const response = await newuser.save();

        console.log("data saved")

        const payload ={
            id:response.id,
            name:response.name
        }
        console.log(JSON.stringify(payload));

        const token = generatetoken(payload);

        console.log('token is',token);


        return res.status(201).json({ response:response,token:token})
    }

    catch (err) {


        console.log(err);

        res.status(500).json({ error: 'Internal server error' })
    }


})






router.post('/login', async (req, res) => {


    try {


        const {name , password}=req.body;

        const founduser = await User.findOne({name:name})

        if(!founduser || !(await founduser.comparePassword(password) ) ){

            return res.status(401).json({error:'invalid username or password'})
        }


        const payload = {

            id:founduser.id
            // name=user.name
        }

        const token = generatetoken(payload);

        res.json({token});
    }
    catch (err) {

        console.log(err);

        res.status(500).json({ error: 'Internal server error' })
    }

})





router.get('/', jwtAuthMiddleware ,async (req, res) => {

    try {
        const response = await User.find();

        console.log("data saved")

        res.status(200).json({ response })

    }

    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.get('/profile',jwtAuthMiddleware,async(req,res)=>{

    try{

        const userId = req.user.id;

        const founduser = await User.findById(userId);

        if(!founduser){
            return res.status(401).json({error:'user not found'})
        }

        res.status(200).json({founduser});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})

router.get('/:sms', async (req, res) => {

    try {

        const sms = req.params.sms;

        if (sms == 'A' || sms == 'B' || sms == 'C') {

            const response = await User.find({ div: sms })

            console.log('data saved');

            res.status(200).json({ response });

        }

        else {

            res.status(404).json({ error: 'internal div error' })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})



router.put('/:id', async (req, res) => {

    try {


        const userId = req.params.id;

        const updateduserdata = req.body;


        const response = await User.findByIdAndUpdate(userId, updateduserdata, {

            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json({ error: 'user not found' })
        }

        console.log('data saved');

        res.status(200).json({ response })
    }


    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})



router.delete('/:id', async (req, res) => {

    const userId = req.params.id;

    const response = await User.findByIdAndDelete(userId);

    if (!response) {
        res.status(404).json({ error: 'user not found' })
    }

    console.log('data deletd');

    
    res.status(200).json({ response })

})

module.exports = router;