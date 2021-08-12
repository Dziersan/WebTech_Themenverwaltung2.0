const redirect = require("../index");
const app = express();


router.post("/createTable", (request, response) => {

  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("CREATE TABLE IF NOT EXISTS " + request.body.tablename + "requirement "
      + "(ID VARCHAR(50), "
      + "Name VARCHAR(50), "
      + "Shortdesc LONGTEXT)",
      function (err) {
        if (err)
          throw err;
      });
  response.end();
});

router.post("/saveReqData", (request, response) => {

  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("INSERT INTO requirements (id,name,short_desc,start_time,end_time) VALUES("
      + '"' + request.body.id + '",'
      + '"' + request.body.name + '",'
      + '"' + request.body.shortdesc + '",'
      + '"' + request.body.starttime + '",'
      + '"' + request.body.endtime + '")',
      function (err) {
        if (err)
          throw err;
      });
  response.end();
});

router.post("/delReqData", (request, response) => {
  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("DELETE FROM requirements WHERE("
      + 'id="' + request.body.id + '")',
      function (err) {
        if (err)
          throw err;
      });
  response.end();
});

router.get("/loadtable", (request, response) => {
  console.log("Test Console Log3")
  connection.query("SELECT * FROM requirements ", function (err, result, fields) {
    if (err)
      throw err;
    else {
      console.log(result);
    }
  })
});

module.exports = router;
