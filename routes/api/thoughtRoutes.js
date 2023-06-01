const router = require('express').Router()

const {

} = require("../../controllers/thoughtController")

router.route("/").get().post()
router.route("/:id").get().put().delete()
router.route("/:id/reactions").post()
router.route("/:id/reactions/:reactionId").delete()

module.exports = router;