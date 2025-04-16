# Stage all changes
git add .

# Commit changes with a message
git commit -m "made main projects and posts pages mobile-compatible"

# Push commits to the remote repository
git push

# Build the project
npm run build

# Create a .nojekyll file in the out folder
New-Item -Path "out\.nojekyll" -ItemType File -Force

# Deploy the project
npm run deploy
