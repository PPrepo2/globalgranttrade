const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
    },
    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
  
    country:{
        type: String
    },
    postal:{
        type:String,
        default: "postal code"
    },
   address:{
    type:String,
    default:"your address"
   },
    city:{
        type:String,
        default: "your city"
    },
    account:{
        type: String,
        default:"Basic"
    },
    password:{
        type: String,
    },

    
    btc_add:{
        type: String,
        default:"Loading"
    }, 

    
    eth_add:{
        type: String,
        default:"Loading"
    }, 

    
    usdt_add:{
        type: String,
        default:"Loading"
    }, 

    image:{
        type: String,
    }, 
    balance:{
        type: Number,
        default: 0
    },
    total_profit:{
        type: String,
        default: "$0.00"
    },
    ref_bonus:{
        type: String,
        default: "$0.00"
    },
    total_deposit:{
        type: String,
        default: "$0.00"
    },
    total_width:{
        type: String,
        default: "$0.00"
    },
    refNumb:{
        type: String,
        default: "0"
    },
    refid:{
        type: String,
        default: "0"
    },
    bank_name:{
        type: String,
        default:"your bank name"
    },
    account_name:{
        type: String,
        default:"your account name"
    },
    account_no:{
        type: String,
        default: "your account number"
    },
    swiftcode:{
        type:String,
        default: "Your swift code"
    },
    btc_address:{
        type: String,
        default: "Your Bitcoin address"
    },
    eth_address:{
        type:String,
        default:"Your Ethereum address"
    },
    ltc_address:{
        type: String,
        default:"Your litecoin address"
    },

    usdt_address:{
        type: String,
        default: "Your Usdt Address"
    },

    pending:{
        type: String,
        default: "$0.00"
    },
    verifiedStatus:{
        type: String,
        default: 'Account not yet Verified!'
    },
    bonus:{
        type: String,
        default: "$0.00"
    },
    widthdrawBalance:{
        type: String,
        default: "$0.00"
    },
    profit:{
        type: String,
        default: "$0.00"
    },

    lastDeposit:{
        type: String,
        default: "$0.00"
    },

    totalDeposit:{
        type: String,
        default: "$0.00"
    },

    totalWidthdraw:{
        type: String,
        default: "$0.00"
    },
    verifiedStatus:{
        type: String,
        default: 'Account not yet Verified!'
    },
    Signal: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'signal'
    },
    insurances: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'insurance'
    },
    upgrades: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'upgrade'
    },
    verified:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'verify'
    },
   
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
