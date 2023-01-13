import React from 'react'

export default function Home() {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '100%',
            background: '#343434',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontFamily: 'Montserrat', color: '#F3F4F8', textTransform: 'uppercase' }}>
            To-do <label style={{ color: '#000' }}>list</label>{' '}
          </h1>
        </div>
      </div>
    </>
  )
}
