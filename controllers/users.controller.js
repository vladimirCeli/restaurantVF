const usersCtrl={}

usersCtrl.redenderSignUpForm = (req,res) =>(
    res.render('registrarse')
);

usersCtrl.signup = (req,res) => {
    // res.send('signup')
        console.log(req.body)
        res.send('recived')
    // const errors = []
    // const {names,surnames,cedula,dir,email,phone} = req.body
    // if(names.length < 4){
    //     errors.push({text: "no vale tu vrg"})
    // }
    // if(errors.length>=0)
    //     res.render('registrarse',{
    //         errors              
    //     })
    // else
    //     res.send('envio exitoso')
};

usersCtrl.renderSigninForm = (req,res) =>(
    res.render('login')
);

usersCtrl.signin = (req,res) => (
    res.send('login')
);

usersCtrl.logout = (req,res) => (
    res.send('logout')
);

 module.exports = usersCtrl;