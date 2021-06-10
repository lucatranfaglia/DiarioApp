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

sequelize.sync({ alter: true });

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
    await Materia.sync({ alter: true });
    await Istruzione.sync({ alter: true });
    await Istituto.sync({ force: true });
    await Professore.sync({ alter: true });
    await UserAuth.sync({ alter: true });
    await User.sync({ alter: true });
    await ProfessoreUser.sync({ alter: true });
    await MateriaUser.sync({ alter: true });
    await Assenza.sync({ alter: true });
    await RiduzioneOrarioScolastico.sync({ alter: true });
    await Avviso.sync({ alter: true });
    await Ricevimento.sync({ alter: true });
    await Recensione.sync({ alter: true });
    await Submateria.sync({ alter: true });
    await OrarioScolastico.sync({ alter: true });
    await CompitiCasa.sync({ alter: true });
    await MateriaVoti.sync({ alter: true });
})();

module.exports = db