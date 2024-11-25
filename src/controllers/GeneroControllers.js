const GeneroModel = require("../models/GeneroModel");

class GeneroControllers {

    constructor() {
        Object.preventExtensions(this);
    }

    // Fetch all users
    fetchGenero = async (req, resp) => {
        let data = await GeneroModel.fetchGeneroAll();
        resp.status(200).json(data);
    }

    // Create a new user
    createGenero = async (req, resp) => {
        // Lógica para crear usuarios
        let record = await GeneroModel.createGenero(req.body);
        resp.status(200).json(record);

    }

    // Update a user
    updateGenero = async (req, resp) => {
        try {
            // Lógica para actualizar usuarios
            let record = await GeneroModel.updateGenero(req.params.id_calles, req.body);
            if (record) {
                resp.status(200).json({ message: 'Registro actualizado', record });
            } else {
                resp.status(404).json({ message: 'Registro no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error actualizando Registro', error: error.message });
        }
    }

    // Delete a user
    deleteGenero = async (req, resp) => {
        let deletedCount = await GeneroModel.deleteUser(req.body.id_calles);
        resp.status(200).json({
            message: `la calle con ID ${req.body.id_genero} Se Elimino`,deletedCount});
        }

}

module.exports = GeneroControllers;
