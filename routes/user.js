var express = require('express');
var router = express.Router();
const { handleCreate, handleAllUsers, handleDelete, handleAddUser, handleSearch } = require("../controllers/users")

router.get('/create', handleCreate);
router.get('/all-users', handleAllUsers)
router.get('/delete', handleDelete)
router.get('/add-user', handleAddUser);
router.get('/search', handleSearch)

module.exports = router;