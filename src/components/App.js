import React, {useEffect} from 'react'
import Header from './Header'
import AppRouter from '../router/AppRouter'


const App = () => {

    useEffect(() => {
        console.log('APP RENDERING')
    })
    return (
        <div className="marginb--1">
            <Header/>
            <AppRouter/>
        </div>
    )
}


export default App