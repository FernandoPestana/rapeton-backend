const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const multer = require('multer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 443,
    secure: true,
    auth: {
      user: 'ferpestana03@gmail.com',
      pass: 'zibbfmsriypjtroi',
    },
    tls: {
      rejectUnauthorized: false, // Agregar esto si se obtiene un error relacionado con certificados
    },
  });
  

  app.post('/sendInfo', upload.array('images'), (req, res) => {
    const { name, email, number, location, availability, song, name2, social } = req.body;
    const files = req.files; // Accede a los archivos cargados mediante req.files
  
    // Crea un arreglo de objetos adjuntos para nodemailer
    const attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer, // Utiliza el buffer del archivo
    }));
  
    const mailOptions = {
      from: 'ferpestana03@gmail.com',
      to: 'fernando.pestana@upb.edu.co',
      subject: 'Información Artistas Rapetón Approved',
      text: `Nombre: ${name}\nCorreo: ${email}\nNúmero: ${number}\nUbicación: ${location}\nFirma con algún sello: ${availability}\nCanción: ${song}\nNombre artista / Banda: ${name2}\nLink a redes: ${social}\n`,
      attachments: attachments, // Agrega los archivos adjuntos al correo
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error al enviar el correo');
      } else {
        console.log('Correo enviado: ' + info.response);
        res.send('Correo enviado correctamente');
      }
    });
  });

  app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
      from: 'ferpestana03@gmail.com',
      to: 'fernando.pestana@upb.edu.co',
      subject: 'Mensajes Rapetón Approved',
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('Error al enviar el correo');
        } else {
          console.log('Correo enviado: ' + info.response);
          res.send('Correo enviado correctamente');
        }
      });
    });

    app.listen(port, () => {
        console.log('Servidor Express iniciado en el puerto ', port);
      });