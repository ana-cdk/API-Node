var express = require('express');
const User = require('../model/User');
const isAuthorized = require('../middleware/isAuthorized');
var router = express.Router();


const users = [
  { id: 1, nome: "Ana", email: "analinda@gmail.com"},
  { id: 2, nome: "Abluble", email: "hufeuh@gmail.com"},
  { id:3, nome: "Marquito", email: "huwhud@gmail.com"}
];

/* GET users listing. */
router.get('/', [isAuthorized] ,async function(req, res) {
  return res.json(await User.find());
});

/* Obter um user por ID*/ 

router.get("/:id", isAuthorized, async (req, res) => {
  const {id} = req.params;

  const result = await User.findById(id)
  return result
    ? res.json(result)
    : res.status(404).send();
});

router.post("/", async (req, res) =>{
  const body = req.body;

  const user = new User(body);

  const hasErrors = user.validateSync();

  return hasErrors
    ? res.status(400).json(hasErrors)
    : res.status(201).json(await user.save());
});

router.put("/:id", isAuthorized, (req, res) => {

})

router.delete("/:id", isAuthorized, (req, res) => {

})


module.exports = router;
