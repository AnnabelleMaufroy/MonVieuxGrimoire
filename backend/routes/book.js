const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const bookCtrl = require('../controllers/book')

router.post('/',auth,bookCtrl.createBook);
router.get('/', bookCtrl.findBooks);
router.get('/:id', bookCtrl.findOneBook);
router.put('/:id',auth,bookCtrl.modifyBook);
router.delete('/:id',auth, bookCtrl.deleteBook);

module.exports = router;



