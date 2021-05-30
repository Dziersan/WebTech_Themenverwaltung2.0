module.exports = (app, router, upload) => {
    const fileWorker = require('C:\\Users\\Julia\\IdeaProjects\\WebTech_Themenverwaltung2.0\\Gruppe_3_Bereitstellung_Abgabe\\app\\controllers\\file.controller.js');

    var path = __basedir + '/views/';

    router.use((req, res, next) => {
        next();
    });

    app.get('/', (req, res) => {
        res.sendFile(path + "index.html");
    });

    app.post('/api/files/upload', upload.array("uploadfile"), fileWorker.uploadFile);

    app.get('/api/files/getall', fileWorker.listAllFiles);

    app.get('/api/files/:filename', fileWorker.downloadFile);

    app.use('/', router);

    app.use('*', (req, res) => {
        res.sendFile(path + "404.html");
    });
}