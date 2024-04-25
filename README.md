# BeepFunction
 WebAudio Beep Function Study

 https://e3sh.github.io/BeepFunction/beepProgram.htm

 beepcore.js

    const beep = new beepcore();

    beep.on();
    beep.off();
    beep.sound();

    .on = function(Freq = 440, duration = 0.1) 
  
    .off = function(time = 0) //after stop time: sec

    .sound(Freq, WaveType, Volume, lfo:{Freq, WaveType, depth}  )
    .sound = function(Freq=440, form=0, Volume=0.5, lfoparam = {Freq:0, WaveType:-1, depth:0})

    WaveType 0,1,2,3  /  -1: LFOoff
    wave = ["sine", "square", "sawtooth", "triangle"];

    