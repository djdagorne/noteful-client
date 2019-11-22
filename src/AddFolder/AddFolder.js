import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import PropTypes from 'prop-types'


export default class AddFolder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            folderName: ''
        }
    }
    static contextType = ApiContext;

    updateFolderName = (folderName) =>{
        this.setState({
            folderName: folderName
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.folderName.length === 0){
            alert("Folder name required.")
            return "Folder name required.";
        }
        const folderInfo = {
            name: this.state.folderName
        }

        fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folderInfo)
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
            this.context.folders.push(resJson) //push into context, since API only updates context on componentDidMount
            this.props.history.push(`/folder/${resJson.id}`)
        })
        .catch(error => {
            alert(error);
            this.props.history.push('/');
        })
    }
    render(){
        return (
            <section className="AddFolderMain"> 
                <h2 className="Add-folder__title">
                    Create a folder
                </h2>
                <p className="Add-folder__desc">
                    Name your new folder
                </p>
                <form>
                    <label className="folder-name-label">Name:</label><br/>
                    <input 
                        id="folderName"
                        type="text" 
                        placeholder="folder name here" 
                        className="folder-name-input"
                        onChange={e => this.updateFolderName(e.target.value)}
                        required/><br/>
                    <Link to="/">
                        <button className="submit-folder-button" onClick={e => this.handleSubmit(e)}>
                            Submit
                        </button>
                    </Link>
                </form>
            </section>
        )
    }
}

AddFolder.propType = {
    folderName: PropTypes.string.isRequired
}