import express from "express";
import path from "path";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";




const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = "https://openlibrary.org/subjects";


app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    res.render("home.ejs");
})



app.get("/getbooks",async (req,res)=>{
    try{
        const category = req.query.subject;
        const response = await axios.get(URL+`/${category}.json?limit=10`);
        res.send(response.data.works);
    }
    catch(error){
        res.status(404).send();
    }
});

app.get("/categoryPage",(req,res)=>{
    res.render("index.ejs");
})

app.get("/bookdetails",async (req,res)=>{
    const bookId = req.query.key;
    try{
        const response = await axios.get("https://openlibrary.org"+`${bookId}.json`);
        const bookdetails = response.data;
        console.log(bookdetails);
        res.render("book",{details:bookdetails});
    }
    catch(error){
        console.log(error);
        res.redirect("/categoryPage");
    }
})

app.listen(port,()=>{
    console.log(`Server running from ${port}`);
})