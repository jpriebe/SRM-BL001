inlets = 1;
outlets = 3;
autowatch = 1;

include("lm.js");

var _selectedNotes = []

var _steps = []
var _notes = []

var _pg = require('./patternGenerator.js')

var _init = false;

function liveInit() {
    post("[liveInit] entering...\n")
    _init = true;
}

function regenAll() {
    generateSequence();
    sendSteps();
}

function regenPitches() {
    generateSequence(false);
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
    _selectedNotes = _selectedNotes.filter(function(item) { 
        return item !== note
    })

    if (velocity > 0) {
        _selectedNotes.push(note)
    }

    //post(note + ", " + velocity + "\n")
    post ("selected notes: " + _selectedNotes.join(', ') + "\n")
}

// triggered in response to the bang message received when user clicks the "Generate" text object 
function generateSequence(newRhythm) {

    if (typeof newRhythm === "undefined") {
        newRhythm = true;
    }

    if (_selectedNotes.length < 1) {
        // if user hasn't selected any notes, bail out -- would be nicer to show 
        // the user a message so he knows how to use the generator
        return;
    }

    _notes = [];
    _steps = [];

    // TODO - get notes from midi in!
    _steps = _pg.generateSteps(_selectedNotes, newRhythm)

    // build midi notes corresponding to the steps
    for (var i = 0; i < _steps.length; i++) {
        var step = _steps[i];
        var note = new Note(step.note, i / 4.0,  step.duration, step.velocity);
        _notes.push(note);
    }

    // TODO -- enable exporting notes to clip
    //replaceAllNotes()
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