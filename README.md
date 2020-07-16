## Spekit Frontend Challenge

A small frontend application that let's you search albums by artists, and mark them as favorites.

In the project directory, you can run:

### `yarn`

Will install all the required dependencies.<br />

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### Project Structure

The project structure has been kept flat for quick and easy access to files. Pages and general purpose components have been grouped into their respective folders. Utilities such as `helpers` have been places in the utils folder.

##### Libraries

For the purpose of keeping the project light extra overheads have been avoided wherever possible. Majority of the work has been done with bare bone `React` with a little help of `lodash` for data manipulation and `Crypto` for encrypting data to be stored in the browser.

##### Features

User has the ability to search and quickly add any album to their favorites. Once in the favorites section, user can either remove individual records or remove all at once.

##### Design

The design has been kept extremely simple with a focus mainly search. At default state, the application invites the user to search for their fav artists and displays the search results with popping album artwork and relevant information.

### Note

Due to the requirements of not using any CSS frameworks, the effort had been directed towards creating a simple yet effective design with all the core functionality included.
