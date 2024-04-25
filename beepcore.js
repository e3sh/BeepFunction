function Beepcore(){

  const wave = ["sine", "square", "sawtooth", "triangle"];

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

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
  this.sound = function(Freq=440, form=0, Volume=0.5, lfoparam = {Freq:0, WaveType:-1, depth:0}){

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
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    
    depth.gain.value = lfoparam.depth;
  
    isPlaying = false;

    if (isPlaying) return;
      oscillator = ctx.createOscillator();
      oscillator.type = WaveType;
      oscillator.frequency.value = Freq;

      // Osc -> Gain -> Output
      oscillator.connect(gainNode).connect(ctx.destination);
      oscillator.start();

      if (lfoparam.WaveType != -1){
      
        lfo.type = wave[lfoparam.WaveType];
        lfo.frequency.value = lfoparam.Freq;
        // lfo -> depth -> Osc.Freq
        lfo.connect(depth).connect(oscillator.frequency);
        lfo.start();
      }
      isPlaying = true;
  };
}
