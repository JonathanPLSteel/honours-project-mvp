#!/bin/bash

# Exit script on error
set -e

# Variables
HTML_FILE="dist/index.html"  # Update if your HTML output file is located elsewhere
DIST_FOLDER="dist"
MAIN_BRANCH="main"
GH_PAGES_BRANCH="gh-pages"
COMMIT_MESSAGE="Update build for deployment"

# Step 1: Build the project
echo "Building the project..."
npm run build

# Step 2: Check if the HTML file exists
if [[ ! -f "$HTML_FILE" ]]; then
    echo "Error: HTML file '$HTML_FILE' not found."
    exit 1
fi

# Step 3: Modify the HTML file
echo "Modifying HTML file to fix paths..."
sed -i '' -E 's/href="\/([^"]*)"/href="\1"/g' "$HTML_FILE"

# Step 4: Commit changes to the `main` branch
echo "Committing changes to the $MAIN_BRANCH branch..."
git add $DIST_FOLDER
git commit -m "$COMMIT_MESSAGE"
git push origin $MAIN_BRANCH

# Step 5: Switch to the `gh-pages` branch
echo "Switching to the $GH_PAGES_BRANCH branch..."
git checkout $GH_PAGES_BRANCH

# Step 6: Retrieve the `dist` folder from the `main` branch
echo "Retrieving the latest build from $MAIN_BRANCH..."
git checkout $MAIN_BRANCH -- $DIST_FOLDER

# Step 7: Copy the contents of `dist` to the root of `gh-pages`
echo "Updating the $GH_PAGES_BRANCH branch with the latest build..."
rm -rf *  # Clear all files in the `gh-pages` branch
mv $DIST_FOLDER/* .  # Move the `dist` contents to the root of the branch
rm -rf $DIST_FOLDER  # Remove the now-empty `dist` folder
git add .

# Step 8: Commit and push the changes to `gh-pages`
echo "Committing and pushing changes to the $GH_PAGES_BRANCH branch..."
git commit -m "$COMMIT_MESSAGE"
git push origin $GH_PAGES_BRANCH

# Step 9: Switch back to the `main` branch
echo "Switching back to the $MAIN_BRANCH branch..."
git checkout $MAIN_BRANCH

echo "Deployment complete!"