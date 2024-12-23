param (
    [Parameter(Mandatory = $true)]
    [int]$Day
)

$BranchName = "day-$Day-puzzle"

try {
    # Checkout to new branch
    Write-Host "Creating and switching to branch $BranchName..."
    git checkout -b $BranchName

    # Stage and commit solution
    Write-Host "Staging and committing day $Day solution..."
    git add .
    if (!(git commit -m "Add day $Day solution")) {
        throw "Failed to commit the day $Day solution."
    }

    # Run post-commit tiles update (simulate this part if necessary)
    Write-Host "Running post-commit tiles update..."
    # Place any additional commands for updating tiles here (e.g., updating a file)
    
    # Stage and commit the README update
    git add .
    if (!(git commit -m "Update README tiles")) {
        throw "Failed to commit README tile updates."
    }

    # Merge and push
    Write-Host "Switching back to the main branch and merging..."
    git checkout main
    if (!(git merge $BranchName --no-ff)) {
        throw "Merge failed for branch $BranchName into main."
    }

    Write-Host "Pushing changes to remote repository..."
    if (!(git push)) {
        throw "Push to remote failed."
    }

    Write-Host "Process completed successfully!"

} catch {
    # If any error occurs, display message and abort the process
    Write-Error "An error occurred: $_. Exception.Message"
    Write-Host "Aborting the process."
}
