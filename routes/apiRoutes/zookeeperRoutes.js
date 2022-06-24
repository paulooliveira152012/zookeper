const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers.json");


//adding the route
router.get("/zookeeper", (req, res) => {
  //function to filter zookeeper
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  } 
  res.json(results);
});

//creating another route for the id
router.get("/zookeepers/:id", (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

//creating another route to add new zookeeper
router.post("/zookeepers", (req, res) => {
  //set id based on next index
  req.body.id = zookeepers.length.toString();

  //if any data is incorrect...
  if (!validateZookeeper(req.body)) {
    res.status(400).send("The zookeeper is not properly formatted.");
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

module.exports = router;
