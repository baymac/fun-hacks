### To create a local repo and pushing to github repo:
```
$ echo "# shoppernet" >> README.md

$ git init

$ git add README.md

$ git commit -m "first commit"

$ git remote add origin [repo_url]

$ git config --global user.name <username>

$ git config --global user.email <email>

$ git config credential.helper 'cache --timeout=3600'

$ git push -u origin master
```


### To create a new branch:
```
$ git branch [branch_name]
```
### To switch a branch:

$ git checkout [branch_name]

### To push a branch:
```
$ git push -u origin [branch_name]
```

### To merge master with the upstream repo:
```
$ git checkout master
```
git pull does a git fetch followed by a git merge 
to update the local repo with the remote rep
```
$ git pull [upstream_repo_url] [branch_name]
```
*Address conflicts* 
```
$ git commit -m "merging with upstream repo"
$ git push origin master
```

### Delete git branch

To remove a local branch from your machine:
```
$ git branch -d {the_local_branch} (use -D instead to force deleting the branch without checking merged status)
```
To remove a remote branch from the server:
```
$ git push origin --delete {the_remote_branch}
```
### To view git commits:
```
$ git log
```
### To get the first commit:
```
$ git rev-list HEAD | tail -n 1
```
### To pretty format commits log:
```
$ git log --pretty=format:"%h - %an, %ar : %s"
```
### To see the 'origin' remote github repository url
```
$ git config --get remote.origin.url
```
### To undo your latest commit that you just pushed
```
$ git reset HEAD~1
```
When you do a git reset HEAD~1, you tell Git to move the HEAD pointer back one commit.
This leaves your file modified but unstaged (to return file to previous commit use --hard option)
```
$ git push -f origin master
```
