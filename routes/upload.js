const express = require('express');
const router = express.Router();
const multer = require('multer');

let upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function(req, file, cb) {
            console.log(file)
            var changedName = (new Date().getTime()) + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});

//单个文件上传
router.post('/single', upload.single('recfile'), (req, res) => { //注意这个recfile  在前端上传时，input的name同样要写这个，才行。
    res.json({
        code: '0',
        type: 'single',
        originalname: req.file.originalname,
        path: req.file.path
    })
});

//多个文件上传
router.post('/multer', upload.array('multerFile'), (req, res) => {
    console.log(req.files);
    let fileList = [];
    req.files.map((elem) => {
        fileList.push({
            originalname: elem.originalname
        })
    });
    res.json({
        code: '0',
        type: 'multer',
        fileList: fileList
    });
});

module.exports = router;