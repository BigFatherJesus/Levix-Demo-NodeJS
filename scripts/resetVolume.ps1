# PowerShell script to turn the system volume back on
$volume = New-Object -ComObject WScript.Shell

# Send "volume up" key once
$volume.SendKeys([char]175)