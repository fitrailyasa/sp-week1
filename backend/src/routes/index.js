const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const profileRouter = require('./profile.route');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/profile', profileRouter);

module.exports = router;
