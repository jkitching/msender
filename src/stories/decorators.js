import React from 'react'

const style = {
  backgroundColor: '#EB9339',
  padding: '20px',
  borderRadius: '10px'
}

export const StoryDecorator = (props) => {
  return (
    <div style={{ ...style, ...props.style }}>
      {props.children}
    </div>
  )
}

export const decoratorFn = (props) => (story) => {
  return (
    <StoryDecorator {...props}>
      {story()}
    </StoryDecorator>
  )
}
