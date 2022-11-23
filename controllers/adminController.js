const { response } = require("express");
const categoryModel = require("../model/Categories");
const Users = require("../model/usermodel");
const homeView = (req, res) => {
  try {
    if (req.session.admin) {
      res.render("admin/home");
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loginView = (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    console.log(error.message);
  }
};

const viewOrders = (req, res) => {
  try {
    if (req.session.admin) {
      res.render("admin/orders");
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addProducts = (req, res) => {
  try {
    if (req.session.admin) {
      categoryModel.find().then((category) => {
        res.render("admin/add_products", { category });
      });
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// view client details
const viewClients = (req, res) => {
  try {
    if (req.session.admin) {
      Users.find().then((userData) => {
        res.render("admin/clients", { userData });
      });
    } else {
      res.redirect("/admin/login");
    }
  } catch (err) {}
};

// user blocking
const blockUser = (req, res) => {
  try {
    const user = req.params.id;
    Users.findByIdAndUpdate(user, { isActive: false }, (err, data) => {
      if (err) {
        console.log("error");
      } else {
        res.redirect("/admin/clients");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//unblockuser
const unblockUser = (req, res) => {
  try {
    const user = req.params.id;
    Users.findByIdAndUpdate(user, { isActive: true }, (err, data) => {
      if (err) {
        console.log("error");
      } else {
        res.redirect("/admin/clients");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//viewCategories
const viewCategory = async (req, res) => {
  try {
    await categoryModel.find().then((data) => {
      res.render("admin/listCategories", { data });
    });
  } catch (err) {
    console.log(err.message);
  }
};

const adminLogout = (req, res) => {
  try {
    req.session.admin = false;
    res.redirect("/admin/login");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  homeView,
  loginView,
  viewOrders,
  addProducts,
  viewClients,
  adminLogout,
  blockUser,
  unblockUser,
  viewCategory,
};
