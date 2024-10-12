const express = require('express');
const path = require('path');
const uploadRoutes = require('./Routes/uploadRoutes');
const dashboardRoute = require('./Routes/dashboardRoute');
const addStudentRoutes = require('./Routes/addStudentRoutes');
const loginRoutes = require('./Routes/loginRoute');
const templateRoute = require('./Routes/templateRoute');
const notificationRoute = require('./Routes/notificationRoutes');
const studentsRoute = require('./Routes/studentsRoute');
const session = require('express-session'); 
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});


app.get('/admin', (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/admin.html'));
});

app.get('/notifications', (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/notifications.html'));
});

app.get('/studentPortal', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/studentPortal.html'));
});

app.get('/upload', (req, res) => {
    if (!req.session.admin) { 
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/upload.html'));
});

app.get('/addStudent', (req, res) => {
    if (!req.session.admin) { 
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/addStudent.html'));
});

app.get('/students', (req, res) => {
    if (!req.session.admin) { 
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/students.html'));
});

app.use('/api', uploadRoutes);
app.use('/api', dashboardRoute);
app.use('/api', addStudentRoutes);
app.use('/api', loginRoutes);
app.use('/', templateRoute);
app.use('/', notificationRoute);
app.use('/', studentsRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
