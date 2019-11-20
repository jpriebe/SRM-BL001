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
    'X.X.',
    '.X.X',
    'XX.XXX.X',
    'XX.X.X.X',
    'X..X..X.',
    'XXXXXXXX',
]

var _patterns = [
    {
        'rhythm': '..X...X.X.XX...X...X..X.X.XX....',
    },
    {
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
    {
        'rhythm': 'X...X...X..X..X.X...X...X..X.X..',
    },
    {
        'rhythm': '..................X....X.XX.....',
    },
    {
        'rhythm': 'X.X...X.X....XX.',
    },
    {
        'rhythm': 'X.X...X.X....XX.X.X...X.X..X.XX.',
    },
    {
        'rhythm': 'X.X...X.X....XX.X.X.X.X.X....XX.',
    },
    {
        'rhythm': 'Xxx...X.X...X...',
    },
    {
        'rhythm': 'Xxx...X.X...X...Xxx...X.X.....XX',
    },
    {
        'rhythm': 'X..XX.X.X..XX.X.X..XX.X.....Xxx.',
    },
    {
        'rhythm': 'X..XX.X.X..XX.X.X..XX.X...XxX...',
    },
    {
        'rhythm': 'X..X..........XxX..X............',
    },
    {
        'rhythm': 'X.....X.X.......X..X..X.X.......',
    },
    {
        'rhythm': 'X.X.X.XxX.....X.X.X.X.XxX.......',
    },
    {
        'rhythm': '..X..X..X.....XX..X..X..X.......',
    },
    {
        'rhythm': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
    {
        'rhythm': 'XXX.Xxx.........Xx..X.X.X...Xx..XXX.Xxx.............X.X.Xx......',
    },
    {
        'rhythm': 'X.X.X.X.X.X.X..XX.X.X.X.X.X.X...X.X.X...X.X.X..XX.X.X.X.X.X.X...',
    },
    {
        'rhythm': 'X.X...X......XX.X.X...X.........X.X...X......XX.X.X...XX.......X',
    },
    {
        'rhythm': 'X.X.X.XX.....XX.X.X.X.XX....Xx..',
    },
    {
        'rhythm': '..X.XXXX.....XX...X.XXXX....Xxx.',
    },
    {
        'rhythm': 'X..XX.X.X.X.X...X..XX.X.X.X.X...',
    },
    {
        'rhythm': 'X.....X.X.....X.X.....X.X....XX.X.....X.X.....X.X.....X.X..X.XX.'
    },
    {
        'rhythm': 'X..XX.X.Xx..Xx..X..XX.X.X.X.Xx..X..XX.X.Xx..Xx..X..XX.X.X.....XX',
    },
    {
        'rhythm': 'X...X.X.X...Xx..X...X.X.X.Xx..XX',
    },
    {
        'rhythm': 'X.X..X..X.X..X..',
    },
    {
        'rhythm': 'X.X..X..X.X..X..X.X..X..X.X..X..',
    },
    {
        'rhythm': 'X.X.XX.XX.X.X.X.',
    },
    {
        'rhythm': 'X.X.XX.XX.X.X.X.X.X.XX.XX.X.X.X.',
    },
    {
        'rhythm': 'Xx.XX.X.Xx.XX.X.Xx.XX.X.Xx.X..X.',
    },
    {
        'rhythm': 'X.X..........XX.XxX.............X.X..........XX.XxX...X...X...X.',
    },
    {
        'rhythm': 'X....XX.X.......X.....X.Xx..X...',
    },
    {
        'rhythm': 'X..X..X.X..X....X..X..X.X..X....X..X..X.X..X....X..X..X.X..X..XX',
    },
    {
        'rhythm': 'X.X.X..X.X.XXXXXX.X.X..X.X.XX...',
    },
    {
        'rhythm': 'XX.XXX.XXx......XX.XXX.XXx..Xx..XX.XXX.XXx......XX.XXX.XXx....XX',
    },
    {
        'rhythm': 'X.X...XXXX..X...X.X...XXXX..X..X',
    },
    {
        'rhythm': 'X..XX.X.X.......X..XX.X.X...X.X.X..XX.X.X.......X..XX.X.X.....XX',
    },
    {
        'rhythm': 'X...X...XxxX....X...X..X........X...X...XxxX....X...X..X...X.XX.',
    },
    {
        'rhythm': 'X.X.X...X.X.X...X.X.X.X.X.X.X...',
    },
    {
        'rhythm': 'Xxxxxx..X.X.X.X.Xxxx....X.X.X...',
    },
    {
        'rhythm': 'Xxxx...X..X.......X.XX.X..X.....Xxxx...X..X.......X.XX.X..X...XX',
    },
]

var _current_pattern = null;
var _current_accent_pattern = null;
var _current_accents = [];
var _note_weights = [];

var _baseline_velocity = 96;

var _last_steps = [];

function generate_note_weights (num_notes, front_weight) {
    var i = 0;
    var total = 0;
    _note_weights = [];
    var scale_factor = 0.95;
    for (i = 0; i < num_notes; i++) {
        var x = i + 1;
        var y = 1 / (x - scale_factor) * (front_weight / 100) + 1 * ((100 - front_weight) / 100);
        _note_weights.push (y);

        total += y;
    }

    for (i = 0; i < num_notes; i++) {
        _note_weights[i] /= total;
    }
}

function select_random_note (notes) {
    var r = Math.random()

    var total = 0;
    for (var i = 0; i < _note_weights.length; i++) {
        total += _note_weights[i]

        if (total >= r) {
            return notes[i]
        }
    }

    // just in case
    return notes[0];
}


function pattern_to_steps (notes, params) {
    var i = 0;
    var r;

    var steps = [];

    var rhythm = _current_pattern['rhythm'];
    var beats = rhythm.split('');
    var r;

    if (params.newNoteAssignments) {
        var last_note_down = -1;
        generate_note_weights(notes.length, params.frontWeight)
        for (i = 0; i < beats.length; i++) {
            var note = select_random_note (notes);

            post("[" + i + "] " + beats[i] + " (" + last_note_down + ")\n");
            //post("notes.length: " + notes.length) + "\n"

            steps[i] = {
                velocity: 0,
                duration: 0,
                note: 0,
                probability: 0
            }
            switch (beats[i]) {
                case 'X':
                    // random slide; only allow up to 480 ticks, because the next step is 960, which is ridiculous
                    if ((last_note_down > -1) && (i - last_note_down < 4)) {
                        r = Math.floor(Math.random() * 100);
                        post("slide probability: " + params.slideProbability + "; r: " + r + "\n");
                        if (r < params.slideProbability) {
                            var slide_duration = 120 * (i - last_note_down);
                            post("sliding note " + last_note_down + " by " + slide_duration + " ticks...\n")
                            steps[last_note_down].duration += slide_duration;
                        }
                    }
                    r = Math.floor(Math.random() * 100);
                    if (r < params.noteProbability) {
                        steps[i].note = note;
                        steps[i].velocity = _baseline_velocity;
                        steps[i].duration = 120;
                        steps[i].probability = 100;
                        last_note_down = i;
                    }
                    break;
                case '-':
                    // forced slide
                    if (last_note_down > -1) {
                        steps[last_note_down].duration += 120;
                    }
                    break;
                case '.':
                    break;
            }
        } 
    } else {
        steps = _last_steps;
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

        steps[i].velocity = _baseline_velocity;

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
    _current_accents = [];
    var accent_boost = Math.floor(127 - _baseline_velocity * params.accentIntensity / 100);
    post("accent boost: " + accent_boost + "...\n");
    var accents = _current_accent_pattern.split('');
    for (i = 0; i < accents.length; i++) {
        _current_accents.push(0);
        switch (accents[i]) {
            case '.':
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

    post("[generateSteps] params: " + JSON.stringify(params) + "\n")

    var steps = pattern_to_steps (notes, params);
    _last_steps = steps;

    return steps;
}

post("patternGenerator.js loaded, " + _patterns.length + " patterns found.\n")

exports.generateSteps = generateSteps;