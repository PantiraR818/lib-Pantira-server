const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
// inmport modules
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    // ผูัยืม
    borrower: {
        member_id: String,
        name: String
    },
    // ข้อมูลBook
    book: {
        book_id: String,
        name: String,
        author: String
    },
    borrowDate: { type: Date, default: Date.now },
    // การคำนวณ borrowdate
    dueDate: Date,
    lender: {
        staff_id: String,
        name: String
    },
    receiver:{
        staff_id: String,
        name: String
    },
    // วันที่และเวลาที่รับคืน
    returnedDate: Date
}, { timestamps: true });

// export Product Schema to be usable in other components
module.exports = mongoose.model("Borrow", borrowSchema);
