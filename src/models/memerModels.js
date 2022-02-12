const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
// inmport modules
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const memberSchema = new Schema({

    // _id : "ofkgvbf'lkvb'f;l"
     member_id: {
         type : String,
         required : true,
         unique : true
        // ห้ามฟิวส์นี้เป้นค่า Null
     },
     name: {
         type : String,
         required:true
     },
     password: {
        type : String,
        required:true
    },
     group: {
        type : String,
        required:true
    },
     address: {
        type : String,
        required:true
    },
    phoneNumber: {
        type : String,
        required:true
    },
    // ประเภท
     type:{
         name:{
             type : String,
             required:true
         },
         daycan_borrow :{
             type : Number,
             required:true
         }
     }
},{
    timestamps:true
});

memberSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
memberSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}                                 //datamี่เราจะเอาเข้ารหัส  ตัวไข     วันหมดอายุ
memberSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("Member", memberSchema);
memberSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});