const Borrow = require("../models/borrowModels");

exports.borrowBook = async(req, res) => {
    try {
        let borrow = new Borrow(req.body);
        // borrow.dueDate = new Date().setDate(new Date() + 7);
        let createdBorrow = await borrow.save();

        //กำหนด data ของ dueDate แล้วค่อยเอาไป update หลังจากที่ insert แล้ว
        let dDate = new Date(createdBorrow.borrowDate)
        // =======================================================================
        // การหาจำนวนวัน อาจารย์บอกทริคเพิ่มเติม
        // let member = Member.find({member_id: createdBorrow.Borrow.member_id});
        // ===============================================================
        let data = { 
            //เพิ่มวันตามประเภทสมาชิก
            dueDate : dDate.setDate(dDate.getDate()+120)    
        };
        //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow saved",
                        data: result
                    });
                });
        });
    } catch (error) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

// คืนหนังสือ = แก้ไข borrow โดยเพิ่มฟิลด์ returnedDate โดยเก็บวัน/เวลาปัจจุบัน
exports.returnBook = async(req, res) => {
    let data = { 
        returnedDate : new Date(),
        receiver: req.body.receiver
    }; 
    Borrow.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Borrow.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return book saved",
                        data: result
                    });
                });
        });
};

// Search ประวัติการยืมตามรหัสสมาชิก
exports.getBorrowDataByMember = async (req, res) => {
    let member_id = req.params.id;
    console.log(member_id);
    Borrow.find({ "borrower.member_id": member_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

// Search ประวัติการยืมตามรหัสหนังสือ
exports.getBorrowDataByBook = async (req, res) => {
    let book_id = req.params.id;
    console.log(book_id);
    Borrow.find({ "book.book_id": book_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

// exports.borrowBook02 = async(req, res)=>{
//     try {
//         //Find member
//         let member = Member.find({ member_id: req.body.member_id });
//         let book = Book.find({ book_id: req.body.book_id });
//         let lender = Staff.find({ staff_id: req.body.staff_id });

//         let borrow = new Borrow({
//             borrower: {
//                 member_id: member.member_id,
//                 name: member.name
//             },
//             book:{
//                 book_id: book.book_id,
//                 name: book.name
//             },
//             lender:{
//                 staff_id: lender.staff_id,
//                 name: lender.name
//             }
//         });
//         let createdBorrow = await borrow.save();
//         //นอกนั้นทำเหมือนเดิม
//         let data = { 
//             //เพิ่มวันตามประเภทสมาชิก เปลี่ยน 120 เป็น member.dayCanborrow
//             dueDate : dDate.setDate(dDate.getDate()+ 120)    
//         };
//         //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
//         Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
//             Borrow.findById(createdBorrow._id)
//                 .exec((err, result)=>{
//                     res.status(200).json({
//                         msg: "Borrow savedeeeeeeeee",
//                         data: result
//                     });
//                 });
//         });
//     } catch (error) {
//         // if there is an error, it will jump to here
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     }
// };

