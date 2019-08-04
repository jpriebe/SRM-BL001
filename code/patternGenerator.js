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

function pattern_to_steps (ap, notes) {
    var i = 0;

    var steps = [];

    var rhythm = ap['rhythm'];
    var beats = rhythm.split('');

    var last_note_down = -1;
    for (var i = 0; i < beats.length; i++) {
        var r = Math.floor(Math.random() * notes.length);
        var note = notes[r];

        post("note: " + note + "\n")
        post("notes.length: " + notes.length) + "\n"

        steps[i] = {
            note: note,
        }
        switch (beats[i]) {
            case 'X':
                steps[i].velocity = 96;
                steps[i].duration = 120;
                steps[i].probability = 100;
                last_note_down = i;
                break;
            case '-':
                if (last_note_down > -1) {
                    steps[last_note_down].duration += 120;
                }
                steps[i].velocity = 0;
                steps[i].note = 0;
                steps[i].probability = 0;
                break;
            case '.':
                steps[i].velocity = 0;
                steps[i].note = 0;
                steps[i].probability = 0;
                break;
        }
    }

    return steps;
}


function generateSteps (notes, newRhythm) {
    if (newRhythm || _current_pattern == null) {
        var r = Math.floor(Math.random() * _patterns.length);
        _current_pattern = _patterns[r];
    }

    return pattern_to_steps (_current_pattern, notes)

}

exports.generateSteps = generateSteps;