const express = require("express")
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')
const morgan = require("morgan")
const flash = require("connect-flash")
const MethodOverride = require("method-override")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")

const connectDB = require("./config/database")
const mainRoutes = require("./routes/mainRoutes")
const googleRoutes = require("./routes/googleAuth")

require("dotenv").config({path: "./config/.env"})

require("./config/passport")

const apps = express()
 
const PORT = process.env.PORT || 7070

connectDB()
 
apps.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
    })
)
 


apps.use(cors())
apps.use(express.json())
apps.use(express.urlencoded({extended: "true"}))
apps.set("view engine", "ejs")
apps.use(express.static("public"))



if(process.env.NODE_ENV === "development"){
    apps.use(morgan("dev"))
}

apps.use(flash())
apps.use(passport.initialize())
apps.use(passport.session())


apps.use("/", mainRoutes)
apps.use("/auth", googleRoutes)

apps.listen(PORT, ()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
})