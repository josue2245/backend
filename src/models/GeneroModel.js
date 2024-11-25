class GeneroModel {
    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }

    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;
    }

    // Fetch all genres
    fetchGeneroAll = async () => {
        let session = await this.#orientDB.pool.acquire();
        let data = await session.select().from('calles').all();
        session.close();
        return data;
    }

    // Create a new genre
    createGenero = async (object) => {
        let session = await this.#orientDB.pool.acquire();
        let idRecord = await session.create('Vertex', 'calles').set(object).one();
        session.close();
        return idRecord;
    }

    // Update a genre by ID
    updateGenero = async (id_genero, object) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            let result = await session.update('calles')
                .set(object)
                .where({ 'id_calles': id_genero })
                .return('AFTER')
                .one();

            return result;
        } catch (error) {
            throw new Error('Error actualizando el género');
        } finally {
            session.close();
        }
    };

    // Delete a genre by ID
    deleteGenero = async (id_genero) => {
        let session = await this.#orientDB.pool.acquire();
        let deletedCount = await session.delete('Vertex', 'calles').where({ id_genero }).one();
        session.close();
        return deletedCount; 
    }
}

module.exports = new GeneroModel();
