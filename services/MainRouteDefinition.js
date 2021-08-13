
const routerModuleOver = require('./moduleOverview');
app.use(routerModuleOver);
const routerprensentationDataP = require('./presentationDateProf');
app.use(routerprensentationDataP);
const routerGroupOrder = require('./groupOrder');
app.use(routerGroupOrder);
const routerLiveTrackingP = require('./liveTrackingProf');
app.use(routerLiveTrackingP);
const routerPresenDateOverview = require('./presentationDateOverview');
app.use(routerPresenDateOverview);
const routerPresentationOverview = require('./presentationOverview');
app.use(routerPresentationOverview);
const routerInquiryDozent = require('./inquiryDozent');
app.use(routerInquiryDozent);
const routerCreatePresenDateP = require('./createPresentationDatesProf');
app.use(routerCreatePresenDateP);
const routerDozentMessage = require('./dozentmessage');
app.use(routerDozentMessage);

module.exports = function LoadRoutes(app)
{










}
