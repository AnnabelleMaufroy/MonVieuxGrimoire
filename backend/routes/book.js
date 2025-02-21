const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book')

router.post('/',auth,upload, optimizeImage,bookCtrl.createBook);
router.get('/', bookCtrl.findBooks);
router.get('/bestrating',bookCtrl.getBestrating);
router.get('/:id', bookCtrl.findOneBook);
router.put('/:id',auth,upload, optimizeImage,bookCtrl.modifyBook);
router.delete('/:id',auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;



