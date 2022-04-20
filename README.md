# API de Games
Descrição

## Endpoints

### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados
#### Parametros
Nenhum
#### Respostas
##### OK! 200


Caso essa resposta aconteça você vai receber a listagem de todos os games
Exemplo de resposta
```
{
    "user": {
        "id": 1,
        "email": "ezequiel@gmail.com"
    },
    "games": [
        {
            "id": 23,
            "title": "Call od duty",
            "year": 2019,
            "price": 60
        },
        {
            "id": 20,
            "title": "Minecraft ",
            "year": 2020,
            "price": 100
        },
        {
            "id": 13,
            "title": "Valorant",
            "year": 2018,
            "price": 50
        }
    ]
}
```
#### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falaha durante o processo de autenticação da requisição. Motivos: Token inválido, Token inspirado

Exemplo de resposta
```
{
    "err": "Token invalido"
}
```

### POST /auth
Esse endpoint é responsável por fazer o processo de login
#### Parametros
Email: Email do usuário
Password: Senha do usuário cadastrado

Exemplo
```
{
    "email":"ezequiel@gmail.com",
    "password":"nodes2"
}
```
#### Respostas
##### OK! 200


Caso essa resposta aconteça você vai receber a listagem de todos os games
Exemplo de resposta
```
{
    "user": {
        "id": 1,
        "email": "ezequiel@gmail.com"
    },
    "games": [
        {
            "id": 23,
            "title": "Call od duty",
            "year": 2019,
            "price": 60
        },
        {
            "id": 20,
            "title": "Minecraft ",
            "year": 2020,
            "price": 100
        },
        {
            "id": 13,
            "title": "Valorant",
            "year": 2018,
            "price": 50
        }
    ]
}
```
#### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falaha durante o processo de autenticação da requisição. Motivos: Senha ou email errados

Exemplo de resposta
```
{
    "err": "Credenciais invalidas!"
}
```

