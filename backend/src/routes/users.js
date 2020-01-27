const { Router } = require('express');
const router = Router();

const {getUsers, getUser, updateUser, createUser, deleteUser} = require('../controllers/users.controller')

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

router.route('/')
.get(getUsers)
.post(createUser)


module.exports = router;
