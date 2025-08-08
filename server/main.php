<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// Your existing code to fetch and serve the PDF
// url example: server/main.php?action=get-pdf
if (isset($_GET['action']) && $_GET['action'] == 'get-pdf') {
    $file = 'a.pdf';
    if (file_exists($file)) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . basename($file) . '"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));
        header('Accept-Ranges: bytes');
        @readfile($file);
        exit;
    } else {
        http_response_code(404);
        echo "File not found: a.pdf";
    }
} else {
    http_response_code(400);
    echo "Invalid request. Please use ?action=get-pdf";
}
?>
