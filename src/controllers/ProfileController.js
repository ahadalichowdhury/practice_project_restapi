const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

exports.CreateProfile = function (req, res) {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (error, data) => {
    if (error) {
      res.status(404).json({ status: "fail", data: error });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

exports.UserLogin = function (req, res) {
  let UserName = req.body["UserName"];
  let Password = req.body["Password"];

  ProfileModel.find(
    { UserName: UserName, Password: Password },
    (error, data) => {
      if (error) {
        res.status(404).json({ status: "fail", data: error });
      } else {
        if (data.length > 0) {
          //json web token given

          let payload = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: data[0],
          };
          let token = jwt.sign(payload, "secretKey123");

          res.status(200).json({ status: "Success", token: token, data: data });
        } else {
          res.status(401).json({ status: "unauthorized" });
        }
      }
    }
  );
};

exports.SelectProfile = function (req, res) {
  let UserName = "";
  ProfileModel.find({ UserName: UserName }, (error, data) => {
    if (error) {
      res.status(404).json({ status: "fail", data: error });
    } else {
      res.status(200).json({ status: "Success", token: token, data: data });
    }
  });
};
