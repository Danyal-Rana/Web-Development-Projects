import React from 'react'

const CurrentTime = () => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
            </div >
        </>
    )
}

export default CurrentTime