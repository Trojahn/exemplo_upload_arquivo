const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/arquivo", require("./rotas/arquivo"))

app.listen(port, () => {
    console.log(`Executando na porta ${port}`);
});