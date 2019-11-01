var elasticsearch = require("elasticsearch");

// var client = new elasticsearch.Client({
//   hosts: ["http://localhost:9200"]
// });

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });



/* Delete index */
client.indices.delete({
  index: 'aiassistregion',
}).then(function(resp) {
  console.log("Successful query!");
  console.log(JSON.stringify(resp, null, 4));
}, function(err) {
  console.trace(err.message);
});