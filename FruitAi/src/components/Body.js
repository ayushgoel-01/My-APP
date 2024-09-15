import React from 'react'
import { createBrowserRouter, Router } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import About from './About'
import Faq from './Faq'
import Chat from './Chat'
import FruitDetails from './FruitDetails'
import Translate from './Translate'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/Home",
            element: <Home/>
        },
        {
            path: "/About",
            element: <About/>
        },
        {
            path: "/Faq",
            element: <Faq/>
        },
        {
            path: "/Chat",
            element: <Chat/>
        },
        {
            path: "/fruit/:id",
            element: <FruitDetails/>
        },
        {
            path: "/Translate",
            element: <Translate/>
        },
    ]);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body