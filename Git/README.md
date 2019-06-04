## Initialise Git

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

## Branches

#### To create a new branch:

`git branch [branch_name]`

#### To switch a branch:

`git checkout [branch_name]`

#### To push a branch:

`git push -u origin [branch_name]`

#### To merge master with the upstream repo:
```
git checkout master

git pull [upstream_repo_url] [branch_name]
```

`git pull` which does a `git fetch` followed by a `git merge` to update the local repo with the remote repo

If this isn't a fast forward merge (see below):
```
git commit -m "merging with upstream repo"

git push origin master
```
To address merge conflicts see below

#### To delete a local branch from your machine

`git branch -d {the_local_branch} (use -D instead to force deleting the branch without checking merged status)`

#### To delete a remote branch from the server

`git push origin --delete {the_remote_branch}`

## Commits

### HEAD

`HEAD` is the pointer to the current commit we're at in our Dev Environment.

#### To view git commits

`git log`

#### To get the first commit

`git rev-list HEAD | tail -n 1`

#### To pretty format commits log

`git log --pretty=format:"%h - %an, %ar : %s"`

#### To see the 'origin' remote github repository url

`git config --get remote.origin.url`

#### To undo your latest commit that you just pushed

```
git reset HEAD~1

git push -f origin master
```

When you do a `git reset HEAD~1`, you tell Git to move the HEAD pointer back one commit. This leaves your file modified but unstaged (to return file to previous commit use --hard option)

If you have some local changes and unable to pull from upstream repository, delete your local changes.

`git reset --hard origin/master`

### To see difference 

#### Between HEAD and modified files in working directory:

`git diff`

#### Between HEAD and modified files in stage area:

`git diff --staged`

#### Between HEAD and a specific commit:

`git diff <commit_hash>`

#### Between two commits:

`git diff <commit1_hash> <commit2_hash>`

#### Between a commit and its previous commit 

`git diff <commit_hash>^!`

## TAGS

#### To create a basic tag

`git tag <tagname>`

#### To create an annotated tag with a message

`git tag -a <tagname> -m <tagmessage>`

#### To delete local tag 

`git tag -d <tagName>`

#### To delete remote tag '12345' (eg, GitHub version too)

`git push origin :refs/tags/<tagName>`

#### An alternative approach to delete remote tag

`git push --delete origin <tagName>`

## Merging

### Fast Forward merging
 
There are no other conflicting changes to any files, and nothing changed on master, this will go through without a hitch in what is called a fast forward merge.

```
git checkout master
git merge <branch_name_to_merge_with_master>
```

![before merge](img/beforeMerge.png "Before Git Merge")
`Before Git Merge`

![after merge](img/afterMerge.png "After Git Merge") 
`After Git Merge`

### Divergent Branches merging

This is the case when both master and <branch-1> originated from the same commit, but since then they diverged, each having their own additional commit. Here a fast-forward merge is not possible. Instead git opens up an editor and allow you to type a message of the merge commit.

![before diverge merge](img/beforeDivergeMerge.png "Before Divergent Branches Git Merge") 
`Before Divergent Branches Git Merge`

![after diverge merge](img/afterDivergeMerge.png "After Divergent Branches Git Merge") 
`After Divergent Branches Git Merge`

Revisions in git, aren't only a snapshot of your files but also contain information on where they came from from. Each commit has one or more parent commits. Our new merge commit, has both the last commit from master and the commit we made on the other branch as it's parents.

### Resolving Conflicts

There are often times you face merge conflicts while merging branches. This generally due different changes to the same file(or files) in both branches. Git cannot resolve this for you, this needs to be done manually.

#### Files affected: 

To see the list of file affected by merge conflict:

```
git status
> # On branch branch-b
> # You have unmerged paths.
> #   (fix conflicts and run "git commit")
> #
> # Unmerged paths:
> #   (use "git add ..." to mark resolution)
> #
> # both modified:      styleguide.md
> #
> no changes added to commit (use "git add" and/or "git commit -a")

```

To see the beginning of the merge conflict in your file, search the file for the conflict marker `<<<<<<<`. When you open the file in your text editor, you'll see the changes from the HEAD or base branch after the line `<<<<<<<` HEAD. Next, you'll see `=======`, which divides your changes from the changes in the other branch, followed by `>>>>>>>` BRANCH-NAME. In this example, one person wrote "open an issue" in the base or HEAD branch and another person wrote "ask your question in IRC" in the compare branch or branch-a.

```
If you have questions, please
<<<<<<< HEAD
open an issue
=======
ask your question in IRC.
>>>>>>> branch-a
```
#### Save changes

Decide if you want to keep only your branch's changes, keep only the other branch's changes, or make a brand new change, which may incorporate changes from both branches. Delete the conflict markers `<<<<<<<`, `=======`, `>>>>>>>` and make the changes you want in the final merge. In this example, both changes are incorporated into the final merge:

```
If you have questions, please open an issue or ask in our IRC channel if it's more urgent.
```

#### If you decide to remove the file:

`git rm styleguide.md`

#### Commit the merge:

```
git add .
git commit -m "Resolved merge conflict."
```

#### Abort merge conflict (without commiting)

```
git commit --abort
```

### Using Mergetool

#### To set vimdiff as default merge tool:
```
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
```
Other tools are meld, opendiff, kdiff3, tkdiff, xxdiff, tortoisemerge, gvimdiff, diffuse, ecmerge, p4merge, araxis, emerge.

#### To run mergetool

`git mergetool`

In the Terminal:
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

## Rebasing

`Rebase` offers a cleaner way of integrating divergent brancges than `Merge`.

1. `Merge` introduces a merge commit in which the two histories get integrated again.

2. `Rebase` just changes the point in history (the commit) your branch is based on.

### To rebase a branch

```
git checkout <branch-name>
git rebase master
```
HEAD moves from current branch latest commit to the HEAD (latest commit) of master. Then rebase applies every single commit we made on current branch to that.

To be more exact what git does after moving HEAD back to the common ancestor of the branches(master and current branch), is store parts of every single commit you've made on current branch (the diff of changes, and the commit text, author, etc.).

After that it does a checkout of the latest commit of the branch you're rebasing on, and then applies each of the stored changed as a new commit on top of that.

All the divergent commits of our current branch is magically merged inside the `master` branch's HEAD commit and now our current branch HEAD points to a new commit whose ancestor is `master` branch HEAD.

Rebase is an incredibly powerful tool when you're working on your own `development` branch which is based on a shared branch, e.g. the `master`.

Using rebase you can make sure that you frequently integrate the changes other people make and push to master, while keeping a clean linear history that allows you to do a fast-forward merge when it's time to get your work into the shared branch.

### Resolving conflicts 

Just like for a merge you may run into conflicts, if you run into two commits changing the same parts of a file. However when you encounter a conflict during a rebase you don't fix it in an extra merge commit, but can simply resolve it in the commit that is currently being applied. 

Unlike merge commit, you simply add the changes to the Staging Environment and then 

```
git rebase --continue
```

The conflict will be resolved in the commit that was just being applied.

### Abort Rebasing

`git rebase --abort`

### To pull with rebase

`git pull -r`

or

`git config --global pull.rebase true`

## Stash

### To stash changes

If at any point you have local changes that you do not yet want to put into a commit, or want to store somewhere while you try some different angle to solve a problem, you can stash those changes away.

A git stash is basically a stack of changes on which you store any changes to the Working Directory.

### To bring back stashed changes by removing changes from the stash

`git stash pop`

### To bring back stashed changes without removing changes from the stash

`git stash apply`

### To inspect stash

`git stash list`

### To show changes in the lastest entry on stash

`git stash show`

### To create a new branch from the lastest entry on stash

`git stash branch <branch-name>`
