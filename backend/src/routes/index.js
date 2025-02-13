const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;
