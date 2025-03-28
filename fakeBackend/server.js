import express from "express";
import axios from "axios";

const app = express();

const CLIENT_ID = "292873859536-1u25lkime9rs1332aqq0oi7rgpmoirfj.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5000/callback";

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = response.data;
    res.redirect(`http://localhost:8080/callback?token=${access_token}`);
  } catch (error) {
    console.error("Erro:", error.response ? error.response.data : error.message);
    res.status(500).send("Erro ao autenticar");
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));