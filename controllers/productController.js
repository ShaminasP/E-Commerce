const products = require("../model/productModel");
const categoryModel = require("../model/Categories");
const { findById } = require("../model/usermodel");
const cart = require("../model/cartModel");
const moment = require("moment");
const { default: mongoose } = require("mongoose");

//adding products to database
const adminAddProduct = async (req, res) => {
  try {
    const {
      productname,
      price,
      quantity,
      category,
      size,
      color,
      description,
      date,
    } = req.body;
    const newProduct = products({
      productname: productname,
      price: price,
      category: category,
      quantity: quantity,
      size: size,
      color: color,
      description: description,
      Image: req.files,
      date: moment(date).format("MMM Do YY"),
    });

    await newProduct.save();
    res.redirect("/admin/product");
  } catch (err) {
    console.log(err.message);
  }
};

//viewing products
const productsView = async (req, res) => {
  try {
    if (req.session.admin) {
      products
        .find()
        .populate("category")
        .then((data) => {
          res.render("admin/product-management", { data });
        });
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// edit products
const editProduct = async (req, res) => {
  try {
    const ID = req.params.id;
    const category = await categoryModel.find();
    await products
      .findById(ID)
      .populate("category")
      .then((details) => {
        res.render("admin/edit-product", { details, category });
      });
  } catch (error) {
    console.log(error.message);
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const ID = req.params.id;
    const prod = req.body;
    const img = req.files;
    if (img.length) prod.Image = img;
    products.findByIdAndUpdate(ID, prod).then(() => {
      res.redirect("/admin/product");
    });
  } catch (error) {
    console.log(error.message);
  }
};

// delete
const deleteProduct = async (req, res) => {
  try {
    const ID = req.params.id;
    products.findByIdAndDelete(ID).then(() => {
      res.redirect("/admin/product");
    });
  } catch (error) {
    console.log(error.message);
  }
};

//add category
const addCategory = async (req, res) => {
  try {
    const category = req.body.category;
    const img = req.files;
    const newCategory = categoryModel({
      category: category,
      image: img,
    });
    await newCategory.save();
    res.redirect("/admin/category");
  } catch (err) {
    console.log(err.message);
  }
};

//edit category
const editCategory = async (req, res) => {
  try {
    const ID = req.params.id;
    await categoryModel.findById(ID).then((details) => {
      res.render("admin/editCategory", { details });
    });
  } catch (err) {
    console.log(err.message);
  }
};

//update category
const updateCategory = async (req, res) => {
  try {
    const ID = req.params.id;
    const img = req.files;
    const newCategory = req.body;
    if (img.length) newCategory.image = img;
    await categoryModel.findByIdAndUpdate(ID, newCategory).then(() => {
      res.redirect("/admin/category");
    });
  } catch (error) {
    console.log(error.message);
  }
};

//delete category
const deleteCategory = async (req, res) => {
  try {
    const ID = req.params.id;
    products.findOne({ category: ID }).then((categoryIs) => {
      if (!categoryIs) {
        categoryModel.findByIdAndDelete(ID).then(() => {
          res.redirect("/admin/category");
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const proID = req.params.id;
    const user = await cart.findOne({ user: userId });
    if (!user) {
      const newCart = new cart({
        user: userId,
        bucket: [{ products: proID }],
      });
      newCart.save();
    }else{
        const cartOld = await cart.findOne({user: userId, "bucket.products" : proID});
      
    if(cartOld){
      const updateCart=await cart.updateOne({
        user: userId,
        "bucket.products" : proID,
      },{$inc:{"bucket.$.quantity" : 1}}
      )
    }else{
      const cartArray ={ products: proID}
      const updateCart=await cart.findOneAndUpdate({
        user: userId,
      },{
        $push:{ bucket:cartArray }
      })
    }
  }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  adminAddProduct,
  productsView,
  editProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  editCategory,
  updateCategory,
  deleteCategory,
  addToCart,
};
