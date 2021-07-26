module.exports = (app, router, upload) => {
    const fileWorker = require('./file.controller.js');

    var path = __basedir ;
    const express = require('express');

    router.use((req, res, next) => {
        next();
    });

    app.get("/upload_G3", (req, res) => {
        res.sendFile(path + "/view/html/upload_G3.html");
    });
    app.get("/admin_G3", (req, res) => {
        res.sendFile( path+ "/view/html/admin_G3.html");
    });

    app.get("/student_G3", (req, res) => {
        res.sendFile( path+ "/view/html/student_G3.html");
    });

    app.post('/api/files/upload', upload.array("uploadfile"), fileWorker.uploadFile);

    app.get('/api/files/getall', fileWorker.listAllFiles);

    app.get('/api/files/:filename', fileWorker.downloadFile);

    //app.use('/upload_G3', router);

    app.use('/404', (req, res) => {
        res.sendFile(path + "/view/html/404.html");
    });
}