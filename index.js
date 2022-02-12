// ไปหยิบไฟล์ config.env ที่เก็บ URI PORT และ HOSTNAME
require('dotenv').config({path:'./config.env'});

// ตัวแปรที่เก็บmodules ของ express ไปใช้
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4001


const staffRoute = require("./src/routes/staffRoute");
const bookRoute = require("./src/routes/bookRoute");
const borrowRoute = require("./src/routes/borrowRoute");
const userRoute = require("./src/routes/userRoute");
// const memberRoute = require("./src/routes/memberRoute");

//จำเป็นมาก ต้องใส่
const app = express();  
app.use(cors());
app.use(bodyParser.json());

// ดึงค่า config ใน db.js มาใข้ในapp 
require("./db")(app);

// =======================================

app.use("/staff", staffRoute);
app.use("/borrow", borrowRoute);
// app.use("/member", memberRoute);
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/",(req, res)=>{
    res.send("Hello from library");
});

app.get("/login",(req, res)=>{
    res.send("Hello from login");
});

app.post("/register",(req, res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    res.send("Hello from register");
});

app.listen(port,()=>{
    console.log("App is running on port " + port);
});