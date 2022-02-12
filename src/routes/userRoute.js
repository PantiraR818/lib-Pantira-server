const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post("/register", userController.register);
router.post("/login", userController.login);

// ต้องการให้ไฟล์อื่น ใช้งานด้วย
module.exports = router;