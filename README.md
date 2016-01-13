# vieprivee - Are you aware?

This is a basic way to process data from airpcap and such tools for analyzing traffic in a WiFi network.

This has been written by Juan David Cruz-Gomez and the wonderful collaboration of 
July Cortes, Santiago Ruano, Isabel Amigo and other people I just don't remember the name (my bad)
for the Brest Scince Hack Day 2015.

## Requirements
0- You need node.js and npm for this project to work. Go, install them.

1- Clone the project

~~~~
>$ git clone https://github.com/juandavidcruz/vieprivee.git
~~~~

2- Go into vieprivee and execute

~~~~
>$ cd vieprivee
>vieprivee$ npm install
>vieprivee$ bower install
~~~~

3- Verify bower_components:

~~~~
>vieprivee$ cd client
>vieprivee/client$ ln -s ../bower_components .
>vieprivee/client$ cd ..
~~~~

4- You should be ready to start the server:
~~~~
>vieprivee$ node server.js
~~~~

5- Go to you favorite browser and check http://localhost:8001
