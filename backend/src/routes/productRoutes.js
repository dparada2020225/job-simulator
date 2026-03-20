const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.patch('/:id', productController.patch); // Requisito Senior
router.delete('/:id', productController.remove);

module.exports = router;