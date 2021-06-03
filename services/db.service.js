'use strict';
const Sequelize = require('sequelize');


const User = require('../models/user');
const UserAuth = require('../models/userAuth');
const Submateria = require('../models/submateria');
const Riduzioneorarioscolastico = require('../models/riduzioneorarioscolastico');
const Ricevimento = require('../models/ricevimento');
const Recensione = require('../models/recensione');
const Professore = require('../models/professore');
const Orarioscolastico = require('../models/orarioscolastico');
const Materiavoti = require('../models/materiavoti');
const Materiauser = require('../models/materiauser');
const Materia = require('../models/materia');
const Istituto = require('../models/istituto');
const Compiticasa = require('../models/compiticasa');
const Avviso = require('../models/avviso');
const Assenza = require('../models/assenza');


/**
 * Create connection
 */
console.log('Try to connected DB...');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
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



const User = User.init(sequelize, Sequelize);


const UserAuth = UserAuth.init(sequelize, Sequelize);
const Submateria = Submateria.init(sequelize, Sequelize);
const Riduzioneorarioscolastico = Riduzioneorarioscolastico.init(sequelize, Sequelize);
const Ricevimento = Ricevimento.init(sequelize, Sequelize);
const Recensione = Recensione.init(sequelize, Sequelize);
const Professore = Professore.init(sequelize, Sequelize);
const Orarioscolastico = Orarioscolastico.init(sequelize, Sequelize);
const Materiavoti = Materiavoti.init(sequelize, Sequelize);
const Materiauser = Materiauser.init(sequelize, Sequelize);
const Materia = Materia.init(sequelize, Sequelize);
const Istituto = Istituto.init(sequelize, Sequelize);
const Compiticasa = Compiticasa.init(sequelize, Sequelize);
const Avviso = Avviso.init(sequelize, Sequelize);
const Assenza = Assenza.init(sequelize, Sequelize);

User.sync();
UserAuth.sync();
Submateria.sync();
Riduzioneorarioscolastico.sync();
Ricevimento.sync();
Recensione.sync();
Professore.sync();
Orarioscolastico.sync();
Materiavoti.sync();
Materiauser.sync();
Materia.sync();
Istituto.sync();
Compiticasa.sync();
Avviso.sync();
Assenza.sync();

export default sequelize;