//dependencias
const express =require('express')
const bodyParser =require('body-parser')
const morgan = require('morgan');
const cors= require('cors');

// importaciones de los archivos
const conf = require('../config/configbd.json'); //configuracion BD
const DBManager = require('./DBManager');// Administrador de BD

//rutas
const Router = require('../routes/router');



//Estos son mis Modelos
const UsuariosModel = require('../models/UsuariosModel');

// Estos son mis Controladores

const UsuariosControllers = require ('../controllers/UsuariosControllers');
const GeneroModel = require('../models/GeneroModel');
const GeneroControllers = require('../controllers/GeneroControllers');

class AppManager{
    #appExpress;
    #runningConfType;

    constructor(){
        this.#init();
        Object.preventExtensions(this);
    }

    #init = async () =>{

        this.#runningConfType = conf.DevConfig;
        this.#appExpress = express();
    }

    prepareService = async() =>{
        this.#appExpress.use(cors('origin:http://localhost:4200/'));
        this.#appExpress.use(express.json());
        this.#appExpress.use(bodyParser.json());
        this.#appExpress.use(bodyParser.urlencoded({ extended: true }));
        this.#appExpress.use(morgan('dev'));
        // await this.#prepareDataBase(this.#runningConfType.db);     
        await this.#prepareRouting();
  }
    // #prepareDataBase = async (dbConfig) =>{
        // const oDBMan = new DBManager()
        // await oDBMan.prepareDataBase(dbConfig);

        // await UsuariosModel.defineModel(oDBMan.getConnection());
        // await GeneroModel.defineModel(oDBMan.getConnection())
        
        
    // }

    #prepareRouting = async () =>{
        const oRouter = new Router();

        const oUsuariosControllers = new UsuariosControllers();
        const oGeneroControllers = new GeneroControllers();

        oRouter.attachControllers(oUsuariosControllers, oGeneroControllers);
        oRouter.prepareRouting();
        this.#appExpress.use('/api', oRouter.getRouter());

    }

    runService = async () =>{
        const thisServicePort = this.#runningConfType.service.port;
        await this.#appExpress.listen(thisServicePort, ()=>{
            console.log(`http://localhost:${thisServicePort}`);
        });
    }

}

module.exports = AppManager;