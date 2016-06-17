var express = require('express');
var app = express();
var apiRouter = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var config = require('../../config');
var ApiMiddleWare = require('../middleware/ApiMiddleWare');


apiRouter.post('/auth',function (req,res) {
    User.findOne({
        name: req.body.name
    },function (err,user) {
        if (err) throw err;
        if (!user){
            res.json({success: false,message:'Auth failed ,User not found'});
        }else if (user){
            if (user.password != req.body.password){
                res.json({success: false,message: 'Auth failed , Wrong password'});
            }else {
                console.log('secret:',config.secret);
                console.log('user',user);
                var token = jwt.sign(user, config.secret,{
                    expiresIn: '10h'
                });
                res.json({success: true, message:'Enjoy your token', token: token})
            }
        }
    })
});

apiRouter.use(ApiMiddleWare);

apiRouter.get('/',function (req,res) {
   res.json({message :'Welcome to api '});
});

apiRouter.get('/users',function (req,res) {
    User.find({},function (err,users) {
        res.json(users);
    })
});


module.exports = apiRouter;
