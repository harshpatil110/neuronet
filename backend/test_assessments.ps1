# Test Script for Assessment API - STEP 5
Write-Host "=== Testing NeuroNet Assessment API ===" -ForegroundColor Cyan

# 1. Login to get token
Write-Host "`n1. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "testpass123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8000/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.access_token
    Write-Host "✅ Login successful! Token: $($token.Substring(0,30))..." -ForegroundColor Green
} catch {
    Write-Host "❌ Login failed: $_" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
}

# 2. Get assessment types
Write-Host "`n2. Getting assessment types..." -ForegroundColor Yellow
try {
    $types = Invoke-RestMethod -Uri "http://localhost:8000/assessments/types" -Headers $headers
    Write-Host "✅ Assessment Types:" -ForegroundColor Green
    $types | ConvertTo-Json -Depth 3 | Write-Host
} catch {
    Write-Host "❌ Failed to get types: $_" -ForegroundColor Red
}

# 3. Get PHQ-9 questions
Write-Host "`n3. Getting PHQ-9 questions..." -ForegroundColor Yellow
try {
    $phq9 = Invoke-RestMethod -Uri "http://localhost:8000/assessments/PHQ-9/questions" -Headers $headers
    Write-Host "✅ PHQ-9 Questions (showing first 3):" -ForegroundColor Green
    $phq9[0..2] | ConvertTo-Json -Depth 3 | Write-Host
    Write-Host "Total questions: $($phq9.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to get PHQ-9: $_" -ForegroundColor Red
}

# 4. Get GAD-7 questions
Write-Host "`n4. Getting GAD-7 questions..." -ForegroundColor Yellow
try {
    $gad7 = Invoke-RestMethod -Uri "http://localhost:8000/assessments/GAD-7/questions" -Headers $headers
    Write-Host "✅ GAD-7 Questions (showing first 3):" -ForegroundColor Green
    $gad7[0..2] | ConvertTo-Json -Depth 3 | Write-Host
    Write-Host "Total questions: $($gad7.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to get GAD-7: $_" -ForegroundColor Red
}

# 5. Submit PHQ-9 assessment (simulate low risk)
Write-Host "`n5. Submitting PHQ-9 assessment (low risk)..." -ForegroundColor Yellow
$phq9Submission = @{
    type = "PHQ-9"
    responses = @(
        @{question_id = 1; score = 0}
        @{question_id = 2; score = 1}
        @{question_id = 3; score = 0}
        @{question_id = 4; score = 1}
        @{question_id = 5; score = 0}
        @{question_id = 6; score = 1}
        @{question_id = 7; score = 0}
        @{question_id = 8; score = 0}
        @{question_id = 9; score = 0}
    )
} | ConvertTo-Json -Depth 3

try {
    $result = Invoke-RestMethod -Uri "http://localhost:8000/assessments/submit" -Method POST -Headers $headers -Body $phq9Submission -ContentType "application/json"
    Write-Host "✅ PHQ-9 Result:" -ForegroundColor Green
    $result | ConvertTo-Json | Write-Host
} catch {
    Write-Host "❌ Failed to submit PHQ-9: $_" -ForegroundColor Red
}

# 6. Submit GAD-7 assessment (simulate moderate risk)
Write-Host "`n6. Submitting GAD-7 assessment (moderate risk)..." -ForegroundColor Yellow
$gad7Submission = @{
    type = "GAD-7"
    responses = @(
        @{question_id = 1; score = 2}
        @{question_id = 2; score = 2}
        @{question_id = 3; score = 1}
        @{question_id = 4; score = 2}
        @{question_id = 5; score = 1}
        @{question_id = 6; score = 2}
        @{question_id = 7; score = 1}
    )
} | ConvertTo-Json -Depth 3

try {
    $result = Invoke-RestMethod -Uri "http://localhost:8000/assessments/submit" -Method POST -Headers $headers -Body $gad7Submission -ContentType "application/json"
    Write-Host "✅ GAD-7 Result:" -ForegroundColor Green
    $result | ConvertTo-Json | Write-Host
} catch {
    Write-Host "❌ Failed to submit GAD-7: $_" -ForegroundColor Red
}

# 7. Get assessment history
Write-Host "`n7. Getting assessment history..." -ForegroundColor Yellow
try {
    $history = Invoke-RestMethod -Uri "http://localhost:8000/assessments/history" -Headers $headers
    Write-Host "✅ Assessment History:" -ForegroundColor Green
    $history | ConvertTo-Json -Depth 3 | Write-Host
} catch {
    Write-Host "❌ Failed to get history: $_" -ForegroundColor Red
}

Write-Host "`n=== All Tests Complete ===" -ForegroundColor Cyan
