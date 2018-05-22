import React from 'react'

const style = {
  backgroundColor: '#EB9339',
  padding: '20px',
  borderRadius: '10px'
}

export const StoryDecorator = (props) => {
  const s = Object.assign({}, style, props.style)
  return (
    <div style={s}>
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
