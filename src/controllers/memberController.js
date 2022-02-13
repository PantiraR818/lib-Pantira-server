const Member = require('../models/memerModels');

exports.getMember = async (req, res) => {
    Member.find()      
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addmember = async(req , res)=>{
    try {
        let member = new Member({
            member_id:req.body.member_id,
            name:req.body.name,
            group:req.body.group,
            address:req.body.address,
            phoneNumber:req.body.phoneNumber,
            type : req.body.type
        });
        member.password = await member.hashPassword(req.body.password);
        let createmember = await member.save();

        res.status(200).json({
            msg:"Add Member OK",
            data: createmember
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
    };

exports.updatemember = async (req,res)=>{
    // req.params.id = id ของ staff 
    // req.body = ข้อมูล staff ที่จะ update
    let member = {
        name:req.body.name,
        group:req.body.group,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,
    };
    Member.findByIdAndUpdate(req.params.id,member)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Member.findById(req.params.id)
        .exec((err,data)=>{
            data.password = "";
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.deletemember = async (req, res) => {
    Member.findByIdAndDelete(req.params.id)      
        .exec((err)=>{
            if(err){
                res.status(500).json({
                    msg: err
                });
            } else{
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};