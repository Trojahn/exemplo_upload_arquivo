const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const confMulter = multer({
  storage: multer.memoryStorage(),

  // Limite de 5MB (5 * 1024 * 1024 bytes)
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // Filtro para aceitar apenas imagens
  fileFilter: (req, file, cb) => {
    // Verifica se o tipo do arquivo começa com "image/" (ex: image/png, image/jpeg)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!')); // Rejeita
    }
  }
});


router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM arquivo ORDER BY data_upload");
    res.json(r.rows);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM arquivo WHERE id = $1", [req.params.id]);
    if (!r.rowCount) {
      return res.status(404).json({ erro: 'Imagem não encontrada no servidor.' });
    }
    const caminhoCompleto = path.join(__dirname, '../uploads', `${r.rows[0].id}${r.rows[0].extensao}`);
    if (fs.existsSync(caminhoCompleto)) {
      return res.sendFile(caminhoCompleto);
    } else {
      return res.status(404).json({ erro: 'Imagem não encontrada no servidor.' });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", confMulter.single("arquivo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "'arquivo' não enviado" });
    }

    const q = "INSERT INTO arquivo(nome_original, extensao) VALUES ($1, $2) RETURNING *"
    const r = await db.query(q, [req.file.originalname, path.extname(req.file.originalname)]);
    if (!r.rowCount) {
      return res.status(500).json({ msg: "Erro na inserção no banco de dados!" });
    }

    const idGerado = r.rows[0].id;
    const extensao = r.rows[0].extensao;

    const pastaDestino = path.join(__dirname, '../uploads');
    // Cria a pasta 'uploads' caso ela não exista
    if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino);
    }
    const nomeFinalDoArquivo = `${idGerado}${extensao}`;
    const caminhoCompleto = path.join(pastaDestino, nomeFinalDoArquivo);

    // Salva o arquivo no disco
    fs.writeFileSync(caminhoCompleto, req.file.buffer);

    res.json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM arquivo WHERE id = $1", [req.params.id]);
    if (!r.rowCount) {
      return res.status(404).json({ erro: 'Imagem não encontrada no servidor.' });
    }

    const caminhoCompleto = path.join(__dirname, '../uploads', `${r.rows[0].id}${r.rows[0].extensao}`);
    if (fs.existsSync(caminhoCompleto)) {
      fs.unlinkSync(caminhoCompleto);
    } else {
      return res.status(404).json({ erro: 'Imagem não encontrada no servidor.' });
    }

    const r2 = await db.query("DELETE FROM arquivo WHERE id = $1", [req.params.id]);
    return res.json({ msg: "'arquivo' deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;