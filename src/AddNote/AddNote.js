import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            title: '',
            date_modified: '',
            folder_id: '',
            content: '',
        }
    }
    static contextType = ApiContext;

    updateNoteContent = (noteContent) =>{
        this.setState({
            content: noteContent
        })
    }
    updateNoteTitle = (noteTitle) =>{
        this.setState({
            title: noteTitle
        })
    }
    updateFolderId = (folder_id) =>{
        this.setState({
            folder_id: folder_id
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();

        if(this.state.title.length === 0 || this.state.content.length === 0){
            alert('Please add title/content to note.')
            return "Title/content both required.";
        }else if(this.state.folder_id === ''){
            alert('please pick a folder to submit to')
            return "Pick a folder.";
        }
        
        const noteInfo = {
            title: this.state.title,
            folder_id: this.state.folder_id,
            content: this.state.content,
        }

        fetch(`${config.API_ENDPOINT}/notes/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(noteInfo)
        })
        .then(response => {
            if(!response.ok){
                return response.json()
                .then(error =>{
                    throw error
                })
            }
            return response.json();
        })
        .then(resJson => {
            this.context.notes.push(resJson)
            this.props.history.push(`/folder/${noteInfo.folder_id}`) 
        })
    
    }

    render(){
        return(
            <section className="AddNoteMain"> 
                <h2 className="Add-note__title">
                    Create a Note
                </h2>
                <form>
                    <label className="note-title-label">Title:</label>
                    <br/>
                    <input 
                        id="noteTitle"
                        type="text" 
                        placeholder="note title here" 
                        className="note-title-input"
                        onChange={e => this.updateNoteTitle(e.target.value)}/>
                    <br/>
                    <label className="note-content-label">Content:</label>
                    <br/>
                    <input 
                        id="noteContent"
                        type="text" 
                        placeholder="words go here" 
                        className="note-content-input"
                        onChange={e => this.updateNoteContent(e.target.value)}/>
                    <br/>
                    <label>Folder:</label>
                    <br/>
                    <select id="folderOption" onChange={e => this.updateFolderId(e.target.value)}>
                        <option value="">select folder</option>
                        {this.context.folders.map(folderName =>
                            <option key={folderName.id} value={folderName.id}>{folderName.name}</option>
                        )}
                    </select>
                    <br/>
                    <Link to="/">
                        <button className="submit-note-button" onClick={e => this.handleSubmit(e)}>
                            Submit
                        </button>
                    </Link>
                </form>
            </section>
        )
    }
}
