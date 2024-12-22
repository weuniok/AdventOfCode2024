param (
    [Parameter(Mandatory=$true)]
    [int]$Day
)

$BranchName = "day-$Day-puzzle"
git checkout -b $BranchName
git add .
git commit -m "Add day $Day solution"
# post commit with tiles runs here
git add .
git commit -m "Update README tiles"

git checkout main
git merge $BranchName --no-ff
git push