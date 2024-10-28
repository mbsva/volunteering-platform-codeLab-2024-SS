const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const db = require('./services/database');
const routes = require('./routes/index'); // Подключение ваших маршрутов API

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname,'public/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Importing and using cookie-parser middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// API routes
app.use('/api', routes);

// Auth and offer routes
app.use('/auth', authRoutes);
app.use('/offers', offerRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});
