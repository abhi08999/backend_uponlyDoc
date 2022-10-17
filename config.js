
const sql = require("mssql/msnodesqlv8");

const dbconfig = {
  driver: "msnodesqlv8",
  server: "ABHIPREM",
  database: "uponlyDoc",
  options: {
    trustedConnection: true,
    useUTC: true,
    
  },

};

const con = sql.connect(dbconfig).then(function() {

  console.log(`Database connection successful!`);
  
  }).catch(function(err) {
  console.log(`Database connection ${err}!`);
  
  });
var pool = function(){
    
   return new sql.Request();
}


module.exports = {
  sql,pool
}
