/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express")

/////////////////////////
// The Application Object
/////////////////////////
const app = express()







/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
      response: "Hello World 2"
  })
})









/////////////////////////
// Listener
/////////////////////////

app.listen(4040, () => console.log("Listening on port 4040"))