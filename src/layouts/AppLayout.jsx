import React from 'react'
import { Outlet } from 'react-router-dom'


function AppLayout() {
  return (
    <main>
        // Header
        <Outlet/>
    </main>

    // footer
  )
}

export default AppLayout