const express = require('express');

const router = express.Router();

const Message = require('../models/message');

const { jwtAuthMiddleware, generatetoken } = require('./../jwt');



router.post('/send', jwtAuthMiddleware, async (req, res) => {
    try {

        const sender = req.user.id;
        const {receiver, message } = req.body;

        const newMessage = new Message({
            sender,
            receiver,
            message
        });

        const response = await newMessage.save();

        res.status(201).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.get('/:receiverid', jwtAuthMiddleware, async (req, res) => {

    try {

        console.log("req.user =", req.user);

        const sender = req.user.id;

        const receiver = req.params.receiverid


        const message = await Message.find({

            $or: [
                {
                    sender,
                    receiver
                },
                {
                    sender: receiver,
                    receiver: sender
                }
            ]


        }).sort({
            createdAt: 1
        })
        res.status(200).json({ message });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }


})



router.get('/conversations/all', jwtAuthMiddleware, async (req, res) => {

    try {

        const userId = req.user.id;


        const conversations = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })

            .populate('sender', 'name')
            .populate('receiver', 'name')
            .sort({ updatedAt: -1 });

        res.status(200).json(conversations);
    }

    
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})



router.put('/seen/:messageId',jwtAuthMiddleware,async(req,res)=>{

    try{


        const message = await Message.findByIdAndUpdate(
            req.params.messageId,

            {seen:true},
            {new:true}
        )

        res.status(201).json(message)
    }
     catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router;

