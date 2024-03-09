# PowerShell script to disable OneDrive on system startup
$OneDriveProcess = Get-Process "OneDrive" -ErrorAction SilentlyContinue

if ($OneDriveProcess) {
    Stop-Process -Name "OneDrive" -Force
}

# Disable OneDrive from starting up by renaming the OneDriveSetup
$OneDriveSetupPath = "$env:SYSTEMROOT\SysWOW64\OneDriveSetup.exe"
$OneDriveBackupPath = "$env:SYSTEMROOT\SysWOW64\OneDriveSetup.bak.exe"

if (Test-Path $OneDriveSetupPath) {
    Rename-Item $OneDriveSetupPath $OneDriveBackupPath
    # Log the status after renaming
    if (Test-Path $OneDriveBackupPath) {
        Write-Output 'OneDriveSetup.exe renamed to OneDriveSetup.bak.exe successfully.'
    } else {
        Write-Output 'Failed to rename OneDriveSetup.exe to OneDriveSetup.bak.exe.'
    }
} else {
    Write-Output 'OneDriveSetup.exe does not exist.'
}

# Output the status for verification
$IsOneDriveDisabled = -not (Test-Path $OneDriveSetupPath)
Write-Output $IsOneDriveDisabled
