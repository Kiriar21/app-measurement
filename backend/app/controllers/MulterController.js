const multer = require('multer');

const storageMemery = multer.memoryStorage();

const uploadMemory = multer({ 
    storageMemery,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Nieprawidłowy format pliku. Przesyłaj pliki CSV.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send({ error: err.message });
    } else if (err) {
        return res.status(500).send({ error: err.message });
    }
    next();
};

module.exports = {
    uploadMemory,
    multerErrorHandler,
};