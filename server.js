const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const connection = require('./src/database/database')
const Pergunta = require('./src/Models/Pergunta')
const Resposta = require('./src/Models/Resposta')

/**
 * Para Outras versões mysql usar rodar a seguinte query
 * alter user 'root'@'localhost' identified with mysql_native_password by 'senha do root'
 *
 *
 * Testar conexão com o banco
 * connection
 *   .authenticate()
 *   .then(() => {
 *       console.log('Conectado com sucesso')
 *   })
 *   .catch((msgError) => {
 *       console.log(msgError)
 *   })
 *
 */

/**
 * Configurando o ejs com express
 */
app.set('view engine', 'ejs')

/**
 * Permitindo arquivos estáticos nas paginas ejs e apontado o caminho da pasta.
 */
app.use(express.static(path.resolve(__dirname, 'src', 'public')))

/**
 * Configurando o caminho da pasta view
 */
app.set('views', path.resolve(__dirname, 'src', 'views'))

//  Receber parâmetros de formulário
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    /**
     * Para recuperar os dados do banco
     * método findAll()
     * config raw: true ele busca somente os dados
     */
    Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(
        (perguntas) => {
            res.render('index', {
                perguntas: perguntas,
            })
        }
    )
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/save_ask', (req, res) => {
    const title = req.body.title
    const desc = req.body.desc
    /**
     * Para inserir os dados no banco com sequelize
     * Usar o modelo que foi criado com o método create()
     */
    Pergunta.create({
        title: title,
        describe: desc,
    }).then(() => {
        res.redirect('/')
    })
})

/**
 * Rota para visualizar um pergunta
 */
app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id
    /**
     * findOne -> busca na tabela um único registro com condições
     */
    Pergunta.findOne({
        where: { id: id },
    }).then((pergunta) => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']],
            }).then((respostas) => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas,
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

/**
 * Rota para gravar um resposta para pergunta
 */

app.post('/responder', (req, res) => {
    const corpo = req.body.corpo
    const idPergunta = req.body.idPergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: idPergunta,
    }).then(() => {
        res.redirect(`/pergunta/${idPergunta}`)
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
