import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import ErrorBoundary from '../ErrorBoundary'
import './NoteListNav.css'

export default class NoteListNav extends React.Component { /*simply creates all elements in the side/navbar area, along with their URL path names etc */
  static contextType = ApiContext; /*creates the usable this.context */

  render() {
    const { folders=[], notes=[] } = this.context /*updates the locally used variables from the context */
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder => /*creating all folder navigation elements */
            <ErrorBoundary key={folder.id}>
            <li key={folder.id}> 
              <NavLink /*creates a list of nav links that stay highlighted when last clicked*/
                key={folder.id}
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`} /*sets up the hrefs create the URL based on folder_ids */
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}  
                </span>
                {folder.name}
              </NavLink>
            </li>
            </ErrorBoundary>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton /*creates an <a> that renders out to be a round button */
            tag={Link} /* makes Circlebutton an reactrouter aware anchor?*/
            to='/add-folder' /*changes URL to localhost3000/add-folder, routing aware */
            type='button' /*a11y sees it as a button though */
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
