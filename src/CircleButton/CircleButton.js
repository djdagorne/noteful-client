import React from 'react'
import PropTypes from 'prop-types'
import './CircleButton.css'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}


NavCircleButton.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.array
}