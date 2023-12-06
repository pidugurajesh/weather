<?php
// Database connection parameters
$hostname = "localhost";
$username = "root";
$password = "Gopi@123";
$database = "ProjectW";

// Create a connection to the database
$conn = new mysqli($hostname, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$gmail = $_POST['gmail'];
$password = $_POST['password'];

// Prepare and execute the SQL query
$query = "INSERT INTO users (gmail, password) VALUES ('$gmail', '$password')";
if ($conn->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
