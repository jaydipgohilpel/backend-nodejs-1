var express = require('express');
var router = express.Router();
require("./connection");
const userModel = require("./users");

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/create', async (req, res, next) => {
  res.cookie("userXname", "xwwe")
  req.session.username = "fsffd",
    req.session.name = "Ddddd",
    req.session.count = req.session.count++
  const createUser = await userModel.create({
    username: "String",
    name: "String",
    age: 1
  })
  res.send(createUser)
});

router.get('/allusers', async (req, res) => {
  console.log(req.cookies);
  let users = await userModel.find();
  res.status(200).json({ data: users, code: 200, session: req.session, cookieMessage: req.session.username, success: true });
})

router.get('/delete', async (req, res) => {
  let cookieMessage = 'cookie variable destroyed!'
  if (res?.cookies?.userXname)
    res.clearCookie("userXname")
  else cookieMessage = "cookie variable does not exist!!"

  if (req.session.username) {
    // Delete the session variable
    delete req.session.username;
    res.status(200).json({ code: 200, session: req.session, message: 'Session variable destroyed!', cookieMessage: cookieMessage, success: true });
  } else {
    res.status(200).json({ code: 200, session: req.session, message: 'Session variable does not exist!', cookieMessage: cookieMessage, success: true });
  }
})

router.get('/add-user', async (req, res, next) => {

  const createUser = await userModel.Insert({
    username: 'olivia_turner_26',
    name: 'Olivia Turner',
    age: 26,
    description: 'Fitness coach and nutritionist. Enjoys outdoor running and experimenting with healthy recipes.',
    categories: ['Fitness Coaching', 'Running', 'Nutrition'],
    created_at: new Date('2022-08-05'),
  })
  res.send(createUser)
});


router.get('/search', async (req, res) => {
  // let regExp = new RegExp('^$', 'i');
  // let users = await userModel.find({ categories: { $all: ['Reading','Yoga'] } });

  // var date1 = new Date('2024-01-04')
  // var date2 = new Date('2024-01-05')
  // let users = await userModel.find({ created_at: { $gte: date1, $lte: date2 } })

  let users = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: '$name' }, 0] },
        { $lte: [{ $strLenCP: '$name' }, 10] }
      ]
    }
  })

  res.status(200).json({ data: users, count: users.length, code: 200, success: true });
})


module.exports = router;
