# BeepFunction
 WebAudio Beep Function Study

 https://e3sh.github.io/BeepFunction/beepProgram.htm

 beepcore.js

    wavetype 0,1,2,3  /  -1: LFOoff
    wave = ["sine", "square", "sawtooth", "triangle"];

   CREATE SYSTEM

    const beep = new beepcore();

   SYSTEM SETUP

    beep.masterVolume( vol);// vol = 0.0-1.0

    beep.oscSetup( wavetype ); // wavetype = 0-3

    beep.lfoSetup(Freq, wavetype, depth);  //Freq(Hz), wavetype,depth:number
    beep.lfoReset(); //Not Use LFO    

   NOTE CREATE

    const note = beep.noteCreate(Freq);

   VOICE PLAY
   
    note.on(volume, delay);//volume 0.0-1.0, delay noteon timing (sec) 
    note.off(duration); //duration noteoff timing(sec)

     DEFAULT
    .on = function(volume = 1, delay = 0) 
    .off = function(time = 0) //after stop time: sec

    note.play(score, settime);score [{Freq:,Vol;,time:,use:false},..] ,settime-now

    note.suspend(); volume =0; Freq = 0;

    