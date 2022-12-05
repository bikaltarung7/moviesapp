const jwt = require('jsonwebtoken')

exports.getToken = function (payload) {
    payload.date = Date.now();
    let token = jwt.sign(payload, process.env.SECRETKEY)
    return token;
}

exports.verifyToken = function (req, res, next) {
    let token;
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        token = bearerToken
    }

    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if(err){
            res.status(403).json({message:'Authorization failed'});
            return;
        }
        next();
    })
}