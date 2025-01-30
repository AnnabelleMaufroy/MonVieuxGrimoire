const Book = require('../models/books');

exports.createBook =  (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(()=>res.status(201).json({ message: 'Livre enregistré !'}))
        .catch(error => res.status(400).json({ error }))
};

exports.findBooks = (req, res) => {
    Book.find()
        .then(books => res.status(200).json({message: 'Livres trouvé:' + books}))
        .catch(error => res.status(400).json({ error }));
};

exports.findOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };

exports.modifyBook = (req, res, next)=>{
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.deleteBook =(req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };