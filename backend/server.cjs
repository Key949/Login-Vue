const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const users = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf-8"));


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, name: user.name });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
