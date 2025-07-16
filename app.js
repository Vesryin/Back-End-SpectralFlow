const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = 'your-mongodb-atlas-connection-string';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Profile Schema
const profileSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
});
const Profile = mongoose.model('Profile', profileSchema);

// Routes
app.post('/api/profile', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const newProfile = new Profile({ fullName, email, password });
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
