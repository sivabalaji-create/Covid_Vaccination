const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Vaccination_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Create a schema for the user
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Create the Express app
const app = express();

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use(cors());

// ...

// Handle signup form submission
app.post('/signup', (req, res) => {
  const { email, password, role } = req.body;

  // Create a new user based on the submitted data
  const user = new User({ email, password, role });

  // Save the user to the database
  user.save()
    .then(() => {
      res.send('Signup successful');
    })
    .catch((error) => {
      res.status(500).send('Signup failed');
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email in the database
  User.findOne({ email })
    .then((user) => {
      // Check if a user with the given email exists
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Check if the provided password matches the stored password
      if (password !== user.password) {
        return res.status(401).send('Invalid password');
      }

      // Login successful
      if (user.role === 'admin') {
        res.send({ role: 'admin' });
      } else if (user.role === 'user') {
        res.send({ role: 'user' });
      } else {
        res.status(400).json({ error: 'Invalid user role' });
      }
    })
    .catch((error) => {
      res.status(500).send('Login failed');
    });
});

// Define a schema for the data
const centreSchema = new mongoose.Schema({
  centreName: String,
  location: String,
  capacity: Number,
  startTime: String,
  endTime: String
});
const Centre = mongoose.model('Centre', centreSchema);

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Handle form submission
app.post('/addCentre', (req, res) => {
  const { centreName, location, capacity, startTime, endTime } = req.body;

  // Create a new Centre document
  const newCentre = new Centre({
    centreName,
    location,
    capacity,
    startTime,
    endTime
  });

  // Save the document to the database
  newCentre.save()
    .then(() => {
      res.status(200).json({ message: 'Centre added to database' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error saving to database', errorMessage: error.message });
    });
});


//Route for removing a vaccination centre
app.post('/removeCentre', async (req, res) => {
  try {
    const { centreId } = req.body;

    // Find and remove the centre with the provided ID
    const removedCentre = await centres.findByIdAndRemove(centreId);

    if (!removedCentre) {
      res.status(404).send('Centre not found');
      return;
    }

    // Return the removed centre in the response
    res.status(200).json(removedCentre);
  } catch (error) {
    console.error('Failed to remove vaccination centre', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/centers', (req, res) => {
  // Retrieve all vaccination centers from the database
  Centre.find()
    .then((centers) => {
      res.status(200).json(centers);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving vaccination centers', errorMessage: error.message });
    });
});

app.post('/bookSlot', (req, res) => {
  // Example response
  res.json({ message: 'Slot booked successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


