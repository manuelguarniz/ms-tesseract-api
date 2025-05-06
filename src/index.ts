import express, { Request, Response } from 'express';
import multer from 'multer';
import { execSync } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { PROPS } from './config/props.config';
import { HTTP_STATUS } from './commons/constant';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const app = express();
const upload = multer({ dest: './images' });

const dir = path.join(dirName, 'images');
console.log('buscando directorio...');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('se tuvo que crear el directorio:', dir);
}

app.post('/ocr', upload.single('image'), (req: Request, res: Response) => {
  console.log('Request recibido');
  try {
    console.log('Request recibido. Archivo:', req.file); // Debug
    if (!req.file) {
      console.log('Detalles de la petición:', req.headers, req.body); // Más debug
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'No se recibió ningún archivo' });
    }

    const imagePath = req.file.path;
    console.log('leyendo imagen de ...');
    console.log(imagePath);
    // const outputPath = path.join(__dirname, 'images', 'output.txt');

    execSync(`tesseract ${imagePath} ${imagePath} -l spa`, { stdio: 'inherit' });
    const text = fs.readFileSync(`${imagePath}.txt`, 'utf-8');

    fs.unlinkSync(imagePath);
    fs.unlinkSync(`${imagePath}.txt`);

    res.json({ text });

    /*
EJ Interdank\n
\n
¡Pago exitoso!\n
\n
S/ 495.00\n
\n
Enviado a:\n
\n
Newton Elmer lincoln Guarniz Cruz\n
924 311 010\n
\n
Destino:\n
\n
Plin\n
\n
Comisión:\n
GRATIS\n
\n
Fecha y hora:\n
01 May 2025 09:48 PM\n
\n
Código de operación:\n
01400154\n 
     */
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PROPS.PORT, () => {
  console.log('API Tesseract en http://localhost:3000');
});
