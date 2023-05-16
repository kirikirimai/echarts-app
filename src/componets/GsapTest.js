import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";


const GsapTest = () => {

    const myElement = useRef(null);

    useEffect(() => {
        gsap.fromTo(myElement.current,
            { duration: 1, opacity: 0, y: 50 },
            { duration: 1, opacity: 1, y: 50,x:200 }
            );
    }, []);

    return (
        <div ref={myElement}>
            Hello, World!
        </div>
    );
}

export default GsapTest