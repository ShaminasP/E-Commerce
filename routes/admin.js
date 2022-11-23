const express = require("express");
const {
  homeView,
  loginView,
  viewOrders,
  addProducts,
  viewClients,
  adminLogout,
  blockUser,
  unblockUser,
  viewCategory,
} = require("../controllers/adminController");

const { adminLogin } = require("../controllers/authController");
const {
  adminAddProduct,
  productsView,
  editProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  editCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/productController");
const { upload } = require("../middleware/multer");

const router = express.Router();

router.get("/", homeView);

router.get("/login", loginView);

router.get("/product", productsView);

router.get("/orders", viewOrders);

router.get("/addproduct", addProducts);

router.get("/clients", viewClients);

router.get("/editproduct/:id", editProduct);

router.get("/deleteproduct/:id", deleteProduct);

router.get("/logout", adminLogout);

router.get("/blockuser/:id", blockUser);

router.get("/unblockuser/:id", unblockUser);

router.get("/category", viewCategory);

router.get("/editcategory/:id", editCategory);

router.get("/deletecategory/:id", deleteCategory);

//post methods

router.post("/login", adminLogin);

router.post("/addproduct", upload.array("Image", 4), adminAddProduct);

router.post("/editproduct/:id", upload.array("Image", 4), updateProduct);

router.post("/category", upload.array("Image", 3), addCategory);

router.post("/editcategory/:id", upload.array("Image",3),updateCategory);

module.exports = router;
