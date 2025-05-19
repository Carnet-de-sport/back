require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./graphql/schema");
const jwtAuth = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI =>", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.body &&
    req.body.query &&
    (req.body.query.includes("register") || req.body.query.includes("login"))
  ) {
    return next();
  }
  jwtAuth(req, res, next);
});

app.use(
  "/graphql",
  express.json(),
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: {
      user: req.user,
    },
  }))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
