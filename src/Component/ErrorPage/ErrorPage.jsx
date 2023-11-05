import React from 'react'
import { useEffect } from 'react';

export default function ErrorPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <div>
          <h2 className='fw-bolder'>Error 404 Not found page</h2>
          <p className='py-3 text-muted'>We couldn't find what you were looking for.</p>
        </div>
    </div>
  )
}
