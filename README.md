# SRM-BL001
Stochastic Rhythm Machines - Bass Line 001

This is a Max for Live device to generate Tech House basslines

![SRM-BL001 Screenshot](https://github.com/jpriebe/SRM-BL001/blob/master/SRM-BL001-screenshot.png?raw=true)

# how to use

- add SRM-BL001 to your track
- activate the track with your midi controller
- select one or more notes with your midi controller
- click "regen" to generate a pattern

You can then play with the parameters and keep regenerating.  When you have something you like, you can click "Clip" to create a clip on your track in session view.

# parameters

## New rhythm

If activated, SRM-BL001 will select a new rhythm pattern from its list of patterns when you click "Regen".

## New note assignments

If activated, SRM-BL001 will select new notes for each beat in the rhythm pattern from your selected notes.  If "new rhythm" is selected, it forces new note assignments.

## New accent pattern

If activated, SRM-BL001 will select a new accent pattern from its list of accent patterns when you click "Regen".

## Notes

### Probability

The probability that any beat in the randomly selected pattern will result in a note.

### Front

Specifies the note selection bias towards the first notes selected via MIDI controller

## Accents

### Probability

The probability that any note in the accent pattern that coincides with a note in the rhythm pattern will result in an actual accent being applied.

### Intensity

By default, notes in BLGen get a velocity of 96.  With an intensity of 100, accented notes will have a velocity of 127.  With an intensity of 50, the accented notes will have a velocity of 112.  With an intensity of 0, they will have velocity of 96 (basically negates the accent)

## Slide

### Probability

The probability that a given note will slide to the next note.  Max for Live's live.step control is limited in the options for note duration -- they can only be 1/16, 1/8, 1/4.  So sometimes, the slide will overlap the second note.  That's not always a bad thing.

