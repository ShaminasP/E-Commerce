const Products = require("../model/productModel");
const carts = require("../model/cartModel");
const cart = require("../model/cartModel");
const userHome = (req, res) => {
  res.render("user/home");
};

const viewLogin = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("user/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userSignup = (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("user/signup");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const contactsView = (req, res) => {
  try {
    res.render("user/contacts");
  } catch (error) {
    console.log(err);
  }
};

const userProducts = async (req, res) => {
  try {
    Products.find().then((products) => {
      res.render("user/view-products", { products });
    });
  } catch (error) {
    console.log(error.message);
  }
};

//productsdetails
const userProductsDetails = async (req, res) => {
  try {
    const ID = req.params.id;
    Products.findById(ID).then((productDetails) => {
      res.render("user/product-details", { productDetails });
    });
  } catch (error) {
    console.log(error.message);
  }
};

const wishList = (req, res) => {
  try {
    res.render("user/wish-lists");
  } catch (error) {
    console.log(error.message);
  }
};

//cart list
const viewShoppingCart = async (req, res) => {
  try {
    const ID = req.session.user._id;
    cart.findOne({user:ID})
    .populate("bucket.products")
    .then((item) => {
      console.log('heee');
      
      console.log(item);
      console.log('looo');
      
      console.log(item.bucket);
      res.render("user/shopping-cart",{item:item.bucket});
    });
  } catch (error) {
    console.log(error.message);
  }
};

const otp = (req, res) => {
  try {
    res.render("user/otp");
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = (req, res) => {
  try {
    req.session.user = false;
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  userHome,
  contactsView,
  userProductsDetails,
  wishList,
  viewShoppingCart,
  viewLogin,
  userSignup,
  userProducts,
  otp,
  userLogout,
};
