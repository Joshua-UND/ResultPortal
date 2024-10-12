document.getElementById('addStudentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        matric_number: document.getElementById('matricNumber').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        level: document.getElementById('level').value,
        semester: document.getElementById('semester').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('/api/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Student added successfully.');
            document.getElementById('addStudentForm').reset(); // Clear the form
        } else {
            alert('Failed to add student.');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        alert('An error occurred while adding the student.');
    }
});
