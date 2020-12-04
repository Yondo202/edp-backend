const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
var morgan = require("morgan");
const errorHandler = require("./middleware/error");
const cors = require("cors");
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });
const db = require("./config/db-mysql");
const injectDb = require("./middleware/injectDb");
const logger = require("./middleware/logger");

// Router оруулж ирэх
const productsRoutes = require("./routes/products.js");
const companiesRoutes = require("./routes/companies");
const business_sectorRoutes = require("./routes/business_sector");
const userRoutes = require("./routes/users");
const countryRoutes = require("./routes/countries");
const occupationRoutes = require("./routes/occupations");
const locationRoutes = require("./routes/locations");
const questionRoutes = require("./routes/questions");
const questionDetailRoutes = require("./routes/questiondsetails");
const questionresultRoutes = require("./routes/questionresults");

const app = express();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// Body parser
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/products", productsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/business-sector", business_sectorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/occupations", occupationRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/question-details", questionDetailRoutes);
app.use("/api/question-check", questionresultRoutes);

app.use(errorHandler);

db.sequelize
  .sync()
  .then((result) => {
    console.log("sync hiij table-uud uusgelee...");
  })
  .catch((err) => console.log(err));

const server = app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} порт дээр аслаа!!!`)
);
