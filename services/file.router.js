module.exports = (app, router, upload) => {
    const fileWorker = require('./file.controller.js');

    let path = global.__basedir  ;
    const express = require('express');

    router.use((req, res, next) => {
        next();
    });

    app.post('/api/files/upload', upload.array("uploadfile"), fileWorker.uploadFile);

    app.get('/api/files/getall', fileWorker.listAllFiles);

    app.get('/api/files/:filename', fileWorker.downloadFile);

    //app.use('/upload_G3', router);


    app.use('/404', (req, res) => {
        res.sendFile(path + "/view/html/404.html");
    });
}