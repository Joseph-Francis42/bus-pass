const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buspass';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Basic models
const PassSchema = new mongoose.Schema({
  user: String,
  date: String,
  fromLocation: String,
  toLocation: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Pass = mongoose.model('Pass', PassSchema);

const SettingSchema = new mongoose.Schema({
  globalCapacity: { type: Number, default: 40 }
});
const Setting = mongoose.model('Setting', SettingSchema);

// API Routes
app.get('/api/passes', async (req, res) => {
  try {
    const passes = await Pass.find().sort({ createdAt: -1 });
    res.json(passes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/passes', async (req, res) => {
  try {
    const { user, date, fromLocation, toLocation } = req.body;
    
    let setting = await Setting.findOne();
    const capacity = setting ? setting.globalCapacity : 40;
    const bookedCount = await Pass.countDocuments({ date, toLocation, status: 'Active' });
    if (bookedCount >= capacity) {
      return res.status(400).json({ error: 'No more booking available! Seats are full for this route on this date.' });
    }

    const newPass = new Pass({ user, date, fromLocation, toLocation });
    await newPass.save();
    res.status(201).json(newPass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/passes/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedPass = await Pass.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedPass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/settings', async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) setting = await new Setting().save();
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();
    setting.globalCapacity = req.body.globalCapacity;
    await setting.save();
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend static build files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
