# Kartfolio

Made without server side, all magic happens on the front end.

### Building:

NodeJS have to be installed.

Open a terminal window at the project directory and type one of the available commands for the choosen action:

Type `gulp` to do create fresh build from current sources every time before starting working on the project.

Type `gulp watch` to start live reload, it will open a new tab in default web browser pointing to address `localhost:8080`. Every time a change is maked in `.hmlt`, `.less`, or `.js` files it will rebuild the project and reload the previously opened browser tab.
To stop the process press `ctrl+c` in the terminal, or close the terminal window.

Type `gulp release` to create realease build which can be then copied to the server. All files that should be copied are going to be located in `build/` direcotry.

---
### TODO:

button x movable

image loading spinner
    find out solution for img sizing 100% to keep space on the page

non webkit scrollbar fix

---
### Requests:
