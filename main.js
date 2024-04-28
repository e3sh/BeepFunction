//--------------------------------
// BeepFunctionPractice
// 2024.04.25

let  b;

let osc;
let lfo;
let dur;
let pbend;
let nguide;

let now;
let vft;
let vnote;

let notetable;

let note;
let noteP;
let noteB;
let noteG;

//init 
function main(){
    notetable = noteTable();

    b = new Beepcore();

    osc = {
        freq:document.getElementById("OSCFreq")
        ,wave:document.getElementById("OSCwave")
        ,volume:document.getElementById("OSCVolume")
    }
    lfo = {
        freq:document.getElementById("LFOFreq")
        ,wave:document.getElementById("LFOwave")
        ,depth:document.getElementById("LFOdepth")
    }
    dur   = document.getElementById("dur");
    pbend = document.getElementById("sFreq");
    nguide= document.getElementById("selNote");


    osc.freq.addEventListener("change",statusdraw);
    osc.wave.addEventListener("change",statusdraw);
    osc.volume.addEventListener("change",statusdraw);
    lfo.freq.addEventListener("change",statusdraw);
    lfo.wave.addEventListener("change",statusdraw);
    lfo.depth.addEventListener("change",statusdraw);

    dur.addEventListener("input",durdraw);
    pbend.addEventListener("input",bendctrl);
    nguide.addEventListener("input",noteSelect);

    dummyfunc();

    function dummyfunc(t){
        now = t;

        b.step(now);
        document.getElementById("dsp_busy").innerHTML = ".busy:" + noteP?.busy + "," + noteB?.busy + "," + noteG?.busy;

        if (vft > now){document.getElementById("slider").style.display = "block";
        }else{
            document.getElementById("slider").style.display = "none";

            statusdraw();
            durdraw();
        }
        requestAnimationFrame(arguments.callee);    
    };
}

function bendctrl(){
    document.getElementById("dsp_d").innerHTML = "Freq:" + pbend.value + "Hz";
    vnote?.changeFreq(pbend.value);
}

function statusdraw(e){

    document.getElementById("dsp_e").innerHTML = "OSC)Freq:" + osc.freq.value 
    + "Hz, WaveType:" + osc.wave.value + ", Volume:" + osc.volume.value/10;

    document.getElementById("dsp_r").innerHTML = "LFO)Freq:" + lfo.freq.value 
    + "Hz, WaveType:" + lfo.wave.value + ",Depth:" + lfo.depth.value;
}

function durdraw(){
    document.getElementById("dsp_d").innerHTML = "Duration:" + dur.value/100 + "(sec)";
}

function start_r(){

    b.masterVolume(osc.volume.value/10);
    b.oscSetup(osc.wave.value);
    if (lfo.wave.value == -1){
        b.lfoReset();
    }else{
        b.lfoSetup(lfo.freq.value, lfo.wave.value,  lfo.depth.value);
    }
    
    const note = b.createNote(osc.freq.value);

    note.on();
    note.off(dur.value/100);
    vft = now + (dur.value*10);
    vnote = note;
}

function pipo_r(){

    b.oscSetup(0);//wave:sine

    //const noteA = b.createNote(1000);
    //const noteB = b.createNote(2000);

    if (!Boolean(noteP)){
        noteP = b.createNote(0);
        noteP.on(1);
    }

    const score =[
    {Freq:1000, Vol:1, time:100, use:false}
    ,{Freq:2000, Vol:1, time:100, use:false}
    ,{Freq:0, Vol:0, time:200, use:false}
    ]
    noteP.play(score,now);

    //noteA.on(1,0);
    //noteA.off(0.1);

    //noteB.on(1,0.1);
    //noteB.off(0.2);
}

function boo_r(){

    b.oscSetup(2);//wave:saw

    /*
    const noteA = b.createNote(261.626);
    const noteB = b.createNote(440);
    const noteC = b.createNote(523.251);
    */
    if (!Boolean(noteB)){
        noteB = b.createNote(0);
        noteB.on(1);
    }
    
    //const note = b.createNote(0);
    /*
    const score =[
        {Freq:261.626, Vol:0.5, time:100, use:false}
        ,{Freq:440, Vol:0.7, time:100, use:false}
        ,{Freq:523.251, Vol:1, time:100, use:false}
        ,{Freq:0, Vol:0, time:100, use:false}
        ,{name:"C4", Vol:0.9, time:100, use:false}
        ,{name:"E4", Vol:0.7, time:100, use:false}
    {Freq:261.626, Vol:0.5, time:0, use:false}
    ,{Freq:440, Vol:0.7, time:100, use:false}
    ,{Freq:523.251, Vol:1, time:200, use:false}
    ,{Freq:261.626, Vol:0.9, time:300, use:false}
    ,{Freq:329.628, Vol:0.7, time:500, use:false}

        ,{name:"G4", Vol:0.5, time:100, use:false}
//    ,{Freq:391.995, Vol:0.5, time:700, use:false}
     ,{Freq:0, Vol:0, time:100, use:false}
    ]
    */
    const scorebase =["G5","C6","E6","C6","D6","G6"];
    /*
    let sc = [];
    for (let i in scorebase){
        const n = {name:scorebase[i],Freq:0,Vol:1,time:100,use:false};
        sc.push(n);
    }
    sc.push({Freq:0, Vol:0, time:100, use:false});
    */
    let sc = b.makeScore(scorebase, 100, 1);

    noteB.play(sc,now);

    /*
    noteA.on(1);     noteA.off(0.1);
    noteB.on(1,0.1); noteB.off(0.2);
    noteC.on(1,0.2); noteC.off(0.3);
    */
}

function gra_r(){

    b.oscSetup(1);//wave:squ
    if (!Boolean(noteG)){
        noteG = b.createNote(0);
        noteG.on(1);
    }
    const scorebase =["G4","C5","D5","E5","C5"];

    let sc = b.makeScore(scorebase, 100, 1);
    noteG.play(sc,now);
}

function set_oscFreq(f){
    document.getElementById("OSCFreq").value = f;
    document.getElementById("sFreq").value = f;
    bendctrl();
    statusdraw();
}

function noteSelect(){
    document.getElementById("dsp_n").innerHTML 
    = "Note:" + notetable[nguide.value].name + "/" + notetable[nguide.value].Freq + "Hz";
}

function noteSet(){
    noteSelect();
    set_oscFreq(notetable[nguide.value].Freq);
}