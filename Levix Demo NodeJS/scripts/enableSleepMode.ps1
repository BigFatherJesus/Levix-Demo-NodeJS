# PowerShell script to enable sleep mode settings to default or user-preferred
powercfg -change -standby-timeout-ac 30
powercfg -change -standby-timeout-dc 30
powercfg -change -monitor-timeout-ac 10
powercfg -change -monitor-timeout-dc 10
