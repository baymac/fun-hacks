This gist contains works of other users that I collected in the past but unfortunately I do not have references to them. 

### Initialise Git

#### To create a local repo and pushing to github repo:
```
echo "# shoppernet" >> README.md

git init

git add README.md

git commit -m "first commit"

git remote add origin [repo_url]

git config --global user.name <username>

git config --global user.email <email>

git config credential.helper 'cache --timeout=3600'

git push -u origin master
```

### Branches

#### To create a new branch:

`git branch [branch_name]`

#### To switch a branch:

`git checkout [branch_name]`

#### To push a branch:

`git push -u origin [branch_name]`

#### To merge master with the upstream repo:

`git checkout master`

`git pull` does a `git fetch` followed by a `git merge` 
to update the local repo with the remote rep

`git pull [upstream_repo_url] [branch_name]`

#### *Address conflicts* (see below)
```
git commit -m "merging with upstream repo"

git push origin master
```

#### Delete git branch

#### To remove a local branch from your machine:
`git branch -d {the_local_branch} (use -D instead to force deleting the branch without checking merged status)`

#### To remove a remote branch from the server:
`git push origin --delete {the_remote_branch}`

### Commits

#### To view git commits:

`git log`

#### To get the first commit:

`git rev-list HEAD | tail -n 1`

#### To pretty format commits log:

`git log --pretty=format:"%h - %an, %ar : %s"`

#### To see the 'origin' remote github repository url

`git config --get remote.origin.url`

#### To undo your latest commit that you just pushed

`git reset HEAD~1`

When you do a git reset HEAD~1, you tell Git to move the HEAD pointer back one commit. This leaves your file modified but unstaged (to return file to previous commit use --hard option)

`git push -f origin master`

#### If you have some local changes and unable to pull from upstream repository
#### Remember this is delete your local changes
`git reset --hard origin/master`

### TAGS

#### To create a basic tag
`git tag <tagname>`

#### To create an annotated tag with a message
`git tag -a <tagname> -m <tagmessage>`

#### To delete local tag '12345'
`git tag -d 12345`

#### To delete remote tag '12345' (eg, GitHub version too)
`git push origin :refs/tags/12345`

#### An alternative approach
`git push --delete origin tagName`
`git tag -d tagName`


### Merge Conflicts

#### To set vimdiff as default merge tool:
```
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
```
Other tools are meld, opendiff, kdiff3, tkdiff, xxdiff, tortoisemerge, gvimdiff, diffuse, ecmerge, p4merge, araxis, emerge.

#### To run mergetool
`git mergetool`

#### Terminal GUI shows
```
  +----------------------+
  |       |      |       |
  |LOCAL  |BASE  |REMOTE |
  |       |      |       |
  +----------------------+
  |      MERGED          |
  |                      |
  +----------------------+
```
These 4 views are

**LOCAL** – this is file from the current branch

**BASE** – common ancestor, how file looked before both changes

**REMOTE** – file you are merging into your branch

**MERGED** – merge result, this is what gets saved in the repo

You can navigate among these views using `ctrl+w`. You can directly reach MERGED view using `ctrl+w` followed by `j`.

#### If you want to get changes from REMOTE
`:diffg RE`

#### If you want to get changes from BASE
`:diffg BA`  

#### If you want to get changes from LOCAL
`:diffg LO` 

#### Save, Exit, Commit and Clean up
```
:wqa save and exit from vi
git commit -m "message"
git clean
```
