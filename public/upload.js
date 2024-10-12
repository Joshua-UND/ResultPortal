// Handle file input and preview
document.getElementById('uploadArea').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const fileDetails = document.getElementById('fileDetails');
    const file = event.target.files[0];
    if (file) {
        fileDetails.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const iframe = document.getElementById('pdfPreview');
            iframe.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('uploadButton').addEventListener('click', () => {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload-result', true);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            document.getElementById('progressBar').style.width = percentComplete + '%';
            document.getElementById('progressBar').textContent = percentComplete + '%';
        }
    });

    xhr.onload = () => {
        if (xhr.status === 200) {
            try {
                const response = xhr.responseText;
                alert(response); // Displaying the success message or error message
            } catch (e) {
                alert('An error occurred while parsing the server response.');
            }
        } else {
            try {
                const response = JSON.parse(xhr.responseText);
                alert('Error: ' + response.message || 'An error occurred while uploading the file.');
            } catch (e) {
                alert('An error occurred while parsing the server response.');
            }
        }
    };

    xhr.onerror = () => {
        alert('Request failed.');
    };

    xhr.send(formData);
});

// Fetch students by level and populate dropdown
document.addEventListener('DOMContentLoaded', () => {
    // Fetch students by level and populate dropdown
    document.getElementById('levelSelect').addEventListener('change', async (event) => {
        const level = event.target.value;
        console.log(`Fetching students for level: ${level}`); // Debug line

        try {
            const response = await fetch(`/api/students/${level}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const students = await response.json();
            console.log('Students fetched:', students); // Debug line

            const studentSelect = document.getElementById('studentSelect');
            studentSelect.innerHTML = '';
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.matric_number;
                option.textContent = `${student.name} (${student.matric_number})`;
                studentSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching students:', error);
            alert('Error fetching students. Please check the console for details.');
        }
    });
});
