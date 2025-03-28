import {useRef,useEffect,memo} from 'react'
const AnimatedCar = memo(({ carPosition, wheelRotation }) => {
    const carRef = useRef(null)
    const wheelBeforeRef = useRef(null)
    const wheelAfterRef = useRef(null)
  

    useEffect(() => {
      if (carRef.current) {
        carRef.current.style.transform = `translateX(${carPosition}px)`
        carRef.current.style.transition = 'transform 0.5s ease-in-out'
      }
    }, [carPosition])
  
    useEffect(() => {
      if (wheelBeforeRef.current) {
        wheelBeforeRef.current.style.transform = `rotate(${wheelRotation}deg)`
        wheelBeforeRef.current.style.transition = 'transform 0.5s ease-in-out'
      }
      if (wheelAfterRef.current) {
        wheelAfterRef.current.style.transform = `rotate(${wheelRotation}deg)`
        wheelAfterRef.current.style.transition = 'transform 0.5s ease-in-out'
      }
    }, [wheelRotation])
  
    return (
      <div ref={carRef} className="car2">
        <img
          ref={wheelBeforeRef}
          src="车轮.png"
          alt="Wheel"
          className="wheel-before2"
        />
        <img src="/车.png" alt="Car" className="car-body2"/>
        <img
          ref={wheelAfterRef}
          src="车轮.png"
          alt="Wheel"
          className="wheel-after2"
        />
      </div>
    )
  })

  AnimatedCar.displayName = 'AnimatedCar' 
  
  export default AnimatedCar