import { useNavigate } from 'react-router-dom'

export default function PageNotFound(){
    const navigate = useNavigate()

    function returnHome(){
        navigate('/UserLogin')
    }

    return (
        <div>
            <img 
                src='/404.png' 
                alt='图片暂时不见了'
                style={{width: '100%', height: '41rem'}}>
            </img>
            <button
                onClick={returnHome}
                style={{
                    position: 'absolute',
                    left:'3%',
                    top:'2%',
                    width: '70px',
                    height: '54px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}></button>
        </div>
    )
}