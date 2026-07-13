# Builds a Chrome Web Store upload zip containing only the runtime files, with
# forward-slash entry names (spec-compliant; Windows PowerShell's Compress-Archive
# writes backslashes, which some store validators reject).
# Usage:  powershell -ExecutionPolicy Bypass -File scripts/pack.ps1
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$repo = Split-Path -Parent $PSScriptRoot
$ver  = (Get-Content "$repo\manifest.json" | ConvertFrom-Json).version
$out  = "$repo\ai2web-chrome-$ver.zip"
if (Test-Path $out) { Remove-Item $out -Force }

$files = [ordered]@{
  "manifest.json"      = "$repo\manifest.json"
  "popup.html"         = "$repo\popup.html"
  "popup.css"          = "$repo\popup.css"
  "popup.js"           = "$repo\popup.js"
  "icons/icon-16.png"  = "$repo\icons\icon-16.png"
  "icons/icon-48.png"  = "$repo\icons\icon-48.png"
  "icons/icon-128.png" = "$repo\icons\icon-128.png"
}

$zip = [System.IO.Compression.ZipFile]::Open($out, [System.IO.Compression.ZipArchiveMode]::Create)
foreach ($name in $files.Keys) {
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
    $zip, $files[$name], $name, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
}
$zip.Dispose()
Write-Output "Built $out"
