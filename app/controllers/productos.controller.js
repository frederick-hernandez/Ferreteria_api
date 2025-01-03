const {models} = require('../config/db.config');


exports.findall=(req,res)=>{
    models.productos.findAll({
        attributes: [
            'id',
            'title',
        'price',
        'description',
        'category',
        'image'
        ],
        include: [
            {
                model : models.rating,
                as: 'rating',
                attributes: ['rate' ,'count']
            }]
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
                err.message || "Error retrieving Area."
        });
    });
};

exports.findP=(req,res)=>{
    models.productos.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
                err.message || "Error retrieving Area."
        });
    });
};


exports.create =(req, res, next) => {
    const { title, price, description, proveedor_id, category, image} = req.body;
    models.productos.create({title, price, category, description, proveedor_id, image})
    .then(producto => {
        res.send(producto);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error creating the Producto."
        });
    });
};

exports.findById =(req, res) => {
    const id = req.params.id;
    models.productos.findByPk(id,
        {attributes: [
            'id',
            'title',
        'price',
        'description',
        'category',
        'image'
        ],
        include: [
            {
                model : models.rating,
                as: 'rating',
                attributes: ['rate' ,'count']
            }]
    }
    )
   .then(data=>{
    if (!data) {
        res.status(404).send({
            message: "No se encontro el producto con el ID: " + id
        });
    } else {
        res.send(data);
    }
    })
   .catch(err=>{
    res.status(500).send({
        message:
            err.message || "Error retrieving Producto with id=" + id
    });
    });
};

exports.update =(req, res) => {
    const { title, price, description, proveedor_id, category, image} = req.body;
    const id = req.params.id;
    models.productos.update({ title, price, category, description, proveedor_id, image}, { where: { id: id }})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Producto actualizado correctamente."
            });
        }else{
            res.send({
                message: `No se pudo actualizar el producto con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error actualizando el producto."
        });
    });
};

exports.delete =(req, res) => {
    const id = req.params.id;
    models.productos.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Producto eliminado correctamente."
            });
        }else{
            res.send({
                message: `No se pudo eliminar el producto con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error eliminando el producto."
        });
    });
};
