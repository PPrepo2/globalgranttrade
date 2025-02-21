const express = require('express');
// const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/userController');


// image upload
// var storage = multer.diskStorage({
//     destination: function(req, res, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req, file,cb){
//         cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
//     }
// })

// var upload = multer({
//     storage: storage,
// }).single("image");



router.get('/dashboard',userController.dashboardPage);
router.get('/payment',userController.paymentPage);

router.get('/accounthistory/:id',userController.accounHistoryPage);
router.get('/referuser',userController.referralPage);

router.get('/account-settings/:id',userController.accountPage);
router.post('/account-settings/:id',userController.accountPage_post);



router.get('/buy-plan',userController.buyPlanPage);
router.post('/buy-plan/:id',userController.buyPlanPage_post);

router.get('/myplans/:id',userController.myPlanPage);

router.get('/support',userController.supportPage);


router.get('/deposits', userController.depositPage);
router.post('/deposit/:id', userController.depositPage_post);

router.get('/withdrawals',userController.widthdrawPage);
router.post('/widthdraw/:id',userController.widthdrawPage_post);
router.get('/withdrawal-history/:id',userController.widthdrawHistory);


// router.get('/buyCrypto', userController.buyCrypto)

module.exports = router;

