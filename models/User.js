const { DataTypes } = require('sequelize')

const db = require ('../db/conn')  /* conexao com o banco  */

const User = db.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull : false
    },
    occupation:{ 
        type: DataTypes.STRING, 
        required: true,
    }, 
    newsletter : {
        type: DataTypes.BOOLEAN, 
    },
})

module.exports = User
/* criacao de usuario, nesse arquivo estão dizendo que o nome nao pode receber campo null e sua ocupacao nao pode ficar sozinha*/