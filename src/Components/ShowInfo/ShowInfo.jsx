import React from 'react'
import './ShowInfo.css'

const ShowInfo = ({id}) => {

    return (    

        <><div className='InfoShow'>
            <h1 className='TextShow'>Input</h1>
        </div>
        
        <div className="InfoContainer">
                <div>
                    <h1 className='HelpInfo'>
                        Search your Steam info is easy. Just put your steamid or account url.
                    </h1>

                </div>
            </div></>
    )
}

export default ShowInfo