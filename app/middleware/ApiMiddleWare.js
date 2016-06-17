var jwt = require('jsonwebtoken');
var config = require('../../config');

function ApiMiddleWare(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token,config.secret,function (err,decode) {
            if (err){
                res.json({success: false ,message:'Failed to auth token'})
            }else {
                req.decoded = decode;
                next();
            }
        })
    }else {
        return res.status(403).send({
            success: false,
            message: 'No token provide'
        })
    }
}

module.exports = ApiMiddleWare;