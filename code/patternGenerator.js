var _accent_patterns = [
    'X.......X.......X.......X.......',
    '....X.......X.......X.......X...',
    'X...X...X...X...X...X...X...X...',
    '..X...X...X...X...X...X...X...X.',
    '..............XX..............XX',
    'X..............XX..............X',
    '.X.X............X.X.............',
    'X.X............X.X..............',
    '............X.X..............X.X',
]

var _patterns = [
    {
        //'rhythm': '................................',
        'rhythm': 'X.X...X.X..X.XX.X.X...X.X.......',
    },
    {
        'rhythm': 'X.X.X.X.X.XX....X.X.X.XXX.XX....',
    },
    {
        'rhythm': 'X.X.X.X.X..X....X.X.X.X.X..X...X',
    },
    {
        'rhythm': 'X.X.X.X.X..X....X.X.X.X.X..X...X',
    },
    {
        'rhythm': 'X..XX.X.X.X.X...X..XX.X.X.....XX',
    },
    {
        'rhythm': '..X..X..X.X...X...X..X..X.X...XX',
    },
    {
        'rhythm': 'X..X..X...X.X...X..X..X...X.X..X',
    },
    {
        'rhythm': '...X..X............X..X...........XX..X............X..X.X.X.....',
    },
    {
        'rhythm': 'X.X.X.X.X..X..X.X.X.X.X.X..X.XX.',
    },
    {
        'rhythm': 'X..X..X.........X..X..X.......XX',
    },
    {
        'rhythm': 'X-X-X-..........X-X-X-..........',
    },
    {
        'rhythm': '..X...X...........X...X...X.......X...X...........XX..XX..X.....',
    },
]

var _current_pattern = null;
var _current_accent_pattern = null;
var _current_accents = [];

var _baseline_velocity = 96;

function pattern_to_steps (notes, params) {
    var i = 0;
    var r;

    var steps = [];

    var rhythm = _current_pattern['rhythm'];
    var beats = rhythm.split('');

    var last_note_down = -1;
    for (i = 0; i < beats.length; i++) {
        r = Math.floor(Math.random() * notes.length);
        var note = notes[r];

        //post("note: " + note + "\n")
        //post("notes.length: " + notes.length) + "\n"

        steps[i] = {
            note: note,
        }
        switch (beats[i]) {
            case 'X':
                steps[i].velocity = _baseline_velocity;
                steps[i].duration = 120;
                steps[i].probability = 100;
                last_note_down = i;
                break;
            case '-':
                if (last_note_down > -1) {
                    steps[last_note_down].duration += 120;
                }
                steps[i].velocity = 0;
                steps[i].duration = 0;
                steps[i].note = 0;
                steps[i].probability = 0;
                break;
            case '.':
                steps[i].velocity = 0;
                steps[i].duration = 0;
                steps[i].note = 0;
                steps[i].probability = 0;
                break;
        }
    } 

    if (params.newAccentPattern) {
        calculate_accents (params);
    }

    steps = apply_accents (steps, params)

    return steps;
}

function apply_accents (steps, params)
{
    var i = 0;
    var num_accents = 0;

    post("applying accents...\n");

    for (i = 0; i < steps.length; i++) {
        if (steps[i].velocity === 0) {
            continue;
        }
        var idx = i % _current_accent_pattern.length;
        if (_current_accent_pattern[idx] === 0) {
            continue;
        }

        steps[i].velocity += _current_accents[idx];

        num_accents++
        if (num_accents >= params.maxNumAccents) {
            break;
        }
    }

    return steps;
}


function calculate_accents (params)
{
    var i = 0;

    post("calculating accents...\n");
    var accent_boost = Math.floor(127 - _baseline_velocity * params.accentIntensity / 100);
    post("accent boost: " + accent_boost + "...\n");
    var accents = _current_accent_pattern.split('');
    for (i = 0; i < accents.length; i++) {
        switch (accents[i]) {
            case '.':
                _current_accents[i] = 0;
                continue;
        }

        r = Math.floor(Math.random() * 100);
        post(" - " + i + " r: " + r + ", accentProbability: " + params.accentProbability + "\n");
        if (r < params.accentProbability) {
            _current_accents[i] = accent_boost;
            post("accenting beat " + i + "\n");
        }
    }
}

function generateSteps (notes, params) {
    var r;
    if (params.newRhythm || _current_pattern == null) {
        r = Math.floor(Math.random() * _patterns.length);
        _current_pattern = _patterns[r];
    }

    if (params.newAccentPattern || _current_accent_pattern == null) {
        r = Math.floor(Math.random() * _accent_patterns.length);
        _current_accent_pattern = _accent_patterns[r];
        post("new accent pattern: " + _current_accent_pattern + "\n");
    }

    var steps = pattern_to_steps (notes, params);

    post(JSON.stringify(params) + "\n");
    //post(JSON.stringify(steps) + "\n");

    return steps;
}

exports.generateSteps = generateSteps;