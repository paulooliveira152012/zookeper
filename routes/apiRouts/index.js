const router = require('express').Router();
const animalRoutes = require('../apiRouts/animalRouts');

router.use(animalRoutes);
module.exports = router;