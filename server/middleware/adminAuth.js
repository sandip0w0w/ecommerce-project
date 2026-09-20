const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    try{
        const token  = req.session?.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "No Token Found"});
        }
        const tokenDecode  = jwt.verify(token, process.env.JWT_SECRET);

        const isAdmin = tokenDecode.role == "ADMIN" &&
                        tokenDecode.email == process.env.ADMIN_EMAIL;
        
        if(!isAdmin){
            return res.status(401).json({message: "Not Authorized To Access This Resource"});
        }
        next()
    }catch(error){
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

module.exports = adminAuth;