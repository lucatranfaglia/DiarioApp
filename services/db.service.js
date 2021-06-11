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
    await Materia.sync({ force: true });
    await Istruzione.sync({ force: true });
    await Istituto.sync({ force: true });
    await Professore.sync({ force: true });
    await UserAuth.sync({ force: true });
    await User.sync({ force: true });
    await ProfessoreUser.sync({ force: true });
    await MateriaUser.sync({ force: true });
    await Assenza.sync({ force: true });
    await RiduzioneOrarioScolastico.sync({ force: true });
    await Avviso.sync({ force: true });
    await Ricevimento.sync({ force: true });
    await Recensione.sync({ force: true });
    await Submateria.sync({ force: true });
    await OrarioScolastico.sync({ force: true });
    await CompitiCasa.sync({ force: true });
    await MateriaVoti.sync({ force: true });

})();

module.exports = db