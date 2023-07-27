import React, { useState } from 'react'

export default function Pagination(props)
{
    
    
  return (
    <div className='flex justify-center box-border md:m-3 m-1'>
        <button className=' text-base md:text-xl p-1 md:p-2 border-2 border-r-0 rounded-l-xl hover:bg-gray-200' onClick={props.Decrease}>Previous</button>
        <button className=' text-base md:text-xl p-1 md:p-2 border-2 bg-gray-100'>{props.page}</button>
        <button className=' text-base md:text-xl p-1 md:p-2 border-2 border-l-0 rounded-r-xl hover:bg-gray-200' onClick={props.Increase}>Next</button>
    </div>
  )

}
  

