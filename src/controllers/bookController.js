const Book = require('../models/bookModels');

exports.getBook = async (req, res) => {
    Book.find()      
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addBook = async(req , res)=>{
    try {
        let book = new Book({
            book_id:req.body.book_id,
            title:req.body.title,
            author:req.body.author,
            publisher:req.body.publisher,
            price:req.body.price
        });
        let createbook = await book.save();

        res.status(200).json({
            msg:"Add Book OK",
            data: createbook
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
    }

    exports.updateBook = async (req,res)=>{
        let book = {
            title:req.body.title,
            author:req.body.author,
            publisher:req.body.publisher,
            price:req.body.price
        };
        Book.findByIdAndUpdate(req.params.id,book)
        .exec((err,data)=>{
            // findById อีกรอบเพื่อเอา data ใหม่
            Book.findById(req.params.id)
            .exec((err,data)=>{
                data.password = "";
                res.status(200).json({
                    msg: "OK",
                    data: data
                });
            });
        });
    };
    
    exports.deletebook = async (req, res) => {
        Book.findByIdAndDelete(req.params.id)      
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
    
