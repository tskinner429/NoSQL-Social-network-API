const { User } = require("../models")

const userController = {
    getUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then((userData) => {
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getOneUser(req, res) {
        User.findOne({_id: req.params.id})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: "User not found with that ID!"})
                return;
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createUser(req, res) {
        console.log("create user")
        User.create(req.body)
        .then((userData) => {
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: "User not found with that ID!"})
                return;
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: "User not found with that ID!"})
                return;
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        )
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: "User not found with that ID!"})
                return;
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: "User not found with that ID!"})
                return;
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = userController;