# Docker


# DEPENDENCES
"express": "^4.17.1",
"swagger-jsdoc": "^7.0.0-rc.4",
"swagger-ui-express": "^4.1.6"


# SEQUELIZE
sequelize init
sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

# migrate:UNDO ALL
sequelize db:migrate:undo:all

# migrate ALL
sequelize db:migrate

# migrate:UNDO specific file
sequelize db:migrate:undo --name 20210503180315-create-materia.js
sequelize db:migrate:undo --name 20210502165713-create-compiti-casa.js

# migrate specific file
sequelize db:migrate --to 20210503180315-create-materia.js
sequelize db:migrate --to 20210502165713-create-compiti-casa.js


# create new model
npx sequelize-cli model:generate --name Pagella --attributes id:bigint,userId:bigint,nome:string,infoVoti:array


id: bigint
userId: bigint
nome: string
infoVoti



# Foreign Keys
- For 1:1 and 1:m associations the default option is SET NULL for deletion, and CASCADE for updates.
- For n:m, the default for both is CASCADE
<!-- --------------------------------------------------------- -->
<!-- --------------------------------------------------------- -->

# INFO DB

notifica:integer (0,1,2,3)
stato:integer
# colore
colore:stringa

# tipologiaMateria
tipo: (compitoScritto, compitoPratico, Interrogazione)
data:

# votoPagella: float

# submateria
aggiungere peso (credito di esame)

# Assenza

# ROL (ritardo, uscita anticipata)

# OrarioScolastico
aula
giornoSettimana:interger

# pagella
resoconto parziale 
isPagellino:boolean

# NOTA BENE
al profilo figlio gli chiedo:
- il nickname
- il nome dell'istituto (dalla lista , in caso inserimento nuovo istituto)
- anno?
- sezione?

<!-- --------------------------------------------------------- -->
<!-- --------------------------------------------------------- -->