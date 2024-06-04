const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 }
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const userID = parseInt(req.params.id)
    const user = users.find(item => item.id === userID)
    if (user) {
        res.json(user)
    } else {
        res.status(404).send('Пользователь не найден')
    }
})

app.get('/users/:age', (req, res) => {
    const age = parseInt(req.params.age)
    const usersFilter = users.filter(item => item.age > age)
    res.json(usersFilter)
})

app.get('/users/:domain', (req, res) => {
    const domain = req.params.domain
    const usersDomain = users.filter(item => item.email.endsWith(domain))
    res.json(usersDomain)
})

app.get('/users/sorted', (req, res) => {
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedUsers)
})

app.use(bodyParser.urlencoded({ extended: false })); 
app.post('/users', (req, res) => {
    const nameUser = req.body.name
    const emailUser = req.body.email
    const ageUser = parseInt(req.body.age)

    const newUser = {
        id: users[users.length - 1]['id'] + 1,
        name: nameUser,
        email: emailUser,
        age: ageUser
    }
    
    if (nameUser && emailUser && ageUser) {
        users.push(newUser)
        console.log(newUser)
        console.log(users)
        res.status(201).send('Пользователь добавлен')
    } else {
        res.status(400).send('Пользователь не был добавлен. Вы заполнили не все данные')
    }
})

app.put('/users/:id', (req, res) => {
    const userID = parseInt(req.params.id)
    const indUser = users.findIndex(item => item.id === userID)
    if (indUser === -1){
        res.status(404).send('Такого пользователя не существует')
    } else {
        if (nameUser && emailUser && ageUser) { // по сути тут нюанс есть в том, что для обновления данных нужно заполнить все поля
            users[indUser].name = req.body.name
            users[indUser].email = req.body.email
            users[indUser].age = req.body.age
            res.status(201).send('Данные о пользователе обновлены')
        } else {
            res.status(400).send('Информация не была обновлена. Вы заполнили не все данные')
        }
    }
})

app.delete('/users/:id', (req, res) => {
    const userID = parseInt(req.params.id)
    const indUser = users.findIndex(item => item.id === userID)
    if (indUser === -1) {
        res.status(404).send('Такого пользователя не существует')
    } else {
        users = users.filter(item => item.id !== userID)
        res.status(204)
    }
})

app.listen(PORT, () =>{
    console.log('YES')
}) 