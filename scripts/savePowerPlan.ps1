# Get the active power plan GUID from the registry
$activePlanGuid = Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Power\User\PowerSchemes' |
    Where-Object { $_.ActivePowerScheme -ne '00000000-0000-0000-0000-000000000000' } |
    ForEach-Object { $_.ActivePowerScheme }

if ($activePlanGuid -ne $null) {
    # Export the active power plan to a file
    powercfg -export "original_power_plan.pow" $activePlanGuid
    Write-Host "Power plan backup completed successfully."
} else {
    Write-Host "Failed to retrieve the GUID of the active power plan."
}
