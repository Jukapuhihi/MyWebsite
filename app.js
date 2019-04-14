const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const session = require("express-session");


const app = express();
//body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secretKey"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

//static folder
app.use("/static", express.static(__dirname + "/public"));

const controllers = require(__dirname + "/apps/controllers");
app.use(controllers);


const host = config.get("server.host");
const port = config.get("server.port");

app.listen(port, host, function(){
    console.log("Server is running on port ", port);
});