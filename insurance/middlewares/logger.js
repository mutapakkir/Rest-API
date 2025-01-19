const logger = (req, res, next) => {//membuat middleware logger
    console.log(`${req.method} ${req.url}`);//menampilkan method dan URL request
    next();
};

module.exports = logger;