const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const Signal = require("../Model/signal");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };








module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.helpPage = (req, res)=>{
  res.render("help")
  }

  module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
  
    module.exports.cryptoPage = (req, res)=>{
      res.render("crypto")
      }
    
    module.exports.copyPage = (req, res)=>{
        res.render("copy-trading")
    }

    module.exports.forexPage = (req, res)=>{
      res.render("forex")
  }


  module.exports.copyPage = (req, res)=>{
    res.render("copy-trading")
}

 module.exports.optionsPage = (req, res)=>{
        res.render("options")
    }

    module.exports.policyPage = (req, res)=>{
      res.render("policy")
  }

  module.exports.stocksPage = (req, res)=>{
    res.render("stocks")
}

module.exports.stocksPage = (req, res)=>{
  res.render("stocks")
}


module.exports.termPage = (req, res)=>{
  res.render("term")
}

    module.exports.loginAdmin = (req, res) =>{
        res.render('loginAdmin');
    }
    
    const sendEmail = async ( fullname, email,  password ) =>{
    
        try {
          const transporter =  nodemailer.createTransport({
            host: 'mail.globalflextyipsts.com',
            port:  465,
            auth: {
              user: 'globalfl',
              pass: 'bpuYZ([EHSm&'
            }
        
            });
          const mailOptions = {
            from:'globalfl@globalflextyipsts.com',
            to:email,
            subject: 'Welcome to GLOBALFLEXTYIPESTS',
            html: `<p>Hello  ${fullname},<br>You are welcome to   Globalflextyipests, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.
      
            Please note that your deposit is with the wallet address provided by   Globalflextyipests trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Globalflextyipests, hence your deposit is invalid.<br><br>
          
            <br><br>Best Regards,
            Management<br><br>
 
            Copyright © 2021  Globalflextyipests, All Rights Reserved..<br><br>
            Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              console.log(error);
              res.send('error');
          }else{
              console.log('email sent: ' + info.response);
              res.send('success')
          }
      })
      
      
        } catch (error) {
          console.log(error.message);
        }
      }
      
      module.exports.registerPage = (req, res)=>{
        res.render("register")
      }
      

  

module.exports.register_post = async (req, res) =>{
    const {username,fullname, email,tel,refid, country, password } = req.body;
    try {
        const user = await User.create({username,fullname, email,tel,refid, country, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}
const loginEmail = async (  email ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:'globalfl@globalflextyipsts.com',
        to:email,
        subject: 'Your account has recently been logged In',
        html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
       if it's not you kindly message support to terminate access  <br>You can login here: https://globalflextyipests.com/login.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  

  module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}

module.exports.paymentPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('payment',{infoErrorsObj,infoSubmitObj});
}


module.exports.accounHistoryPage = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id).populate("deposits")
  res.render('accounthistory',{user});
  } catch (error) {
    console.log(error)
  }
}

module.exports.referralPage = async(req, res) =>{
  res.render('referuser');
}

module.exports.buyPlanPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('buy-plan',{infoErrorsObj,infoSubmitObj});
}

module.exports.buyPlanPage_post = async(req, res) =>{

  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {  
      req.flash('infoSubmit', 'User not found!')
            return res.status(404).json({ error: 'User not found' });
         }

         if (user.balance === 0 ) {
                req.flash('infoSubmit', 'Insufficient balance!')
                res.redirect('/buy-plan')
          }else{
            const signal = await Signal.create({
              plan: req.body.plan,
              Plan_Price: req.body.Plan_Price,
              Profit: req.body.Profit,
              Duration: req.body.Duration,
              Bonus: req.body.Bonus,
              status: req.body.status,
             });
        // Proceed with withdrawal
         user.Signal.push(signal)
             await user.save();
        req.flash('infoSubmit', 'Your Plan is under review.')
        res.render("myplans",{user})
       
          }
  } catch (error) {
    console.log(error)
  }
}


module.exports.myPlanPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id).populate("Signal")
  try {
     res.render("myplans",{user})
  } catch (error) {
      console.log(error)
  }
}


module.exports.supportPage = async(req, res) =>{

  res.render("support")
}


module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('account-settings',{user,infoErrorsObj,infoSubmitObj})
}

module.exports.accountPage_post = async(req, res) =>{
       try {
    await User.findByIdAndUpdate(req.params.id,{
      username: req.body.username,
      fullname: req.body.fullname,
      tel: req.body.tel,
      email: req.body.email,
      country: req.body.country,
      bank_name: req.body.bank_name,
      account_name: req.body.account_name,
      account_no: req.body.account_no,
      swiftcode: req.body.swiftcode,
      btc_address: req.body.btc_address,
      eth_address: req.body.eth_address,
      ltc_address: req.body.ltc_address,
      usdt_address: req.body.usdt_address,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
      await res.redirect(`/account-settings/${req.params.id}`);
      
      console.log('redirected');
  } catch (error) {
    console.log(error);
  }

}




module.exports.depositPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("deposits",{infoErrorsObj,infoSubmitObj})
}

module.exports.depositPage_post = async(req, res) =>{
  // const {type, amount, status, image, narration} = req.body
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
      const deposit = new Deposit({
          type: req.body.type,
          amount: req.body.amount,
          status: req.body.status,
           image: newImageName,
          narration: req.body.narration
      })
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();
      req.flash('infoSubmit', 'deposit successful awaiting approval')
      res.render("accounthistory",{user})
      // if(user){
      //     depositEmail(req.body.type, req.body.amount, req.body.narration)
          // req.flash('success_msg', 'your deposit is successful')
      // }else{
      //     console.log(error)
      // }
  } catch (error) {
      console.log(error)
  }

}


module.exports.widthdrawPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("withdraw-funds",{infoErrorsObj,infoSubmitObj})
}


module.exports.tradePage = async(req, res)=>{
  res.render("trades")
}

module.exports.referPage = async(req, res)=>{
  res.render("refer")
}

module.exports.premiumPage = async(req, res)=>{
  res.render("invest")
}


  
const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Widthdrawal Just Made',
        html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
        deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://globalflextyipests.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  
  })
  } catch (error) {
      console.log(error.message);
    }
  }
   
  module.exports.widthdrawPage_post = async(req, res) =>{
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (!user) {  
        req.flash('infoSubmit', 'User not found!')
              return res.status(404).json({ error: 'User not found' });
           }

           if (user.balance === 0 ) {
                  req.flash('infoSubmit', 'Insufficient balance!')
                  res.redirect('/withdrawals')
            }else{
              const widthdraw = await Widthdraw.create({
                amount: req.body.amount,
                type: req.body.type,
                status: req.body.status,
                narration: req.body.narration
               });
          // Proceed with withdrawal
           user.widthdraws.push(widthdraw)
               await user.save();
          req.flash('infoSubmit', 'Your widthdrawal is under review.')
          res.render("withdrawal-history",{user})
          // if(user){
          //      widthdrawEmail(req.body.amount,req.body.type, req.body.narration )
          //    }else{
          //       console.log(error)
          //     }
            }
    } catch (error) {
      console.log(error)
    }
  
  }



  module.exports.widthdrawHistory = async(req, res) =>{
    const id = req.params.id
      const user = await User.findById(id).populate("widthdraws")
       res.render("withdrawal-history",{user})
  }
  

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}




