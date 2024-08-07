import React, { useEffect } from 'react'
import './Home.css'
import THREE from 'three'

const Home = () => {

    useEffect ( () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 1000);
    }, [])


    return (
        <div className="home">
            <canvas className="homeCanvas"></canvas>
        </div>
    )
}

export default Home