
const router = require('../routes/G4-0050');
const router1 = require('../routes/G4-0100');
const router2 = require('../routes/G4-0200forStudents');
// const router3 = require('../routes/G4-02000600');
const router4 = require('../routes/G4-0700');
const router5 = require('../routes/G4-0800');
/*const router6 = require('../routes/G4-0900');*/
// const router7 = require('../routes/G4-0300');


module.exports = function LoadRoutes(app)
{

    app.use(router);
    app.use(router1);
    app.use(router2);
    // app.use(router3);
     app.use(router4);
     app.use(router5);
    /*app.use(router6);*/
    // app.use(router7);
}
