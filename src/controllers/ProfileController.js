const ProfileModel = require("../models/ProfileModel");

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
