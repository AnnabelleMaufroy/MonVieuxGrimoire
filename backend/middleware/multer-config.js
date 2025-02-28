const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const name = req.file.originalname.split(' ').join('_').split('.')[0];
  const filename = `${name}_${Date.now()}.webp`;
  const outputPath = path.join('images', filename);

  try {
    await sharp(req.file.buffer)
      .resize(500, 500, { fit: 'inside' })
      .toFormat('webp', { quality: 80 })
      .toFile(outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;

    next();
  } catch (error) {
    console.error('Erreur lors de l’optimisation de l’image :', error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};

module.exports = { upload, optimizeImage };