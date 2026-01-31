#!/usr/bin/env pwsh
# Build static site into dist/ and create dist\nexus-site.zip
Set-StrictMode -Version Latest
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$root = Split-Path -Parent $scriptDir
Push-Location $root

$dist = Join-Path $root 'scripts/dist'
if(Test-Path $dist){ Remove-Item $dist -Recurse -Force }
New-Item $dist -ItemType Directory | Out-Null

$items = @('index.html','css','js','assets','systems','app-coming-soon.html','README.md','DEPLOY.md')
foreach($i in $items){
  $p = Join-Path $root $i
  if(Test-Path $p){
    Write-Output "Copying $i"
    Copy-Item -Path $p -Destination $dist -Recurse -Force
  } else {
    Write-Output "Skipping missing: $i"
  }
}

$zip = Join-Path $root 'scripts/dist/nexus-site.zip'
if(Test-Path $zip){ Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path $dist '*') -DestinationPath $zip -Force
Write-Output "Built: $zip"

Pop-Location
