<?php
/**
 * Techlink contact form → info@techlinklimited.co.ke
 * Deployed with the static site to cPanel (public/ → site root).
 */
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
	exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
	$data = $_POST;
}

// Honeypot — bots fill this; humans never see it
if (!empty($data['company_website'])) {
	http_response_code(200);
	echo json_encode(['ok' => true]);
	exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$inquiry = trim((string) ($data['inquiry'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$errors = [];
if ($name === '' || mb_strlen($name) > 120) {
	$errors[] = 'Please enter your full name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
	$errors[] = 'Please enter a valid email address.';
}
if ($phone === '' || mb_strlen($phone) > 40) {
	$errors[] = 'Please enter a phone number.';
}
if ($inquiry === '' || $inquiry === '0' || strcasecmp($inquiry, 'Your inquiry about') === 0) {
	$errors[] = 'Please select what your inquiry is about.';
}
if ($message === '' || mb_strlen($message) > 5000) {
	$errors[] = 'Please enter a message.';
}

if ($errors) {
	http_response_code(422);
	echo json_encode(['ok' => false, 'error' => $errors[0], 'errors' => $errors]);
	exit;
}

// Test recipient — switch back to info@techlinklimited.co.ke before go-live
$to = 'arnoldmangeli7@gmail.com';
$subject = 'Website contact: ' . $inquiry;

$body = "New message from the Techlink website contact form\n";
$body .= "================================================\n\n";
$body .= 'Name:     ' . $name . "\n";
$body .= 'Email:    ' . $email . "\n";
$body .= 'Phone:    ' . $phone . "\n";
$body .= 'Inquiry:  ' . $inquiry . "\n\n";
$body .= "Message:\n" . $message . "\n\n";
$body .= "------------------------------------------------\n";
$body .= 'Sent: ' . gmdate('Y-m-d H:i:s') . " UTC\n";
$body .= 'IP:   ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$fromHost = $_SERVER['HTTP_HOST'] ?? 'techlinklimited.co.ke';
$fromHost = preg_replace('/^www\./', '', $fromHost);
$fromAddress = 'noreply@' . $fromHost;

$headers = [
	'MIME-Version: 1.0',
	'Content-Type: text/plain; charset=UTF-8',
	'From: Techlink Website <' . $fromAddress . '>',
	'Reply-To: ' . $name . ' <' . $email . '>',
	'X-Mailer: Techlink-ContactForm',
];

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$ok) {
	http_response_code(500);
	echo json_encode([
		'ok' => false,
		'error' => 'Unable to send your message right now. Please email info@techlinklimited.co.ke directly.',
	]);
	exit;
}

http_response_code(200);
echo json_encode(['ok' => true, 'message' => 'Thank you. Your message has been sent.']);
