const app = require('../Module_app_mysql_pool/app');
const router = require('../routes/G4-0050');
app.use(router);

const router1 = require('../routes/G4-0100');
app.use(router1);

const router2 = require('../routes/G4-0200forStudents');
app.use(router2);

const router3 = require('../routes/G4-02000600');
app.use(router3);

const router4 = require('../routes/G4-0700');
app.use(router4);

const router7 = require('../routes/G4-0300');


const router5 = require('../routes/G4-0800');
app.use(router5);

//const router6 = require('../routes/G4-0900');
//app.use(router6);


const router7 = require('../routes/G4-0300');
app.use(router7);

module.exports = router;
app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/G4-0200forStudent');

});

