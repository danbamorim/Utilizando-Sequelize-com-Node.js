const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize3','root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

// try {
//    sequelize.authenticate()
//  console.log("Conectado com Sucesso: ")
//} catch (err) {
//  console.log("NAO DEU CERTO : ", error)
// }

module.exports = sequelize