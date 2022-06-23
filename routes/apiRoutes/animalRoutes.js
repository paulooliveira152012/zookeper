const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();


//adding the route
    //the get method requires two arguments: description of route to fetch from; and callbeck function to execute everytime route is accessed with a GET request
router.get('/animals', (req, res) => {
    //function to filter animals
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    } else {
        res.send(404)
    }
    res.json(results);
})

//creating another get route to use parameters for the id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
      res.json(result);
  });

  router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not properly formatted.');
    } else {
      const animal = createNewAnimal(req.body, animals);
      res.json(animal);
    }
  });

  module.exports  = router;

