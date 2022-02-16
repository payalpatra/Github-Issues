import React from 'react'

function Header() {
    return (
        <header className="App-header">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0Uu0auB-_30X62d-vUYM-jhN4TkqPqgv6A&usqp=CAU" height="42" alt="github ICon" />
        
            <input
            className="input input1"
            type="text"
            placeholder="Search"
            autofocus
            style ={{backgroundColor :"black"}}

          />

          
        </header>
    )
}

export default Header