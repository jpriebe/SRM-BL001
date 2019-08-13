# blgen
Bassline generator - Max For Live Midi device

# how to use

- add the BLGen to your track
- activate the track with your midi controller
- select one or more notes with your midi controller
- click "regen" to generate a pattern

You can then play with the parameters and keep regenerating.  When you have something you like, you can click "Clip" to create a clip on your track in session view.

# parameters

## New rhythm

If activated, BLGen will select a new rhythm pattern from its list of patterns when you click "Regen".

## New accent pattern

If activated, BLGen will select a new accent pattern from its list of accent patterns when you click "Regen".

## Accents

### Probability

The probability that any note in the accent pattern that coincides with a note in the rhythm pattern will result in an actual accent being applied.

### Intensity

By default, notes in BLGen get a velocity of 96.  With an intensity of 100, accented notes will have a velocity of 127.  With an intensity of 50, the accented notes will have a velocity of 112.  With an intensity of 0, they will have velocity of 96 (basically negates the accent)


