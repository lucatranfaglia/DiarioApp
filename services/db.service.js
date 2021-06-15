'use strict';
const Sequelize = require('sequelize');

const db = {};
/**
 * Create connection
 */
console.log('Try to connected DB...');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timestamps: true
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: true });

db.sequelize = sequelize
db.Sequelize = Sequelize








const { Assenza } = require('../models');
const { Avviso } = require('../models');
const { CompitiCasa } = require('../models');
const { Istituto } = require('../models');
const { Materia } = require('../models');

const { MateriaUser } = require('../models');

const { MateriaVoti } = require('../models');
const { OrarioScolastico } = require('../models');
const { Professore } = require('../models');
const { ProfessoreUser } = require('../models');
const { Recensione } = require('../models');
const { Ricevimento } = require('../models');
const { RiduzioneOrarioScolastico } = require('../models');
const { Submateria } = require('../models');
const { User } = require('../models');
const { UserAuth } = require('../models');

const { Istruzione } = require('../models');

(async() => {
    // await Materia.sync({ force: true })
    //     .then(async() => {
    //         await Materia.bulkCreate([
    //             { nome: 'Italiano' },

    //             { nome: 'Storia' },

    //             { nome: 'Matematica' },
    //             { nome: 'Geometria' },
    //             { nome: 'Algebra' },

    //             { nome: 'Scienze' },
    //             { nome: 'Fisica' },
    //             { nome: 'Chimica' },
    //             { nome: 'Geografia' },

    //             { nome: 'Disegno' },
    //             { nome: 'Tecnologia' },
    //             { nome: 'Ragioneria' },
    //             { nome: 'Informatica' },

    //             { nome: 'Filosofia' },
    //             { nome: 'Inglese' },
    //             { nome: 'Latino' },
    //             { nome: 'Greco' },

    //             { nome: 'Francese' },
    //             { nome: 'Tedesco' },
    //             { nome: 'Spagnolo' },
    //             { nome: 'Musica' },
    //             { nome: 'Religione' },
    //             { nome: `Storia dell'arte` },
    //         ]);
    //     })
    //     .catch((error) => { console.log("error: ", error) });

    // await Istruzione.sync({ force: true })
    //     .then(async() => {
    //         await Istruzione.bulkCreate([
    //             { istruzione: 'Infanzia' },
    //             { istruzione: 'Elementari' },
    //             { istruzione: 'Medie' },
    //             { istruzione: 'Liceo Scientifico' },
    //             { istruzione: 'Liceo Classico' },
    //             { istruzione: 'Liceo Linguistico' },
    //             { istruzione: 'Liceo Artistico' },
    //             { istruzione: 'Liceo delle Scienze Umane' },
    //             { istruzione: 'Liceo Musicale e Coreutico' },

    //             { istruzione: `Istituto d'Arte` },
    //             { istruzione: 'Istituto Professionale' },
    //             { istruzione: 'Istituto Magistrale' },
    //             { istruzione: 'Istituto Tecnico' },
    //             { istruzione: 'Università' },
    //         ]);
    //     })
    //     .catch((error) => { console.log("error: ", error) });
    // await Istituto.sync({ force: true });
    // await Professore.sync({ force: true });
    // await UserAuth.sync({ force: true });
    // await User.sync({ force: true });
    // await ProfessoreUser.sync({ force: true });
    // await MateriaUser.sync({ force: true });
    // await Assenza.sync({ force: true });
    // await RiduzioneOrarioScolastico.sync({ force: true });
    // await Avviso.sync({ force: true });
    // await Ricevimento.sync({ force: true });
    // await Recensione.sync({ force: true });
    // await Submateria.sync({ force: true });
    // await OrarioScolastico.sync({ force: true });
    // await CompitiCasa.sync({ force: true });
    // await MateriaVoti.sync({ force: true });

})();

module.exports = db