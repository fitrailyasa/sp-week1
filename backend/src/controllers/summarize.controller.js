const axios = require('axios');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL_NAME = process.env.MODEL_NAME || 'deepseek-r1';

// Fungsi untuk memanggil Ollama API dan mendapatkan ringkasan
const getSummaryFromOllama = async (textContent) => {
  return new Promise((resolve, reject) => {
    let summary = '';

    axios
      .post(
        `${OLLAMA_URL}/api/generate`,
        {
          model: MODEL_NAME,
          prompt: `Ringkaslah dokumen berikut, maksimal 50 kata:\n\n${textContent}`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'stream',
        }
      )
      .then((response) => {
        response.data.on('data', (chunk) => {
          const chunkString = chunk.toString();
          const chunkData = JSON.parse(chunkString);
          summary += chunkData.response;
        });

        response.data.on('end', () => resolve(summary));
        response.data.on('error', (error) => reject(new Error(`Ollama API error: ${error.message}`)));
      })
      .catch((error) => reject(new Error(`Failed to call Ollama API: ${error.message}`)));
  });
};

// Controller untuk menangani upload dan ringkasan dokumen
const summarizeDocument = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = path.join(__dirname, '../uploads', req.file.filename);

  try {
    // eslint-disable-next-line
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const textContent = pdfData.text.trim();

    if (!textContent) throw new Error('PDF file is empty or could not be parsed');

    // eslint-disable-next-line no-console
    console.log('Extracted Text:', textContent.substring(0, 500));

    const summary = await getSummaryFromOllama(textContent);
    res.json({ summary });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing document:', error.message);
    res.status(500).json({ error: error.message || 'Failed to process document' });
  } finally {
    // eslint-disable-next-line
    fs.unlink(filePath, (err) => {
      // eslint-disable-next-line no-console
      if (err) console.error('Failed to delete file:', err);
    });
  }
};

module.exports = { summarizeDocument };
