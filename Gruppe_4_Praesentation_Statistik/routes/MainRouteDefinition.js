
const router = require('../routes/moduleOverview');
const router1 = require('../routes/presentationDateProf');
const router2 = require('../routes/groupOrder');
const router3 = require('../routes/liveTrackingProf');
const router4 = require('../routes/presentationDateOverview');
const router5 = require('../routes/presentationOverview');
const router6 = require('../routes/inquiryDozent');
const router7 = require('../routes/createPresentationDatesProf');
const router8 = require('../routes//dozentmessage');


module.exports = function LoadRoutes(app)
{

    app.use(router);
    app.use(router1);
    app.use(router2);
    app.use(router3);
     app.use(router4);
     app.use(router5);
    app.use(router6);
    app.use(router7);
     app.use(router8);
}
