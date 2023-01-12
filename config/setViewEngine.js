const express = require('express');

const configViewEngine = (app)=>{
    app.use(express.static('./public'))//các file trong folder public sẽ được công khai và người dùng có thể nhìn thấy nội dung bên trong file này
    // Cấu hình file ejs, tất cả các file ejs sẽ nằm trong thư mục views và chịu trach nhiệm hiển thị nội dung qua file này
    app.set('view engine','ejs');
    app.set('views','./views');
}

module.exports = {configViewEngine};