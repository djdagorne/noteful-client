import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import AddFolder from '../AddFolder/AddFolder.js'
import AddNote from '../AddNote/AddNote.js'
import './App.css';

class App extends Component { //setting up empty state for updating
    static contextType = ApiContext;
    
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {  //standard fetch request, populates our state for App
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]); 
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = note_id => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== note_id) //creating a new array (to push to state) by filtering out everything that doesn't match the id we want to delete
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    //create the folder sidebar list, with URL listener functionalities
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    /> 
                ))}
                <Route path="/note/:note_id" component={NotePageNav} />  {/* changes the NavBar whenever we are in a note view mode*/}
                <Route path="/add-folder" component={NotePageNav} /> {/*navbar layout when in add-folder page... (mostly back button rendering) */}
                <Route path="/add-note" component={NotePageNav} /> {/*navbar layout when in add-note page... (mostly back button rendering) */}
            </>
        );
    }

    renderMainRoutes() { /*main content area of the html */
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => ( 
                    <Route
                        exact /*sets exact to be true, so no overlap occurs */
                        key={path} /*URL path passed to main page */
                        path={path}
                        component={NoteListMain} /* setting up note lists, first all notes and then notes unique to each folder_id and their URL path */
                    />
                ))}
                <Route path="/note/:note_id" component={NotePageMain} /> {/* main splash for full notes*/}
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        /* as render starts, the fetch request should be done already. the variable named 'value' is now set up to represent
        a copy of our state which was populated by the API call. it will be used to pass info as props */
        const value = { 
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };
        /*passing a copy of our state to part of our app that renders the page. 
        we have the information with context, its only needs to be provided to the rendering.

        so the info started as a blank object (state), had a fetch promise made to populate it,
        and then is put into another object (value), so it can a provider to every component necessary in the app.*/

        return (
            <ApiContext.Provider value={value}>    {/* this is where context inherits its value to pass onto its children */}             
                <div className="App">
                    
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    
                    <main className="App__main">{this.renderMainRoutes()}</main>
                    
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
