import React from "react"
import '../Navbar/Navbar.css'
import modeDark from '../../assets/night.png'
import modeLight from '../../assets/day.png'
import logoWeb from '../../assets/Logoweb.png'



const navbar = ({theme,setTheme}) =>{
    const ToggleMode = () =>{
      theme == 'light' ? setTheme('dark') : setTheme('light')
  
    }

    return(
          <div className='navbar'>
              <img src={logoWeb} alt='' className='logo'></img>
              <ul className='nav-list'>
                <li>Home</li>
                <li>About</li>
                <li></li>
                <li></li>
  
              </ul>
  
              <img onClick={()=>{ToggleMode()}} src={theme == 'light' ? modeLight : modeDark} className='toggle-icon'></img>
  
          </div>
  
          
    )
}

export default Navbar