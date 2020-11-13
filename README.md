# Zoom Cord

This bot aims to merge the functionality of zoom and slack (based purely on the way App Academy uses these two apps) into Discord.

## Commands
 
### breakout
Generates the pair programming rooms (group variant is on the way).
Requires two arguments to function:
 - Type: this is either open or closed, and dictates whether or not students are able to freely move between pairing rooms
 - Students: this is simply the list of students mentioned. They will be put into rooms based on their order in the list. First mentioned student and
   second mentioned student will be paired in a room together.
   
It, alongside the room creation, adds pair roles and a text channel for each pair. If the type is closed, the pair can only see their pairing room and chat channel,
while all is visible with the open type. Alongside this, if the student is in a voice channel at the time of the command being run, it will move the student into their
pairing room.

### move-back
Moves all students in pairing rooms back to the main channel without closing the rooms or removing the pairing roles.

### close
Closes all the pairing rooms and deletes all the pair roles. This will not move students back into the main room.

### setup
Creates a server structure based on App Academy uses (deletes any other channels first). Includes general discussion channels, help channels, and classroom channels. 
To re-setup an already setup server, simply delete the category called classroom. This will delete all channels in the server and create the setup from scratch.
Automatically assigns the user with an admin-level role called teacher, and generates a standard student role that is automatically added to anyone who joins after
setup command use.
Currently does not delete the teacher and student roles generated on use, and will simply make duplicates.

### poll
Creates a poll that uses reaction voting. Accepts up to 11 arguments. The first is the title of the poll, second and beyond are poll options.
A title and at least two options are required. Automatically ends after 60 seconds.

### countdown
Creates a timer. Arguments are as such: time (in the format of 10s, 5m, 1h, etc.) and (optionally) up to 4 emojis which will then "race" one another until
the timer reaches its end, upon which it will ping the student role, informing them the time has ended.

### help
Standard help command. Sends the description of each command.
