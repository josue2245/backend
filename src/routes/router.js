const express = require('express');


class Router{
    #router;
    #UsuariosControllers;
    #GeneroControllers;
    constructor(){
        this.#router = express.Router();
        Object.preventExtensions(this);
    }
    attachControllers = async(oUsuariosControllers, oGeneroControllers)=>{
        this.#UsuariosControllers = oUsuariosControllers;
        this.#GeneroControllers = oGeneroControllers;
    }

    prepareRouting = async()=>{
        this.#router.get('/usuarios', this.#UsuariosControllers.fetchUsers);
        this.#router.post('/usuarios', this.#UsuariosControllers.createUsers); 
        this.#router.put('/usuarios/:id_pelicula', this.#UsuariosControllers.updateUsers);
        this.#router.delete('/usuarios', this.#UsuariosControllers.deleteUsers);


        this.#router.get('/genero', this.#GeneroControllers.fetchGenero);
        this.#router.post('/genero', this.#GeneroControllers.createGenero); // Crear un nuevo género
        this.#router.put('/genero/:id_genero', this.#GeneroControllers.updateGenero); // Actualizar un género por ID
        this.#router.delete('/genero/:id_genero', this.#GeneroControllers.deleteGenero); // Eliminar un género por ID
    }

    getRouter = ()=>{
        return this.#router;
    }




}

module.exports = Router;