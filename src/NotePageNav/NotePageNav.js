import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NotePageNav.css'

export default class NotePageNav extends React.Component { 
  static defaultProps = { /*default props so things render regardless of server status/props failing to get handed down */
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context /*setting up context to be modifiable/readable from this component */
    const { note_id } = this.props.match.params  /* takes the note_id from the object created by the URL we chose (that object is params:{note_id: 'etc'})  */
    const note = findNote(notes, note_id) || {}  /* reusable filtering functions */
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button' /*makes it a button instead of an anchor*/
          role='link' /*a11y thing*/
          onClick={() => this.props.history.goBack()} /*.history.goBack will tell this to find the last URL and go to it */
          className='NotePageNav__back-button' /* class will always be notepagenav even when on the add-whatever pages*/
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && ( /* puts a the folders name in the sidebar as found by .filter-ing what folder the note is part of */
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}