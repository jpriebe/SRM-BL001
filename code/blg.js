inlets = 1;
outlets = 3;
autowatch = 1;

include("lm.js");

var _active_notes = []
var _selected_notes = []

var _steps = []
var _notes = []

var _lock_note_selection = false;

var _pg = require('./patternGenerator.js')

var _pg_params = {
    'newRhythm': true,
    'newNoteAssignments': true,
    'newAccentPattern': true,
    'accentProbability': 50,
    'accentIntensity': 50,
    'maxNumAccents': 3,
    'frontWeight': 0,
}

var _init = false;

function liveInit() {
    post("[liveInit] entering...\n")
    _init = true;
}

// called when user clicks new accents checkbox
function toggleLockNoteSelection(val) {
    _lock_note_selection = val;

    // when the lock is removed, we want the selected notes to immediately be set to the active notes
    if (!_lock_note_selection) {
        noteChange (null, 0);
    }
}

// called when user clicks new rhythm checkbox
function toggleNewRhythm(val) {
    _pg_params.newRhythm = val;

    var o1 = this.patcher.getnamed("togNewNoteAssign");
    var o2 = this.patcher.getnamed("pnlNewNoteAssign");
    if (val) {
        o1.ignoreclick = 1;
        o2.hidden = 0;
    } else {
        o1.ignoreclick = 0;
        o2.hidden = 1;
    }
}

// called when user clicks new note assignments checkbox
function toggleNewNoteAssignments(val) {
    _pg_params.newNoteAssignments = val;
}

// called when user clicks new accents checkbox
function toggleNewAccents(val) {
    _pg_params.newAccentPattern = val;
}

// called when user changes front weighting
function setFrontWeight(val) {
    val = Math.floor(val);
    post("set front weight: " + val + "\n");
    _pg_params.frontWeight = val;
}


// called when user changes accent probability
function setAccentProbability(val) {
    val = Math.floor(val);
    post("set accent probability: " + val + "\n");
    _pg_params.accentProbability = val;
}

// called when user changes accent intensity
function setAccentIntensity(val) {
    val = Math.floor(val);
    post("set accent intensity: " + val + "\n");
    _pg_params.accentIntensity = val;
}

// called when user sets max num accents
function setMaxNumAccents(val) {
    _pg_params.maxNumAccents = val;
}

// called when user clicks regen
function regen() {
    generateSequence();
    sendSteps();
}

// use to hold midi notes to write to clip
function Note(pitch, start, duration, velocity) {
    this.Pitch = pitch;
    this.Start = start;
    this.Duration = duration;
    this.Velocity = velocity;
}

// triggered via a message when midi notes change
function noteChange(note, velocity) {
    if (note !== null) {
        _active_notes = _active_notes.filter(function(item) { 
            return item !== note
        })

        if (velocity > 0) {
            _active_notes.push(note)
        }
    }

    if (_lock_note_selection) {
        return;
    }

    _selected_notes = []
    for (var i = 0; i < _active_notes.length; i++) {
        _selected_notes.push(_active_notes[i]);
    }

    if (_active_notes.length == 0) {
        o = this.patcher.getnamed("togLockSelectedNotes");
        o.hidden = 1;
        o = this.patcher.getnamed("cmtLockSelectedNotes");
        o.hidden = 1;
        o = this.patcher.getnamed("pnlInstructions");
        o.hidden = 0;
        o = this.patcher.getnamed("cmtInstructions");
        o.hidden = 0;
        o = this.patcher.getnamed("txtRegen");
        o.hidden = 1;
        o = this.patcher.getnamed("sldAccentProb");
        o.hidden = 1;
        o = this.patcher.getnamed("sldAccentIntensity");
        o.hidden = 1;
        o = this.patcher.getnamed("sldFrontWeight");
        o.hidden = 1;
    }
    else {
        o = this.patcher.getnamed("txtRegen");
        o.hidden = 0;
        o = this.patcher.getnamed("sldAccentProb");
        o.hidden = 0;
        o = this.patcher.getnamed("sldAccentIntensity");
        o.hidden = 0;
        o = this.patcher.getnamed("sldFrontWeight");
        o.hidden = 0;
        o = this.patcher.getnamed("togLockSelectedNotes");
        o.hidden = 0;
        o = this.patcher.getnamed("cmtLockSelectedNotes");
        o.hidden = 0;
        o = this.patcher.getnamed("cmtInstructions");
        o.hidden = 1;
        o = this.patcher.getnamed("pnlInstructions");
        o.hidden = 1;
    }

    //post(note + ", " + velocity + "\n")
    post ("selected notes: " + _active_notes.join(', ') + "\n")
}

// triggered in response to the bang message received when user clicks the "Generate" text object 
function generateSequence() {

    // TODO - remove this -- it's just for debugging without a MIDI keyboard
    //_selectedNotes = [60, 64, 67];

    if (_selected_notes.length < 1) {
        // if user hasn't selected any notes, bail out -- would be nicer to show 
        // the user a message so he knows how to use the generator
        return;
    }

    _notes = [];
    _steps = [];

    _steps = _pg.generateSteps(_selected_notes, _pg_params)

    // build midi notes corresponding to the steps
    for (var i = 0; i < _steps.length; i++) {
        var step = _steps[i];
        var note = new Note(step.note, i / 4.0,  step.duration / 480, step.velocity);
        _notes.push(note);
    }

    post("Generated sequence with " + _notes.length + " notes\n");
}

// called from the +12 -12 buttons
function transpose (value) {
    for (var i = 0; i < _steps.length; i++) {
        if (_steps[i].note > 0) {
            _steps[i].note += value;
        }
    }

    sendSteps();
}

// loads the steps into the sequencer
function sendSteps() {
    outlet(0, "nstep", _steps.length)
    outlet(0, "loop", 0, _steps.length)
    for (var i = 0; i < _steps.length; i++) {
        var step = _steps[i];
        outlet(0, "step", i + 1, step.note, step.velocity, 120, step.probability)
    }
}

// called in response to user clicking the "clip" text object;
// create a new clip and load it with the notes we generated
function clip() {
    var track = new LiveAPI("this_device canonical_parent");
    var clipSlots = track.getcount("clip_slots");
    var clipSlot;

    var firstClip = null;

    for (var clipSlotNum = 0; clipSlotNum < clipSlots; clipSlotNum++) {
        clipSlot = new LiveAPI("this_device canonical_parent clip_slots " + clipSlotNum);
        var hasClip = clipSlot.get("has_clip").toString() !== "0";
        if (!hasClip) break;
    }

    if (clipSlotNum === clipSlots) {
        // have to create new clip slot (scene)
        var set = new LiveAPI("live_set");
        set.call("create_scene", -1);
        clipSlot = new LiveAPI("this_device canonical_parent clip_slots " + clipSlotNum);
    }

    post("Creating clip in slot " + clipSlotNum + "\n")

    post("Setting notes in clip; num notes: " + _notes.length + "\n")

    var beats = Math.ceil(_notes.length / 4);
    post("num beats: " + beats + "\n")

    clipSlot.call("create_clip", beats);
    var clip = new LiveAPI("this_device canonical_parent clip_slots " + clipSlotNum + " clip");
    //var notes = generateMidi();

    post("Setting notes in clip...\n")

    setNotes(clip, _notes);
}

function setNotes(clip, notes) {
    clip.call("set_notes");

    nonZeroCount = 0;
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (note.Velocity > 0) {
            nonZeroCount++;
        }
    }

    post("clip.call(notes, " + nonZeroCount + ")")
    clip.call("notes", nonZeroCount);

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (note.Velocity === 0) {
            continue;
        }
        post(JSON.stringify(note) + "\n")
        clip.call("note", note.Pitch, note.Start.toFixed(4), note.Duration.toFixed(4), note.Velocity, note.Muted);
    }

    clip.call("done");
}


function replaceAllNotes(clip, notes) {
    clip.call("select_all_notes");
    clip.call("replace_selected_notes");
    clip.call("notes", notes.length);

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        callNote(clip, note);
    }

    clip.call("done");
}

function callNote(clip, note) {
    clip.call("note", note.Pitch, note.Start.toFixed(4), note.Duration.toFixed(4), note.Velocity, note.Muted);
}

function callPatternStepDump() {
    var patternStep = this.patcher.getnamed("patternStep");
    patternStep.message("dump");
}