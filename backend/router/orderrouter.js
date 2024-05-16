const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const{newOrder, getsingleorder, myOrders, getAllOrders,deleteOrder, updateOrders}=require("../controller/ordercontorller")
const router = express.Router();

   router.route("/order/create").post(isAuthenticatedUser,newOrder);
   router.route("/order/:id").get(isAuthenticatedUser,getsingleorder)
  router.route("/orders/me").get(isAuthenticatedUser,myOrders);
  router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
 router.route("/admin/deleteorders/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);
router.route("/admin/updateorder/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders);
  
   
module.exports = router;
