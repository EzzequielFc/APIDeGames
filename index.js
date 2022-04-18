const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

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
    ]
}

// Listagem de todos os games
app.get("/games", (req,res) => {
    res.statusCode = 200 // Sucesso
    res.json(DB.games)
})

// Listagem unica 
app.get("/game/:id", (req,res) => {
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
app.post("/game", (req,res) => {
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
app.delete("/game/:id", (req, res) => {

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
app.put("/game/:id", (req, res) => {
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

app.listen(8080, () => {
    console.log("API RODANDO")
})