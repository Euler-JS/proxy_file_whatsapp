const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

// Rota para retransmitir o áudio
app.get('/proxy-audio', async (req, res) => {
  const audioUrl = req.query.url; // O link do áudio será enviado como query param
  if (!audioUrl) {
    return res.status(400).send('URL do áudio não fornecida.');
  }
  try {
    const response = await axios.get(audioUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'audio/mpeg');
    response.data.pipe(res);
  } catch (error) {
    console.error('Erro no proxy:', error.message);
    res.status(500).send('Erro ao acessar o áudio.');
  }
});

app.get('/', async (req, res) => {
  return res.status(400).send('Proxy ativo ');
});

app.listen(port, () => {
  console.log(`Servidor proxy rodando em http://localhost:${port}`);
});
