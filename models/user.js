const mongoose = require('mongoose');

const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
    },

    div: {
        type: String,
        enum: ["A", "B", "C"],
        required: true
    },

})


userSchema.pre('save', async function  (){

    try {
        const User = this

        // hash the password only if it has  been modified ( or is new)


        if (!User.isModified('password')) return;


        // hash password generation

        const salt = await bcrypt.genSalt(10);



        const hashedPassword = await bcrypt.hash(User.password, salt);

        // overide the plain password with the hashed one

        User.password = hashedPassword;

       
    }
    catch (err) {

       console.log(err);

        res.status(500).json({ error: 'Internal server error' })

    }


})


userSchema.methods.comparePassword = async function (candidatePassword) {

    try {

        //use bcrypt to compare the provided password with the hashed password 

        const isMatch = await bcrypt.compare(candidatePassword, this.password);

        return isMatch;
    }

    catch (err) {
        throw err;

    }

}







const User = mongoose.model('User', userSchema);
module.exports = User;