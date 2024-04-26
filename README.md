# BeepFunction
 WebAudio Beep Function Study

 https://e3sh.github.io/BeepFunction/beepProgram.htm

 beepcore.js

    wavetype 0,1,2,3  /  -1: LFOoff
    wave = ["sine", "square", "sawtooth", "triangle"];

   CREATE SYSTEM

    const beep = new beepcore();

   SYSTEM SETUP

    beep.masterVolume( vol);// vol = 0.0-1.0（音の大きさに掛けられる

    beep.oscSetup( wavetype ); // wavetype = 0-3

    beep.lfoSetup(Freq, wavetype, depth);  //Freq(Hz), wavetype,depth:number
    beep.lfoReset(); //Not Use LFO   

    let score = beep.makeScore(namelist, time, vol) 
     //note.play(score, now)

   NOTE CREATE

    const note = beep.noteCreate(Freq);

   VOICE PLAY
   
    note.on(volume, delay);//volume 0.0-1.0, delay noteon timing (sec) 
    note.off(duration); //duration noteoff timing(sec)

     DEFAULT
    .on = function(volume = 1, delay = 0) 
    .off = function(time = 0) //after stop time: sec

    note.play(score, settime);score [{[name.],Freq:,Vol;,time:,use:false},..] ,settime-now
     //[name:]音名(周波数に読み替え処理される), Freq:周波数(Hz), Vol：0.0-1.0(ボリューム)
     //time:音の長さ(ms), use:使用前は無条件にfalseにセット/処理内で使用

    note.suspend(); volume =0; Freq = 0;

    Example.
    //4/4 t120 60f 3600f/m
    //4   30f   500ms
    //8   15f   250ms
    //16  7.5f  125ms
    //32  3.75f 62.5ms    

     notetable=[
        ,{name:"A4",Freq:440}

    