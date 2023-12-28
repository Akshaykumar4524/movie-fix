import React from 'react'

export const NoMovie = ({ isScroll }) => {
  return (
    <div className='no-movie'>
      <h1>No Movies Found!!!! 😞</h1>
      {isScroll && <h2>Please scroll down or Up to see other year movies...</h2>}
    </div>
  )
}
