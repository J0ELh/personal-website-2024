
# Deployment Guide

This document outlines the steps required to deploy the latest version of the website. The deployment process is automated using a PowerShell script that pushes changes, builds the Next.js project, and deploys the static files via GitHub Pages.

## Overview

The deployment process includes the following key steps:

1. **Push Latest Changes:**  
   The deployment script commits and pushes any local changes to the GitHub repository.

2. **Build the Project:**  
   The Next.js project is built using `next build`. During the build, a command is executed to create a `.nojekyll` file. This file is crucial because it prevents GitHub Pages from ignoring files and directories starting with an underscore (e.g., `out/_next`), ensuring all CSS and formatting work as expected.

3. **Export and Deploy:**  
   After building, the project is exported as static files with `npm run export` and then deployed using `gh-pages` with the `--nojekyll` flag.

4. **Reference Paths:**  
   All source reference paths in the project must be prefixed correctly. This prefix changes depending on whether you're in production or development mode. You can follow the existing patterns in the codebase to handle these variations.

## Deployment Steps

To deploy the website, follow these steps:

1. **Run the Deployment Script:**  
   Open your terminal (PowerShell) and navigate to the project root. Run the deployment script:
   ```powershell
   .\deployment_steps.ps1
   ```
   This script performs the following actions:
   - Commits and pushes the latest changes to GitHub.
   - Runs the Next.js build process.
   - Creates a `.nojekyll` file in the output directory.
   - Exports the site as static content.
   - Deploys the exported files to GitHub Pages using `gh-pages -d out --nojekyll`.

2. **Review the Build Output:**  
   Ensure that the build log shows successful compilation, static page generation, and that the `.nojekyll` file is present in the `out` directory.

3. **Test the Deployment:**  
   Verify that the deployed site is functioning as expected, especially that the CSS and formatting are intact (thanks to the `.nojekyll` file). Also, check that all source paths are correctly prefixed according to the environment (production or development).

## Additional Notes

- **Jekyll File in Package.json:**  
  The `package.json` includes a reference to a Jekyll file. Although the PowerShell script might not directly use this file, it is important for ensuring that GitHub Pages does not ignore necessary directories (like `out/_next`). You may want to test the Jekyll file functionality separately if you run into formatting issues.

- **Source Reference Paths:**  
  Ensure that all your source references in your project are properly prefixed based on the deployment environment. This setup follows the pattern already established in your project code.

- **Troubleshooting:**  
  - If the `touch` command is not recognized (common on Windows), confirm that the file `.nojekyll` is created by the script.  
  - If formatting issues occur, double-check that the `.nojekyll` file is in the correct directory and that the CSS files in the `out/_next` directory are not being ignored.

## Conclusion

With these steps, the deployment process is streamlined into a single command that manages pushing the latest changes, building, exporting, and deploying your Next.js site to GitHub Pages. Make sure to update the source reference prefixes for different environments as needed.

