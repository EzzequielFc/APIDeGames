const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken") // TOKEN

const jwtSecret = "dsakjgdslkghjflskhjnfdlknSAhdb54"

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// midleware
function auth(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401)
               res.json({err: "Token invalido"})
            }else{

                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })
    }else{
        res.status(401)
        res.json({err: "Token invalido"})
    }

}

// DataBase falso para testes
var DB = {
    games: [
        {
            id:23,
            title: "Call od duty",
            year: 2019,
            price: 60
        },
        {
            id:20,
            title: "Minecraft ",
            year: 2020,
            price: 100
        },
        {   
            id:13,
            title: "Valorant",
            year: 2018,
            price: 50

        },
    ],
    users:[
        {
            id: 1,
            name: "Ezequiel Campos",
            email: "ezequiel@gmail.com",
            password: "nodes2"
        },
        {
            id: 2,
            name: "Ezequiel Francisco",
            email: "ezequiel2@gmail.com",
            password: "nodes22"
        },
    ]
}

// Listagem de todos os games
app.get("/games",auth, (req,res) => {
    res.statusCode = 200 // Sucesso
    res.json({user: req.loggedUser, games: DB.games})
})

// Listagem unica 
app.get("/game/:id",auth,(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
    
})
// Adição de valores
app.post("/game",auth, (req,res) => {
    var {title, price, year} = req.body

    DB.games.push({
        id: 123,
        title,
        price,
        year
    })

    res.sendStatus(200)

})
// Deleção 
app.delete("/game/:id",auth, (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }

    }

})
// Update
app.put("/game/:id",auth, (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
        
            var {title, price, year} = req.body

            if(title != undefined){
                game.title = title
            }
            
            if(price != undefined){
                game.price = price
            }
            
            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)

        }else{
            res.sendStatus(404)
        }
    }
})

app.post("/auth", (req,res) => {

    var {email, password} = req.body

    if(email != undefined){

       var user = DB.users.find(u => u.email == email)

       if(user != undefined){

        if(user.password == password){

            jwt.sign({id: user.id,email: user.email}, jwtSecret,{expiresIn: '24h'}, (err, token) => {
                if(err){
                    res.status(400)
                    res.json({err: "Falha interna"})
                }else{
                    res.status(200)
                    res.json({token: token})
                }
            })
        }else{  
            res.status(401)
            res.json({err: "Credenciais inválidas"})
        }

       }else{
           res.status(404) 
           res.json({err: "Email não cadastrado"})
       }
    }else{
        res.status(400)
        res.json({err: "Email é invalido"})
    }

})

app.listen(8080, () => {
    console.log("API RODANDO")
})