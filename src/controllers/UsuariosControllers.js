const UsuariosModel = require("../models/UsuariosModel");

class UsuariosControllers {

    constructor() {
        Object.preventExtensions(this);
    }

    // Fetch all users
    fetchUsers = async (req, resp) => {
      //  let data = await UsuariosModel.fetchUsersAll();
      let data ="FECH FUNCIONANDO"
        
        resp.status(200).json(data);
        
    }

    // Create a new user
    createUsers = async (req, resp) => {
        // Lógica para crear usuarios
       // let record = await UsuariosModel.createUsers(req.body);
        let record="LUGAR FUNCIONANDO"
        console.log(record);
        resp.status(200).json(record);
        

    }

    // Update a user
    updateUsers = async (req, resp) => {
        try {
            // Lógica para actualizar usuariosnpm
            let record = await UsuariosModel.updateUsers(req.params.id_lugares, req.params.id_genero, req.body);
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
    deleteUsers = async (req, resp) => {
        let deletedCount = await UsuariosModel.deleteUser(req.body.id_lugares);
        resp.status(200).json({
            message: `el lugar con ID ${req.body.id_pelicula} Se Elimino`,deletedCount});
        }

}

module.exports = UsuariosControllers;
