const Staff = require('../models/staffModels');

exports.getStaff = async (req, res) => {
    Staff.find()      
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addStaff = async(req , res)=>{
    try {
        let staff = new Staff({
            staff_id:req.body.staff_id,
            name:req.body.name,
            address:req.body.address,
            phoneNumber:req.body.phoneNumber,

        });
        //fields password in html hass password first
        staff.password = await staff.hashPassword(req.body.password);

        let createStaff = await staff.save();

        res.status(200).json({
            msg:"Add Staff OK",
            data: createStaff
        });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
}

exports.login = async (req,res) => {
    const login = {
        staff_id: req.body.staff_id,
        password: req.body.password
    }
    // console.log(login)
    try {
        let staff = await Staff.findOne({
            staff_id: login.staff_id
        });
        // console.log(user);
        //check if user exit
        if (!staff) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }

        let match = await staff.compareUserPassword(login.password, staff.password);
        if (match) {
            let token = await staff.generateJwtToken({
                staff
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: staff
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.updateStaff = async (req,res)=>{
    // req.params.id = id ของ staff 
    // req.body = ข้อมูล staff ที่จะ update
    let staff = {
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };
    Staff.findByIdAndUpdate(req.params.id,staff)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Staff.findById(req.params.id)
        .exec((err,data)=>{
            data.password = "";
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.deletestaff = async (req, res) => {
    Staff.findByIdAndDelete(req.params.id)      
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
