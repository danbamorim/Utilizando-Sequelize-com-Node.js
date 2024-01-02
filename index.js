const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const app = express()
const Address = require('./models/Address')


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.engine('handlebars', exphbs())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id: id } })
    res.redirect('/')
})


app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ include: Address, where: { id: id } })

    if (user) {
        res.render('useredit', { user: user.get({ plain: true }) });
      } else {
        // Lidar com o caso em que o usuário não é encontrado
        res.status(404).send('Usuário não encontrado');
      }
      

})



app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    }

    await User.create({ name, occupation, newsletter })

    res.redirect('/')
})



app.post('/users/update', async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter


    if (newsletter === 'on') {
        newsletter = true
    } else { newsletter = false }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: { id: id } })

    res.redirect('/')

})



app.post('/address/create', async (req, res) => {
    const UserId = req.body.Userid
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId,
        street,
        number,
        city,
    }
    await Address.create(address)

    res.redirect('/users/edit/${ UserId}')
})


app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ raw: true, where: { id: id } })
    res.render('userview', { user })

})

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true })

    console.log(users)

    res.render('home', { users: users })
})




conn.sync().then(() => {
    app.listen(3001)
}).catch((error) => console.log(error))

