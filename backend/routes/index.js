const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const commandRouter = require('./commandRouter'); 
const directoryTraversalRouter = require('./directoryTraversalRouter');

router.use('/user', userRouter);
router.use('/command', commandRouter); 
router.use('/', directoryTraversalRouter); 
module.exports = router;
