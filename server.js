const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const path = require("path");

const app = express();

//Allow cross origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

// ---------------------------------------- for cloud deployment
app.use(express.static("public"));

app.get("*", (req, res) => {
  //serving the react's index.html for all routes except for graphql server
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// -----------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
