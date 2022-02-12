// const { type } = require('express/lib/response');
// const Member = require('../models/memerModel');

// exports.getMember = async (req, res) => {
//     Member.find()      
//         .exec((err, result) => {
//             res.status(200).json({
//                 msg: "OK",
//                 data: result
//             });
//         });
// };

// exports.addmember = async(req , res)=>{
//     try {
//         let member = new Member({
//             member_id:req.body.member_id,
//             name:req.body.name,
//             group:req.body.group,
//             address:req.body.address,
//             phoneNumber:req.body.phoneNumber,
//             type : {
//                 name : req.body.name,
//                 daycan_borrow : req.body.daycan_borrow
//             }
//         });
//         Member.password = await member.hashPassword(req.body.password);
//         let createmember = await member.save();

//         res.status(200).json({
//             msg:"Add Member OK",
//             data: createmember
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error:error
//         });
//     }
//     };

// // exports.login = async (req,res) => {
// //     const login = {
// //         member_id: req.body.member_id,
// //         password: req.body.password
// //     }
// //     // console.log(login)
// //     try {
// //         let member = await member.findOne({
// //             member_id: login.member_id
// //         });
// //         // console.log(user);
// //         //check if user exit
// //         if (!member) {
// //             res.status(400).json({
// //                 type: "Not Found",
// //                 msg: "Wrong Login Details"
// //             })
// //         }

// //         let match = await member.compareUserPassword(login.password, member.password);
// //         if (match) {
// //             let token = await member.generateJwtToken({
// //                 member
// //             }, "secret", {
// //                 expiresIn: 604800
// //             })

// //             if (token) {
// //                 res.status(200).json({
// //                     success: true,
// //                     token: token,
// //                     userCredentials: member
// //                 })
// //             }
// //         } else {
// //             res.status(400).json({
// //                 type: "Not Found",
// //                 msg: "Wrong Login Details"
// //             })
// //         }
// //     } catch (err) {
// //         console.log(err)
// //         res.status(500).json({
// //             type: "Something Went Wrong",
// //             msg: err
// //         })
// //     }
// // }

// // exports.updatemember = async (req,res)=>{
// //     // req.params.id = id ของ staff 
// //     // req.body = ข้อมูล staff ที่จะ update
// //     let member = {
// //         name:req.body.name,
// //         group:req.body.group,
// //         address:req.body.address,
// //         phoneNumber:req.body.phoneNumber,
// //     };
// //     Member.findByIdAndUpdate(req.params.id,member)
// //     .exec((err,data)=>{
// //         // findById อีกรอบเพื่อเอา data ใหม่
// //         Member.findById(req.params.id)
// //         .exec((err,data)=>{
// //             data.password = "";
// //             res.status(200).json({
// //                 msg: "OK",
// //                 data: data
// //             });
// //         });
// //     });
// // };

// // exports.deletemember = async (req, res) => {
// //     Member.findByIdAndDelete(req.params.id)      
// //         .exec((err)=>{
// //             if(err){
// //                 res.status(500).json({
// //                     msg: err
// //                 });
// //             } else{
// //                 res.status(200).json({
// //                     msg: "Delete complete"
// //                 });
// //             }
// //         });
// // };