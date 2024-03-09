$OneDriveAppDataPath = [System.Environment]::GetFolderPath('LocalApplicationData') + '\Microsoft\OneDrive\OneDrive.exe'
$OneDriveDisabledPath = [System.Environment]::GetFolderPath('LocalApplicationData') + '\Microsoft\OneDrive\OneDrive.disabled'

if (Test-Path $OneDriveAppDataPath) {
    Try {
        Rename-Item $OneDriveAppDataPath $OneDriveDisabledPath -ErrorAction Stop
        Write-Host 'OneDrive.exe has been renamed to OneDrive.disabled.'
    } Catch {
        Write-Host 'Failed to rename OneDrive.exe to OneDrive.disabled:'
        Write-Host $_.Exception.Message
    }
} else {
    Write-Host 'OneDrive.exe in AppData\Local\Microsoft\OneDrive does not exist or has already been renamed.'
}