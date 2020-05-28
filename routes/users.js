const router = require('express').Router();
const { getUsers, getUserbyId, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserbyId);

module.exports = router;
