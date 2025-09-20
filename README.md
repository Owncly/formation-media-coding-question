# Formation Media React Solution Overview
This project was completed using the MERN stack (MongoDB, React + Express, Nodejs). React is my preferred framework for front-end development due to its ease of use, great Docs, modern approach and its popularity. I have prior experience with MongoDB and from a database perspective, MongoDB seems the most reasonable as it is originally quite lightweight and for an application that seems likely to require scalability (the use of docker reinforces this), it lets you store nested, unstructured data ideal for this concept. Using MERN allows for modularity, clarity, and future-proof architecture conforming to current industry standards.
This project was created in the order of - front-end -> backend/database -> Styling and docker, using branches for features.

## Project Structure
### Client
The client side here refers to the Frontend (React), in the src folder we have folders; pages, components, services and styles. 
The file App.js the entry point that controls the routing and DataInitialiser which is used to gather the JSON before loading, by first checking the database, and if failing calling externalMenuService to acquire it.
The file router.jsx is used as a standard way to route between the various pages

#### Pages
We have the initial Display page which calls the component JsonTree.jsx to visually display the JSON data and similarly, BottomNav.jsx which also allows for page navigation
On the secondary page, modify, we have a similar tree loaded by EditJsonTree.jsx and again BottomNav.jsx, these pages both share a MainPages.css file for consistency

The Display pages' JsonTree is loaded exclusively from the database's data. Using state hooks, the Json data is displayed as a tree list, with a ternary operator controlling the + - or • depending on if it is a parent, a parent displaying its children, or a child. The Display page offers a clean, minimal interface that emphasizes readability and structure. The reason I went with this method was, from looking at the Json data content, it appeared to me this was attempting to show a kind of file structure perhaps where you would then access the file at the end of these trees on click. Therefore, by using a basic tree spread it would be easy to follow at a glance the entire data (provided it was not too large) and the ability to close/open the tree structure to help with readability. This is styled using JsonTree.css.

The Modify pages' EditJsonTree uses a similar concept with more complexity, the component loads a box to contain and scale with an internal scrollbar in case the zoom is high or on a smaller device.

#### EditJsonTree 
For this development I chose to create the lists manually instead of using a library to import a fully completed drag-able list component to showcase, this was for two reasons, one to allow for modifiability as this project seemed to only be in the initial stages. And secondly to help showcase my ability with more complex development. 

The EditJsonTree component, acquires the data and assigns it unique IDs to keep track of it using format item1->item2->item1 which also has the benefit of making it easier for debugging, this structure is re-assigned whenever the user updates it. 
Due to the de-indent functionality we keep track of the parents and grandparents of each node. 
Apart from loading the items in the same way as JsonTree, the code displays 5 buttons to the left hand side. Delete, Move-Up, Move-Down, Indent, De-Indent. I chose to use react-icons for these buttons for visibility. These buttons allow you to move elements in their respective ways, updating the tree structure and assigning + - • depending on their current position. An edit name was added via a hover pencil button (from react-icons) which appears when hovering over that line as well as double click functionality for convenience when editing.
There are two additional buttons, "Save Changes" and "Reset to External Data". Save changes was used to minimize the required amount of put calls to the database so that only one submission, a singular call is required. The reset button was added as, from my perspective, the functionality could easily be for variable data that you for instance may be wanting to re-import into it (like a data endpoint that keeps track of another program's structure).
This is styled using EditJsonTree.css

#### Services
In the folder Services there are two ways of gathering data, internalMenuService and externalMenuService. External uses an Async request to gather the data from the provided url endpoint and internal uses the /records call to the backend to gather the data from MongoDB

### Server
This uses connection.js for the MongoDB connectivity, a central index.js for ports, endpoint, express connection etc and most significantly records for grabbing and put-ing to the database, I have left in other defaults for likely further development.

## Extras from the requirements
A more complex tree instead of using an import, the reset/save buttons and a expandable function to the trees.

### Dockerfiles
A docker-compose.yaml sits in the origin directory and controls the two dockerfiles in the respective client and server folders, this allows docker-compose to run both the front and back end at the same time. Additionally as MongoDB on docker requires credentials to be specified, these are abstracted in a .env file and gitignored to prevent security problems.

## Setup Steps
### Requirements
This will require Docker to be installed, preferably Docker Desktop, additionally Visual Studio Code is recommended for code viewing.

Clone the repository and cd into the root where saved.
Create a .env file with the below, or credentials of your choice.

### MongoDB root credentials
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_INITDB_DATABASE=menuDB

### MongoDB URI for Express
MONGO_URI=mongodb://admin:secret@mongodb:27017/menuDB?authSource=admin

### Express server port
PORT=5000

In this same root directory run "docker-compose up --build".
This will run the Backend on port 5000 and Frontend on port 3000, accessible at http://localhost:3000/ .
