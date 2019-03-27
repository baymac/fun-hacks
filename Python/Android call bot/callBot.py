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

