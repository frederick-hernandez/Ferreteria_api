const {models} = require('../config/db.config');


exports.findall = (req, res, next) => {
    models.area.findAll()
    .then(data => {
        res.send(
            {
                Areas : data
            });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error al recuperar las áreas."
        });
    });
};
