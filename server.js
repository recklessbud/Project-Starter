const express = require("express")
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')
const morgan = require("morgan")
const flash = require("connect-flash")
const MethodOverride = require("method-override")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")


const apps = express()


apps.use(cors())
apps.use(express.json())
apps.use(express.urlencoded({extended: "true"}))
