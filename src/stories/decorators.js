import React from 'react'

const style = {
  backgroundColor: '#EB9339',
  padding: '40px',
  maxWidth: '500px',
  borderRadius: '10px'
}

export const StoryDecorator = (props) => {
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export const decoratorFn = (story) => {
  return (
    <StoryDecorator>
      {story()}
    </StoryDecorator>
  )
}
