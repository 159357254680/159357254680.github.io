import {useRef,useEffect,memo} from 'react' 

const AnimatedBackground = memo(({ offset }) => {
    const backgroundRef = useRef(null)
    useEffect(() => {
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translateX(-${offset}%)`
        backgroundRef.current.style.transition = 'transform 0.5s ease-in-out'
      }
    }, [offset])
  
    return (
      <div ref={backgroundRef} className="background2">
        <img src="/海边公路1.png" alt="Background 1" />
        <img src="/海边公路2.png" alt="Background 2" />
        <img src="/海边公路3.png" alt="Background 3" />
        <img src="/隧道.png" alt="隧道" />
        <img src="/村庄公路1.png" alt="Background 1" />
        <img src="/村庄公路2.png" alt="Background 2" />
        <img src="/村庄公路3.png" alt="Background 3" />
        <img src="/隧道.png" alt="隧道" />
        <img src="/山地公路1.png" alt="Background 1" />
        <img src="/山地公路2.png" alt="Background 2" />
        <img src="/山地公路3.png" alt="Background 3" />
        <img src="/隧道.png" alt="隧道" />
        <img src="/麦田公路1.png" alt="Background 1" />
        <img src="/麦田公路2.png" alt="Background 2" />
        <img src="/麦田公路3.png" alt="Background 3" />
        <img src="/隧道.png" alt="隧道" />
        <img src="/森林公路1.png" alt="Background 1" />
        <img src="/森林公路2.png" alt="Background 2" />
        <img src="/森林公路3.png" alt="Background 2" />
      </div>
    )
  })

  AnimatedBackground.displayName = "AnimatedBackground";

  export default AnimatedBackground