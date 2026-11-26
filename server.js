const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse HTML form data sent via POST requests
app.use(express.urlencoded({ extended: true }));

// In-memory data store
let attendees = [
  { id: 1, name: 'Rohan Sharma', role: 'Frontend Developer' },
  { id: 2, name: 'Priya Verma', role: 'Backend Engineer' }
];

// --------------------------------------------------
// ROUTES (6 Total: 4 GET routes + 2 POST routes)
// --------------------------------------------------

// 1. GET: Home Page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'DevSummit 2026',
    totalRegistered: attendees.length
  });
});

// 2. GET: About Page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About the Event',
    location: 'Agra, Uttar Pradesh'
  });
});

// 3. GET: Display Registration Form
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register Now' });
});

// 4. POST: Handle Form Submission & Add Attendee
app.post('/register', (req, res) => {
  const { name, role } = req.body;
  if (name && role) {
    attendees.push({
      id: Date.now(),
      name: name.trim(),
      role: role.trim()
    });
  }
  res.redirect('/attendees');
});

// 5. GET: View All Registered Attendees
app.get('/attendees', (req, res) => {
  res.render('attendees', {
    title: 'Registered Attendees',
    attendees
  });
});

// 6. POST: Clear All Attendees
app.post('/attendees/clear', (req, res) => {
  attendees = [];
  res.redirect('/attendees');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});