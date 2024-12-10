const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'changeme';

app.post('/auth/login', (req, res) => {
  const { username } = req.body;
  if(!username) return res.status(400).json({ error: 'Missing username' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/auth/validate', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('No token provided');
  }
  
  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    // Une fois le token validé, on ajoute l'en-tête
    // Supposons que decoded.userId soit défini
    res.set("X-User-Id", 1);

    res.status(200).send('OK');
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Auth service running on port ${port}`));
