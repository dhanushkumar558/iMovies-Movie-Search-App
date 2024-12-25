<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include "db.php";

// Retrieve filters from the query string
$genre = isset($_GET['genre']) ? $_GET['genre'] : 'All';
$year = isset($_GET['year']) ? $_GET['year'] : 'All';
$industry = isset($_GET['industry']) ? $_GET['industry'] : 'All';
$actor = isset($_GET['actor']) ? $_GET['actor'] : 'All';
$language = isset($_GET['language']) ? $_GET['language'] : 'All';

// Build the SQL query with filters
$query = "SELECT * FROM Movies WHERE 1=1";

if ($genre !== 'All') {
    $query .= " AND genre = '$genre'";
}
if ($year !== 'All') {
    $query .= " AND year = '$year'";
}
if ($industry !== 'All') {
    $query .= " AND industry = '$industry'";
}
if ($actor !== 'All') {
    $query .= " AND actor = '$actor'";
}
if ($language !== 'All') {
    $query .= " AND language = '$language'";
}

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $movies = [];
    while ($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
    echo json_encode($movies);
} else {
    echo json_encode([]);
}

$conn->close();
?>
