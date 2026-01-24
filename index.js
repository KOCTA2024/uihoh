const { NOTFOUND } = require("dns")
const http = require("http")
const path = require("path")
let fs = require("fs")

let dataPath = path.join(__dirname, "data")

let server = http.createServer((req, res)=>{
    switch(req.url){
        case "/":

            getJokes(req, res)
        default:
            notFound(req, res)
    }
})

server.listen(3000, ()=>console.log("a"))

function notFound(req, res){
    res.status = 404
    res.end()
}

function getJokes(req, res){
    let jokesFiles = fs.readdirSync(dataPath)
    let jokes = []
    for(let i = 0; i<jokesFiles.length; i++){
        let pathToFile = path.join(dataPath, jokesFiles[i])
        let binary = fs.readFileSync(pathToFile)
        let str = Buffer.from(binary).toString()
        let obj = JSON.parse(str)
        obj.id = i
        jokes.push(obj)
    }
    res.writeHead(200, {"content-type" : "application/json", "encoding" : "utf-8"})
    res.end(JSON.stringify(jokes))
}