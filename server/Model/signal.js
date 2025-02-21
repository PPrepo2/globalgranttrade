
const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
    plan:{
        type: String,
    },
    Plan_Price:{
        type: Number,
    },
    Profit:{
        type: String,
        default:"Loading"
    },
    Duration:{
        type: String,
        default: "7 Days"
    },
    Bonus:{
        type: String,
         default: "$0"
    },
    
    status:{
        type:String,
        default: "pending"
    },

},{timestamps:true})

const Signal = mongoose.model("signal", signalSchema )

module.exports = Signal;
