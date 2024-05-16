const express = require("express");
const router = express.Router();
const {createproduct,getproduct,updateproducts,deleteProduct,getproductdetails, creatProductReview, getProductreviews,delteteReviews, getadminproduct} = require("../controller/productcontoller");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
 router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"), createproduct)
 router.route("/getproductall").get(getproduct);
 router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getadminproduct)
 router.route("/productdetails/:id").get(getproductdetails)
 router.route("/admin/productupdate/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateproducts)
 router.route("/admin/productdelete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
 router.route("/review").put(isAuthenticatedUser,creatProductReview)
router.route("/getallproductreview").get(isAuthenticatedUser,getProductreviews);
 router.route("/deleteReviews").delete(isAuthenticatedUser,delteteReviews);
 module.exports = router;
