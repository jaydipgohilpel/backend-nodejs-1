const userModel = require("../model/users");

async function handleCreate(req, res) {
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
}

async function handleAllUsers(req, res) {
  let users = await userModel.find();
  res.status(200).json({ data: users, code: 200, session: req.session, cookieMessage: req.session.username, success: true });
}

async function handleDelete(req, res) {
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
}

async function handleAddUser(req, res) {
  const createUser = await userModel.create({
    username: 'olivia_turner_26',
    name: 'Olivia Turner',
    age: 26,
    description: 'Fitness coach and nutritionist. Enjoys outdoor running and experimenting with healthy recipes.',
    categories: ['Fitness Coaching', 'Running', 'Nutrition'],
    created_at: new Date('2022-08-05'),
  })
  res.send(createUser)
}

async function handleSearch(req, res) {
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
}

module.exports =
{
  handleCreate,
  handleAllUsers,
  handleDelete,
  handleAddUser,
  handleSearch
}