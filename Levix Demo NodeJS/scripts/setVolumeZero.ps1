$volume = New-Object -ComObject WScript.Shell

# Send "volume up" key once
$volume.SendKeys([char]175)

# Mute the audio
$volume.SendKeys([char]173)
