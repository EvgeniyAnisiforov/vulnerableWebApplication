const Router = require('express');
const { handleDirectoryTraversal } = require('../controllers/directoryTraversalController');

const router = new Router();

// Маршрут для Directory Traversal
router.get('/directory-traversal', handleDirectoryTraversal);

module.exports = router;
