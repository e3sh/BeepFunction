function Beepcore(){

  const wave = ["sine", "square", "sawtooth", "triangle"];

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //const ctx = new AudioContext();

  let masterVolume = 0.2;
  let oscwavetype = wave[0];
  let lfo = null;

  let noteList = [];

  function noteClass(){

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    //osc = ctx.createOscillator();

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    osc.connect(gainNode).connect(ctx.destination);

    let masterVolume;

    let noteList;
    let starttime;

    this.living = false;

    
    this.init = function(Freq=440, osc_wavetype="sine", lfop=null, mVol = 0.2){
    //  lfo param = {Freq:0, wavetype:"none", depth:0};

      masterVolume = mVol;

      osc.type = osc_wavetype;
      osc.frequency.value = Freq;
  
      if (lfop !== null){
        // LFO
        const lfo = ctx.createOscillator();
        const depth = ctx.createGain();
    
        depth.gain.value = lfop.depth;
    
        lfo.type = lfop.wavetype;
        lfo.frequency.value = lfop.Freq;
        // lfo -> depth -> Osc.Freq
        lfo.connect(depth).connect(osc.frequency);
        lfo.start();
      }
      this.living = true;

      noteList = [];
    }

    this.on = function(volume=1, delay=0){
      gainNode.gain.value = volume*masterVolume;
      osc.start(delay);
    }

    this.changeVol = function(volume=1){
      gainNode.gain.value = volume*masterVolume;
    }

    this.changeFreq = function(Freq){
      osc.frequency.value = Freq;
    }

    this.off = function(dur){
      osc?.stop(dur);
      this.living = false;
    }

    this.suspend = function(){
      gainNode.gain.value = 0;
      osc.frequency.value = 0;
    }

    this.play = function(setList, now){
      noteList = setList;
      //[{Freq:0, Vol:0, time:0, use:false} ..]
      starttime = now;
    }

    this.step = function(now){
      let c=0;
      for (let i in noteList){
        n = noteList[i];
        if (!n.use){
          if (n.time < now-starttime){
            this.changeVol(n.Vol);
            this.changeFreq(n.Freq);
            n.use = true;
          }
          c++
        }
      }
      if (c==0){
        this.suspend();
        noteList = [];
        //演奏終了
      }
    }
  }

  this.createNote = function(Freq){

    let note = new noteClass();
    note.init(Freq, oscwavetype, lfo, masterVolume);
    noteList.push(note);
    console.log(noteList.length);
    
    return note;  
  }

  this.oscSetup = function(wavetype){
    oscwavetype = wave[wavetype];
  }

  this.lfoSetup = function(Freq, wavetype, depth){
    lfo = {Freq: Freq, wavetype:wave[wavetype], depth:depth};
  }

  this.lfoReset = function(){lfo = null};

  this.masterVolume = function(vol = 0.2){
    masterVolume = vol;
  }
  this.step = function(now){
    for (let i in noteList){
      if (noteList[i].living){
        noteList[i].step(now);
      }else{
        noteList.splice(i,1);
      }
    }
  }
}

/*

  let oscillator;
  
  // 再生中でtrue
  let isPlaying = false;

  //beep.on(Freq, time)
  this.on = function(Freq = 440, duration = 0.1){
    if(isPlaying) return;
      this.sound(Freq, 1, 0.2);
      this.off(duration);
  };
  
  this.off = function(time = 0){//time: sec
  // oscillatorを破棄し再生を停止する
      oscillator?.stop(time);
      isPlaying = false;
  }

  //beep.sound(Freq, WaveType, Volume, lfo:{Freq, WaveType, depth}  )
  this.sound = function(Freq=440, form=0, Volume=0.5, lfoparam = {Freq:0, WaveType:-1, depth:0}, start = 0, end = 1){

    if (lfoparam === null) lfoparam = {Freq:0, WaveType:-1, depth:0};

    form = form%4;
    const WaveType = wave[form];
    //console.log(WaveType);

    //Freq:       440Hz:A4
    //WaveType: sine, square, sawtooth, triangle [0,1,2,3]
    //Volume  : 0.0-1.0
    //lfoparam:  
    //.Freq   : Modulate Freq (sample 10)
    //.WaveType: sine, square, sawtooth, triangle (sample sine)
    //.depth  : depth.gain (sample 50)

    const gainNode = ctx.createGain();
    gainNode.gain.value = Volume;

    // LFO
    /*
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    
    depth.gain.value = lfoparam.depth;
    isPlaying = false;
    */
    /*
    if (isPlaying){
      oscillator.type = WaveType;
      oscillator.frequency.value = Freq;

    } else {
      oscillator = ctx.createOscillator();
      oscillator.type = WaveType;
      oscillator.frequency.value = Freq;

      // Osc -> Gain -> Output
      oscillator.connect(gainNode).connect(ctx.destination);
      //oscillator.start(start);

      if (lfoparam.WaveType != -1){
        // LFO
        const lfo = ctx.createOscillator();
        const depth = ctx.createGain();
    
        depth.gain.value = lfoparam.depth;
    
        lfo.type = wave[lfoparam.WaveType];
        lfo.frequency.value = lfoparam.Freq;
        // lfo -> depth -> Osc.Freq
        lfo.connect(depth).connect(oscillator.frequency);
        lfo.start();
      }
      oscillator.start(start);
      isPlaying = true;
    }
  };

  //todo:
  // notelist
  // notetimeline
  // notecreate
  // noteparam portamet
  // noteplay
  // notevolume
  // mastervolume
  // mmldecode

}
*/