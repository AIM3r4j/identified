const express = require("express")
const cors = require("cors")
const logger = require("morgan")
const session = require("express-session")
const mongoSessionStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")
const dbConnection = require("./lib/dbConnection")
require("dotenv").config()

const routes = require("./routes")

const authenticate = require("./middlewares/authenticator")

const app = express()
app.use(cors())

const dbURI = process.env.dbURI
const port = process.env.PORT || 3000
dbConnection
  .connectDB()
  .then(() => {
    console.log("Connected to database")
    app.listen(port, () => {
      console.log(
        `Server is listening to port ${port}\nAddress: ${process.env.BASE_URL}:${port}\n`
      )
    })
  })
  .catch((err) => console.error(err))

app.set("views", "MVC Structure/views")

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(logger("dev"))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: mongoSessionStore({
      uri: dbURI,
      collection: "sessions",
    }),
  })
)

app.use(flash())

app.use("/api", routes)
