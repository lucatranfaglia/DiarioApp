# Docker


# DEPENDENCES
"express": "^4.17.1",
"swagger-jsdoc": "^7.0.0-rc.4",
"swagger-ui-express": "^4.1.6"
"dotenv": "^8.2.0",





sequelize init
sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

sequelize db:migrate




<!-- AVVISO -->
npx sequelize-cli model:generate --name Avviso --attributes userId:bigint,creationDate:date,data:date,indiceColore:string,notifica:string,testo:string,titolo:string


<!-- COMPITO -->
npx sequelize-cli model:generate --name Compito --attributes userId:bigint,data:date,notifica:string,testo:string

<!-- Materia -->
npx sequelize-cli model:generate --name Materia --attributes userId:bigint,compiticaCasaId:bigint,orarioId:bigint,pagellaId:bigint,submaterieSetId:bigint,votiSetId:bigint,colore:string,dataCompito:date,dataInterrogazione:date,dataPratico:date,giustificazioni:integer,nomeMateria:string,notificaCompito:string,notificaInterrogazione:string,notificaPratico:string,professore:string,votoPagella:integer


<!-- Voto -->
npx sequelize-cli model:generate --name Voto --attributes materiaId:bigint,submateriaId:bigint,data:date,isOrale:boolean,tipo:string,voto:integer

<!-- submateria -->
npx sequelize-cli model:generate --name Submateria --attributes materiaId:bigint,compitiId:bigint,votiId:bigint,orarioId:bigint,nomeSubmateria:string


<!-- OrarioScolastico -->
npx sequelize-cli model:generate --name orarioScolastico --attributes userId:bigint,materiaId:bigint,subMateriaId:bigint,aula:string,giornoSettimana:string,nomeMateria:string,ora:time

<!-- Assenza -->
npx sequelize-cli model:generate --name Assenza --attributes userId:bigint,data:date

<!-- RiduzioneOrarioScolastico (ritardo,entrata,uscita)-->
npx sequelize-cli model:generate --name RiduzioneOrarioScolastico --attributes userId:bigint,data:date,ritardo:enum,ora:TIME


<!-- RiduzioneOrarioScolastico (ritardo,entrata,uscita)-->
npx sequelize-cli model:generate --name RiduzioneOrarioScolastico --attributes userId:bigint,data:date,ritardo:enum,ora:TIME

<!-- Pagella-->
npx sequelize-cli model:generate --name Pagella --attributes userId:bigint,materieSet:bigint,data:date,isPagellino:boolean

notifica:integer (0,1,2,3)
stato:integer

<!-- HEX -->
colore:stringa

<!-- intero contatore -->
giustificazioni:integer


tipo
data,

# tipologiaMateria
tipo: (compitoScritto, compitoPratico, Interrogazione)
data:

# votoPagella: float

# Voto
deprecato isOrale

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