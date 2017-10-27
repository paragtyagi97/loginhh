var User = require('../Models/user');

module.exports = function(router){
     //doctor basic registeration http://localhost:port/api/users
    router.post('/users', function(req, res){
        var user = new User();
        user.username= req.body.username;
        user.password= req.body.password;
        user.email= req.body.email;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
            res.send('Ensure username, email and password were provided');
        } else {
        user.save(function(err){
            if (err) {
                res.send('Username or email already exists!');
            } else {
                res.send('user created');
            }
        });
    }
        
    }); 
      //doctors login http://localhost:port/api/authenticate
    router.post('/authenticate', function(req, res){
        User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
            if (err) throw err;
            if(!user) {
                res.json({success: false,mesage: 'Could not authenticate user'});
            } else if(user) {
                if(req.body.password) {
              var validPassword =  user.comparePassword(req.body.password); }
               else {
                res.json({success: false,mesage: 'No password provided'});
               }
              if(!validPassword) {
                  res.json({success: false, message: 'Could not authenticate password'});
              } else {
                res.json({success: true, message: 'user authenticated'});
              }
            
            }
        });
    });
   

    return router;   
};




 