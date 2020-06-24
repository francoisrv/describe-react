import React from 'react'

const Render: React.FC<React.PropsWithChildren<{}>> = props => {
  return (
    <>
      { props.children }
    </>
  )
}

export default Render
