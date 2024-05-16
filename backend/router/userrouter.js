const express = require("express");
const { register, loginuser, logout,forgotPassword,resetPassword, getUserDetails, updatePassword,updateprofile, getAlluser, getSingleuser,updateroles, deleteuser } = require("../controller/usercontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/registers", register);
router.post("/login", loginuser);
router.post("/forgotpassword", forgotPassword); // Uncomment this if needed

router.put("/password/reset/:resettoken",resetPassword)
router.get("/logout", logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateprofile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAlluser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleuser);
router.route("/admin/users/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateroles)
router.route("/admin/deleteuser/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteuser);
module.exports = router;
