const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.get("/", bookController.getBook);

router.post("/addbook",bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deletebook);

module.exports = router;