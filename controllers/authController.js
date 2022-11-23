const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { sendSms, veryfySms } = require("../verification/twilio");

// User Signup
const userRegister = async (req, res) => {
  try {
    //checking the email already exists in the database
    const { email, mobile } = req.body;
    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        req.session.user = req.body;
        const phone = mobile;
        sendSms(phone);
        res.redirect("/otp");
      } else {
        return res.redirect("/login");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

//veryfying the OTP
const userOtp = async (req, res) => {
  try {
    const otp = req.body.otp;

    const { name, email, mobile, password, date, isActive } = req.session.user;
    const phone = mobile;
    //pasword encryption
    let hasdPassword = await bcrypt.hash(password, 10);
    await veryfySms(phone, otp).then((verification_check) => {
      if (verification_check.status == "approved") {
        const newUser = new User({
          email: email,
          name: name,
          mobile: mobile,
          password: hasdPassword,
          date: moment(date).format("MMM Do YY"),
          isActive: isActive,
        });
        newUser.save();
        res.redirect("/login");
      } else {
        console.log("Invalid verification");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userOne = await User.findOne({ email: email });

    let compare = await bcrypt.compare(password, userOne.password);
    if (!userOne) {
      return res.redirect("/login");
    }
    if (!compare) {
      return res.redirect("/login");
    }
    req.session.user = true;
    req.session.user=userOne
    return res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};

//admin login
const adminLogin = (req, res) => {
  const user = { email: "admin@1", password: 123 };
  try {
    if (req.body.email == user.email && req.body.password == user.password) {
      req.session.admin = true;
      res.redirect("/admin");
    } else {
      req.session.admin = false;
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  userRegister,
  userLogin,
  adminLogin,
  userOtp,
};
