const { User, Thought } = require("../models")

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then((thoughtData) => {
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.id})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "Thought not found with that ID!"})
                return;
            }
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((_id) => {
            return User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {thoughts: _id}},
            {new: true}
            )
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
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        })
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "Thought not found with that ID!"})
                return;
            }
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "Thought not found with that ID!"})
                return;
            }
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {reactions: req.body}},
            {new: true}
        )
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "Thought not found with that ID!"})
                return;
            }
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {reactions: {reactionId: req.parans.reactionId}}},
            {new: true}
        )
        .then((reactionData) => {
            if(!reactionData) {
                res.status(404).json({message: "Reaction not found with that ID!"})
                return;
            }
            res.json(reactionData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = thoughtController;