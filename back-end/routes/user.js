const express = require("express");
const router = express();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin.js");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

router.put("/follow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  )
    .then((result) => {
      return USER.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      );
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
});

router.put("/unfollow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  )
    .then((result) => {
      return USER.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.followId },
        },
        { new: true }
      );
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
});

router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id")
        .then((posts) => {
          res.status(200).json({ user, posts });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(404).json({ error: "User not found" });
    });
});

router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(422).json({ error: err });
    });
});

module.exports = router;
