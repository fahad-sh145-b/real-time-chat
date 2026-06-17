const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // first check request header has authorization or not


    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ error: 'Token not found' })
    }


    // Extract the jwt token from the request headers

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' })
    }



    try {

        //verify the jwt token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }


}



//function to generate token


const generatetoken = (userData) => {

    //generate a new token using user 

    return jwt.sign(userData, process.env.JWT_SECRET);


}



module.exports = { jwtAuthMiddleware, generatetoken };















