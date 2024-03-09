# PowerShell script to enable OneDrive on system startup
$OneDriveBackupPath = "$env:SYSTEMROOT\SysWOW64\OneDriveSetup.bak.exe"
$OneDriveSetupPath = "$env:SYSTEMROOT\SysWOW64\OneDriveSetup.exe"

if (Test-Path $OneDriveBackupPath) {
    Rename-Item $OneDriveBackupPath $OneDriveSetupPath
    # Check if the rename operation was successful
    if (Test-Path $OneDriveSetupPath) {
        Write-Host 'OneDrive executable has been renamed back to its original state.'
    } else {
        Write-Host 'Failed to rename the OneDrive backup to the original executable.'
    }
} else {
    Write-Host 'Backup OneDrive executable (.bak) does not exist.'
}

# Output the status for verification
$IsOneDriveEnabled = Test-Path $OneDriveSetupPath
Write-Output $IsOneDriveEnabled

# Wait for user input before closing the script window
Write-Host 'Press any key to continue...'
$x = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')