import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = { 
    match: {
      params: {}
    }
  }
  static contextType = ApiContext /* sets up this.context*/

  handleDeleteNote = note_id => { 
    this.props.history.push(`/`) //sends user back to homepage, while component has the code for removing note from api
  }

  render() {
    const { notes } = this.context
    const { note_id } = this.props.match.params /* gets note_id from the URL we are currently on */
    //console.log('notepagemain, note_id', note_id)
    //console.log('notes: ',notes)
    const note = findNote(notes, note_id) || { content: '' } /*filtering function. if the api suddenly breaks it renders empty, but thats ok */
    //console.log('note: ',note)
    return (
      // <ApiContext.consumer>
        <section className='NotePageMain'>
          <Note /* renders a copy of our current Note card on the page with the note itself */
            id={note.id}
            title={note.title}
            date_modified={note.date_modified}
            folder_id={note.folder_id}
            onDeleteNote={this.handleDeleteNote} /* delete button, as of chpnt.16 sends us to the homepage */
          />
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) => /* little formatting code*/
              <p key={i}>{para}</p> /* keys for each paragraph of each notes content*/
            )}
          </div>
        </section>
      // </ApiContext.consumer> 
    )
  }
}
