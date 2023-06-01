const router = require('express').Router();

const apiRoutes = require('./api/userRoutes')

router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(404).send('<h1>404 Wrong Route!</h1>')
})

module.exports = router;