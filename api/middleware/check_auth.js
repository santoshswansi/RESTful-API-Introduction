const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try{

        var token = req.headers.authorization;
        token = token.split(" ")[1];

        // verify + decode the JWT
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        
        // setting userData = decodedToken jwt key
        req.userData = decodedToken;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: "Auth failed!"
        });
    }

};