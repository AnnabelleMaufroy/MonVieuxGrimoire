const Book = require('../models/books');
const fs = require('fs');

exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const initialRatings = bookObject.ratings && bookObject.ratings.length > 0 
        ? bookObject.ratings.map(rating => ({
            userId: rating.userId,
            grade: Number(rating.grade)
        })) 
        : [];

    const averageRating = initialRatings.length > 0 
        ? initialRatings.reduce((acc, r) => acc + r.grade, 0) / initialRatings.length
        : 0;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ratings: initialRatings,
        averageRating: averageRating
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.findBooks = (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.findOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };

exports.modifyBook = (req, res) => {
    const bookObject = req.file 
        ? { 
            ...JSON.parse(req.body.book), 
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        } 
        : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }
            if (book.userId !== req.auth.userId) {
                return res.status(401).json({ message: "Non autorisé." });
            }

            return Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
        })
        .then(() => res.status(200).json({ message: "Livre modifié !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }
            if (book.userId !== req.auth.userId) {
                return res.status(401).json({ message: "Non autorisé." });
            }

            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Livre supprimé !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getBestrating=(req,res)=>{
    Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}
exports.rateBook = (req, res) => {
    const { userId, rating } = req.body;
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
    }
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }
            if (book.ratings.some(r => r.userId === userId)) {
                return res.status(400).json({ message: "Vous avez déjà noté ce livre." });
            }
            book.ratings.push({ userId, grade: rating });
            const totalRatings = book.ratings.length;
            book.averageRating = book.ratings.reduce((sum, r) => sum + r.grade, 0) / totalRatings;
            return book.save();
        })
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(error => res.status(400).json({ error }));
};