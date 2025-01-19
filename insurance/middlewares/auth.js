const jwt = require('jsonwebtoken');//untuk mengimport library jsonwebtoken

const auth = (req, res, next) => {//membuat middleware auth
    const token = req.header('Authorization');//mengambil token dari header
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});//respon jika tidak ada token
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {//verifikasi token
        if(err) {
            return res.json({message: "Invalid Token"});
        }
        next();//melanjutkan ke fungsi berikutnya
    });
}

module.exports = auth;