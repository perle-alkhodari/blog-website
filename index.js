import express from "express"
import {dirname} from "path"
import {fileURLToPath} from "url"
import bodyParser from "body-parser"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3333;
const views = __dirname + "/views";

var blogs = {
    "title": "story",
    "title2": "story2"
}

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use((req, res, next) => {
    res.locals = {
        blogs: blogs,
    }
    next();
})


// get routes
app.get("/home", (req, res) =>{

    res.render(views + "/index.ejs");
})

app.get("/create", (req,res) => {
    res.render(views + "/create.ejs")
})

app.get("/delete", (req, res) => {
    res.render(views + "/delete.ejs");
})

app.get("/edit", (req, res) => {
    res.render(views + "/edit.ejs");
})

// post routes
app.post("/post", (req, res) => {

    var body = req.body;
    var t = body.title;
    var s = body.summary;

    blogs[t] = s;

    res.render(views + "/index.ejs");
})

app.post("/del", (req, res) => {
    var t = req.body.title;

    if (t in blogs) {
        delete blogs[t];
        res.render(views + "/index.ejs");
    }
    else {
        res.render(views + "/delete.ejs", {notFound: true});
    }

})

app.post("/change-post", (req, res) => {
    var t = req.body.title;

    if (t in blogs) {
        blogs[t] = req.body.summary;
        res.render(views + "/index.ejs");
    }
    else {
        res.render(views + "/edit.ejs", {notFound: true});
    }
})

app.listen(port, (req, res) => {
    console.log("listening to port " + port + ".");
})
