import React from "react"
import '../Navbar/Navbar.css'
import modeDark from '../../assets/night.png'
import modeLight from '../../assets/day.png'
import logoWeb from '../../assets/Logoweb.png'



const Navbar = ({theme,setTheme}) =>{

    const ToggleMode = () =>{
      theme == 'dark' ? setTheme('light') : setTheme('dark')
  
    }

    return(
          <div className='navbar'>
              <img src={logoWeb} alt='' className='logo'></img>
              <ul className='nav-list'>
                <li>Home</li>
                <li>About</li>
  
              </ul>
  
              <img onClick={()=>{ToggleMode()}} src={theme == 'dark' ? modeDark: modeLight} className='toggle-icon'></img>
  
          </div>
  
          
    )
}

export default Navbar