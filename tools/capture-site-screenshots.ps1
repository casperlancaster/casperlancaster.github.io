# Phase 3 - Capture PUBLIC homepages with Microsoft Edge.
# Usage from the repository root in PowerShell:
# powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\capture-site-screenshots.ps1
# Important: Inspect every resulting screenshot before publishing.

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $repoRoot 'images\web-projects'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$edgePaths = @()
if (${env:ProgramFiles(x86)}) {
  $edgePaths += Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe'
}
if ($env:ProgramFiles) {
  $edgePaths += Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe'
}
if ($env:LOCALAPPDATA) {
  $edgePaths += Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\Application\msedge.exe'
}
$edge = $edgePaths | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edge) {
  throw 'Microsoft Edge was not found. Open Edge manually and capture the PUBLIC homepages instead.'
}

$sites = @(
  @{ Name='Mel''s Simply Reclaimed'; Url='https://www.melssimplyreclaimed.com/'; File='melssimplyreclaimed.png' },
  @{ Name='Willow''s Melting Pot'; Url='https://www.willowsmeltingpot.com/'; File='willowsmeltingpot.png' },
  @{ Name='TruckzSim Web Platform'; Url='https://truckzsim.com/'; File='truckzsim-web.png' },
  @{ Name='June''s Creations'; Url='https://junescreations-llc.com/'; File='junescreations.png' },
  @{ Name='Cabdem Marketing LLC'; Url='https://www.cabdemmarketing.com/'; File='cabdemmarketing.png' }
)

foreach ($site in $sites) {
  $dest = Join-Path $outDir $site.File
  $tempProfile = Join-Path $env:TEMP ('cm-page-capture-' + [guid]::NewGuid().ToString('N'))
  Write-Host ('Capturing public homepage: ' + $site.Name)
  try {
    $arguments = @(
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--window-size=1440,900',
      '--virtual-time-budget=12000',
      ('--user-data-dir="' + $tempProfile + '"'),
      ('--screenshot="' + $dest + '"'),
      $site.Url
    )
    $process = Start-Process -FilePath $edge -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
    if ((Test-Path -LiteralPath $dest) -and ((Get-Item -LiteralPath $dest).Length -gt 10000)) {
      Write-Host ('Saved: ' + $dest) -ForegroundColor Green
    } else {
      Write-Warning ('Screenshot missing or too small for ' + $site.Name + '. Try opening its URL in Edge and capturing manually.')
    }
  } catch {
    Write-Warning ('Unable to capture ' + $site.Name + ': ' + $_.Exception.Message)
  } finally {
    if (Test-Path -LiteralPath $tempProfile) {
      Remove-Item -LiteralPath $tempProfile -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host ''
Write-Host 'IMPORTANT: Open each PNG and verify it is the REAL public site, not a browser error, bot check, login screen, or private data.' -ForegroundColor Yellow
Write-Host ('Screenshot folder: ' + $outDir)
Write-Host 'Keep ONLY approved public website images before committing.'
