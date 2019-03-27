Day 1:
1.moving a folder:
		$ mv Books /media/baymax_/db15db98-9aec-4133-bbbf-7bc5624a98ec/oem/Desktop
2.creating shortcut
		$ ln(#link) -s(#symbolic) 'path' 'path'

Day 2:
1.Use 'tab key' to complete the file name after writing initial few letters

Day 3:
1.changing permissions of a folder
		$ sudo chown -R xyz.xyz /abc		#where xyz is username

Day 4:
1. Inserting line number in a file
		$ awk '{print NR  "> " $s}' inputfile > outputfile

2. Replacing a word in file
		$ sed -i 's/oldword/newword/g' inputfile    #-i option is used to replace the file contents or else it will just print to the output stream
		
Day 5: 
1. Removing n(42 in this case) lines from a file
		$ sed -i 1,42d links.txt

2. Appending output of echo to a file
		$ echo "append this" >> old.txt

Day 6:
1. Export code to pdf using vim editor
		$ vim abc.py -c ":hardcopy > abc.ps" -c ":q"
		
		You will get abc.ps with syntax highlight, then

		$ ps2pdf abc.ps abc.pdf

Day 7:
1. To detect is a particular package is installed:
		$ dpkg-query -l | grep vlc*

2. Search for a package 
		$ apt-cache search nano

3. Download a package from repo
		$ apt-get download <package-name>

Day 8:
1. To view console output during booting
		$ dmesg | more

2. To see CPU informations
		$ cat /proc/cpuinfo

3. To view the boot time
		$ systemd-analyze time

Day 9:
1. To find out linux version
		$ lsb_release -a

Day 10:
1. To kill a process in a particular port:
		$ kill -9 $(lsof -t -i:8080)
	option 9 is given for hard kill

Day 11:
1. Open a file with its default app:
		$ xdg-open xxx.pdf





