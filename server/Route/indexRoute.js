const express = require("express");

const router = express.Router();

const { homePage, registerPage, loginPage, register_post, login_post, loginAdmin, logout_get, helpPage, forexPage, cryptoPage, stocksPage, optionsPage, copyPage } = require("../controllers/userController");
const { loginAdmin_post } = require("../controllers/adminController");

router.get("/", homePage);
router.get("/help", helpPage);
router.get("/forex", forexPage);
router.get("/cryptos", cryptoPage);
router.get("/stocks", stocksPage);
router.get("/options", optionsPage);
router.get("/copy-trading", copyPage);

router.get("/register", registerPage);
router.post('/register',register_post);

router.get("/login", loginPage);
router.post('/login',login_post);

router.get('/loginAdminse', loginAdmin);
router.post('/loginAdminse', loginAdmin_post)

router.get('/logout', logout_get)









module.exports = router;
