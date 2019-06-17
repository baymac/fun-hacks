There's a script engine called Qpython which runs Python on Android. It contains a Python shell, editor, and the SL4A Library for Android. The Scripting Layer for Android(SL4A) is a library that allows the creation and running of scripts written in various scripting languages directly on Android devices.

Currently supported languages for SL4A are:

* Python using CPython
* Perl
* Ruby using JRuby
* Lua
* BeanShell
* JavaScript using Rhino
* Tcl
* Rexx using BRexx

You can download the Qpython3 app from Play Store from [here](https://play.google.com/store/apps/details?id=org.qpython.qpy3).

The real script:
If you want a primer on Android Architecture and SL4A library, I can point you to an excellent doc from Tutorials point. Link [here](https://drive.google.com/file/d/1VcFLN71OrgjdB7EocVvlCHy8LErOpS6D/view).

After looking into some of the sample codes in the app, I was ready to write my own python codes to automate my task on Android.

To create this script, 
open your app -> Editor -> New button(top-right-middle) ->
Give name like 'callAlarm.py'-> start writing your script on the editor

Here's the code:

```Python
import androidhelper 
import time  

droid = androidhelper.Android()  
droid.wakeLockAcquireFull()  

arrived = 0

while True:   
  t = time.strftime("%I:%M %p")    
  if t == "06:00 AM":     
    print ('Time arrived')     
    droid.phoneCallNumber("9876543210")     
    print('calling')     
    t_end = time.time() + 60     
    while time.time() < t_end:
      arrived = 1
      print('talking')       
      droid.ttsSpeak("Hi Alice, it is time to wake up")   
      time.sleep(4)     
    if arrived == 1:
      exit(0)
  print('Time not arrived')   
  time.sleep(20)
```

This code is more or less intuitive. Let me break it for you:
We have imported two libraries 'androidhelper' for making api calls to android classes and 'time' to get system time.
'droid' stores an object of androidhelper. We did that with:

```
droid = androidhelper.Android()
```

In order for the script to work even when the screen is turned off, we need to give this script access to CPU even when your phone is locked. We did that with:

```
droid.wakeLockAcquireFull()
```
The while loop is set to start recursively
The variable 't' is used to save the time in the format of hh:mm am/pm
The if conditon checks if the time has arrived
To make the call, we use an android facade:

```
droid.phoneCallNumber("9876543210")
```

After making the call, we have to make the bot speak something as a reminder. The reminder should go on for a minute. To make the bot read out a text message we have used another API call to TextToSpeech Facade which speaks using the tts. The loop runs every 4 seconds until 1 minute is over since the time arrived. To do that we have added the following code:

```
while time.time() < t_end:      
  arrived = 1      
  print('talking')             
  droid.ttsSpeak("Hi Alice, it is time to wake up")
  time.sleep(4)
```
The flag variable 'arrived' is set to 1 when the above loop executes, so we have to now exit the program after our task is accomplished. We did that with:
```
if arrived == 1:      
  exit(0)
```
The outer loop runs every 20 seconds and in each cycle it polls the time and checks if our time has arrived. 20 seconds cycle is chosen arbitrarily, any value below 59seconds will do. We did that with:
```
print('Time not arrived')     
time.sleep(20)
```
SL4A is facilitated with API calls known as Android facades that basically let's you do calls on various Android classes such as clipboard, wifi, contacts etc. You can find the list of facades in their official documentation (not sure if it is incomplete or deprecated but still has much to learn from). Link here.

---

SL4A needs more functionality and more optimization. Check if you want to contribute to the github repository. Link here. The documentation from Developer's guide onwards is incomplete and the previous ones needs to be updated. If you find something useful, start contributing to it. Someone else might find your features useful. That is a way of giving back to the world. Open Source FTW.

Au revoir.
