var express = require('express'),
  readFile = require('../public/javascripts/readFile.js'),
  writeToFile = require('../public/javascripts/writeToFile.js'),
  objectBuilder = require('../public/javascripts/objectBuilder.js'),
  emailValidator = require('../public/javascripts/emailValidator.js'),
  filePath = __dirname + '/../public/data/users.json';

router = express.Router();
router.use('/public', express.static(__dirname + '/public'));
router.use(express.static(__dirname + '/public'));
router.use(express.json());

function getUsersFromFile() {
  var users = readFile(filePath);
  return users ? users : { users: [] };
};

router.get('/', function(req, res) {
  console.log('Hello!')
  res.render('index', getUsersFromFile());
});

router.post('/api/addUser', function(req, res) {
  console.log('add')
  var user = req.body;
  var data = getUsersFromFile();
  if (emailValidator(data, user.email)) {
    var newData = objectBuilder(data, user, 'add');
    res.send(writeToFile(filePath, newData) ? 'OK' : 'FAIL');
  } else {
    res.status(400).send('EMAIL');
  }
});

router.post('/api/updateUser', function(req, res) {
  console.log('update')
  var user = req.body;
  var data = getUsersFromFile();
  if (emailValidator(data, user.email)) {
    var newData = objectBuilder(data, user, 'update');
    res.send(writeToFile(filePath, newData) ? 'OK' : 'FAIL');
  } else {
    res.status(400).send('EMAIL');
  }
});

module.exports = router;
