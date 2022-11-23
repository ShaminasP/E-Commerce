const express = require("express");
const {
  userHome,
  contactsView,
  userProductsDetails,
  wishList,
  viewShoppingCart,
  viewLogin,
  userSignup,
  userProducts,
  userLogout,
  otp,
} = require("../controllers/userController");

const {
  userRegister,
  userLogin,
  userOtp,
} = require("../controllers/authController");

const {addToCart}= require("../controllers/productController")
const { sessionCheck } = require("../middleware/middleware");

const router = express.Router();

router.get("/", userHome);

router.get("/login", viewLogin);

router.get("/signup", userSignup);

router.get("/products", userProducts);

router.get("/contacts", contactsView);

router.get("/shoppingcart/", sessionCheck, viewShoppingCart);

router.get("/productsdetails/:id", userProductsDetails);

router.get("/wishlist",sessionCheck, wishList);

router.get("/logout", userLogout);

router.post("/signup", userRegister);

router.post("/login", userLogin);

router.get("/otp", otp);

router.post("/otp", userOtp);

//add to cart
router.get("/shopping-cart/:id", sessionCheck, addToCart);

module.exports = router;
