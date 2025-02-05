import express from "express";
import path from "path";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";




const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = "https://openlibrary.org/subjects";


app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    res.render("index.ejs");
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
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server running from ${port}`);
})