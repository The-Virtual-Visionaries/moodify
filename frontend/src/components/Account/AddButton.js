import React from 'react'

function AddButton(props) {
  return (
    <button style={{
                padding: '2vh',
                backgroundColor: '#55B6B0', 
                color: 'white',
                fontSize: '2vw',
                width: '50px',
                height: '50px',
                borderRadius:'50%',
                border: 'none',
                textAlign: 'center',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            onClick={props.onClick}>+
    </button>
  )
}

export default AddButton