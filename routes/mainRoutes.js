const express = require("express")
const router = express.Router()
const  {ensureAuth, ensureGuest} = require("../middleware/ensureAuth")
const userAuth = require("../controller/userAuth")



router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/dashboard", ensureAuth, async(req, res)=>{
  try {
    const user = req.user
    res.render('dashboard', {user: user})
  } catch (error) {
    console.log(error)
    res.send("page in progress")
  }
})

                                    

router.get("/signup", userAuth.getSignup)

router.post("/login", userAuth.postLogin)

router.post("/signup", userAuth.postSignup)

router.get("/logout", userAuth.logout)


module.exports = router