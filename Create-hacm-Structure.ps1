# ============================================================
# SCRIPT: Create-HACM-Structure.ps1
# PURPOSE: Create the folder structure for the HACM Next.js pitch site
# USAGE: Run from the project root folder (HACM/)
# ============================================================

# --- CONFIGURATION ---
$PROJECT_NAME = "hacm"
$CURRENT_DIR = Get-Location

# --- COLOR OUTPUT HELPER ---
function Write-Success { Write-Host "[OK]" -ForegroundColor Green -NoNewline; Write-Host " $args" }
function Write-Info { Write-Host "[i]" -ForegroundColor Cyan -NoNewline; Write-Host " $args" }
function Write-Creating { Write-Host "[+]" -ForegroundColor Yellow -NoNewline; Write-Host " $args" }
function Write-Error { Write-Host "[X]" -ForegroundColor Red -NoNewline; Write-Host " $args" }

# --- HEADER ---
Clear-Host
Write-Host "============================================================" -ForegroundColor White
Write-Host "  CREATE HACM PITCH SITE FOLDER STRUCTURE" -ForegroundColor White
Write-Host "  Project: $PROJECT_NAME" -ForegroundColor White
Write-Host "  Location: $CURRENT_DIR" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor White
Write-Host ""

# --- VERIFY CURRENT DIRECTORY ---
$dirName = Split-Path $CURRENT_DIR -Leaf
if ($dirName -ne $PROJECT_NAME) {
    Write-Error "Current directory is '$dirName', not '$PROJECT_NAME'"
    Write-Error "Please run this script from the '$PROJECT_NAME' project root"
    Write-Host ""
    Write-Host "Example:" -ForegroundColor White
    Write-Host "  cd C:\path\to\HACM" -ForegroundColor Cyan
    Write-Host "  .\Create-HACM-Structure.ps1" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Success "Running from correct directory: $CURRENT_DIR"
Write-Host ""

# --- CREATE FOLDERS ---
Write-Creating "Creating folder structure..."

$FOLDERS = @(
    "app",
    "app/components",
    "app/components/sections",
    "app/components/ui",
    "app/data",
    "app/lib",
    "app/styles",
    "app/public",
    "app/public/images",
    "app/public/fonts"
)

foreach ($folder in $FOLDERS) {
    $fullPath = Join-Path $CURRENT_DIR $folder
    New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    Write-Creating "  $folder/"
}
Write-Success "Folders created"

# --- CREATE COMPONENT FILES ---
Write-Host ""
Write-Creating "Creating component files..."

$COMPONENTS = @(
    "app/components/sections/Hero.tsx",
    "app/components/sections/Problem.tsx",
    "app/components/sections/Approach.tsx",
    "app/components/sections/Results.tsx",
    "app/components/sections/Bridge.tsx",
    "app/components/sections/CTA.tsx",
    "app/components/sections/Footer.tsx",
    "app/components/ui/Navigation.tsx",
    "app/components/ui/ExportButton.tsx",
    "app/components/ui/ResolutionBadge.tsx",
    "app/components/ui/AnimatedSection.tsx"
)

foreach ($file in $COMPONENTS) {
    $fullPath = Join-Path $CURRENT_DIR $file
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
    Write-Creating "  $file"
}
Write-Success "Component files created"

# --- CREATE LIB FILES ---
Write-Host ""
Write-Creating "Creating library files..."

$LIB_FILES = @(
    "app/lib/export.ts",
    "app/lib/utils.ts"
)

foreach ($file in $LIB_FILES) {
    $fullPath = Join-Path $CURRENT_DIR $file
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
    Write-Creating "  $file"
}
Write-Success "Library files created"

# --- CREATE DATA FILE ---
Write-Host ""
Write-Creating "Creating data file..."

$DATA_FILE = Join-Path $CURRENT_DIR "app/data/content.json"
New-Item -ItemType File -Path $DATA_FILE -Force | Out-Null
Write-Creating "  app/data/content.json"
Write-Success "Data file created"

# --- CREATE STYLE FILE ---
Write-Host ""
Write-Creating "Creating style file..."

$STYLE_FILE = Join-Path $CURRENT_DIR "app/styles/globals.css"
New-Item -ItemType File -Path $STYLE_FILE -Force | Out-Null
Write-Creating "  app/styles/globals.css"
Write-Success "Style file created"

# --- CREATE APP ROUTE FILES ---
Write-Host ""
Write-Creating "Creating app route files..."

$ROUTE_FILES = @(
    "app/layout.tsx",
    "app/page.tsx"
)

foreach ($file in $ROUTE_FILES) {
    $fullPath = Join-Path $CURRENT_DIR $file
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
    Write-Creating "  $file"
}
Write-Success "App route files created"

# --- CREATE ROOT CONFIG FILES ---
Write-Host ""
Write-Creating "Creating root configuration files..."

$ROOT_FILES = @(
    "package.json",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "next.config.js",
    ".env.local",
    ".gitignore",
    "README.md"
)

foreach ($file in $ROOT_FILES) {
    $fullPath = Join-Path $CURRENT_DIR $file
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
    Write-Creating "  $file"
}
Write-Success "Root configuration files created"

# --- CREATE PUBLIC ASSETS ---
Write-Host ""
Write-Creating "Creating public asset placeholders..."

$FAVICON = Join-Path $CURRENT_DIR "app/public/favicon.ico"
New-Item -ItemType File -Path $FAVICON -Force | Out-Null
Write-Creating "  app/public/favicon.ico"

# --- GENERATE FILE TREE ---
Write-Host ""
Write-Host "============================================================" -ForegroundColor White
Write-Host "  FILE TREE" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor White
Write-Host ""

Get-ChildItem -Path $CURRENT_DIR -Recurse | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
    $relativePath = $_.FullName.Substring($CURRENT_DIR.Length + 1)
    Write-Host "  [F] $relativePath" -ForegroundColor Gray
}

# --- SUMMARY ---
Write-Host ""
Write-Host "============================================================" -ForegroundColor White
Write-Host "  SUMMARY" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor White
Write-Host ""

Write-Success "Project structure created: $PROJECT_NAME"
$folderCount = (Get-ChildItem -Path $CURRENT_DIR -Directory -Recurse).Count
$fileCount = (Get-ChildItem -Path $CURRENT_DIR -File -Recurse).Count
Write-Info "Total folders: $folderCount"
Write-Info "Total files: $fileCount"
Write-Info "Location: $CURRENT_DIR"

Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. npm install" -ForegroundColor Cyan
Write-Host "  2. npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================================" -ForegroundColor White
Write-Host ""

# --- OPTIONAL: OPEN IN EXPLORER ---
$openExplorer = Read-Host "Open folder in Explorer? (y/n)"
if ($openExplorer -eq "y") {
    explorer $CURRENT_DIR
}

Write-Host ""
Write-Host "Done." -ForegroundColor Green