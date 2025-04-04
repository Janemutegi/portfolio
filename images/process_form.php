<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "your_mysql_password";
$dbname = "portfolio";
$port = 3308; // Your MySQL port

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$date = $_POST['date'];
$gender = $_POST['department']; // Note: your form uses 'department' for gender
$program = $_POST['program_status']; // Note: your form uses 'program status'
$message = $_POST['message'];

// Prepare and bind to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO myportfolio (fullname, email, phone, contact_date, gender, program_specialization, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $fullname, $email, $phone, $date, $gender, $program, $message);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
    // Redirect back to your form page
    header("Location: your_form_page.html?status=success");
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>