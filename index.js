import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
    try {
      const response2 = await axios.get("https://bored-api.appbrewery.com/" + "filter?type=" + req.body.type + "&participants=" + req.body.participants );
      const tmp = response2.data;
      const result3 = tmp[Math.floor(Math.random() * tmp.length)];

      res.render("index.ejs", { data: result3 });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});