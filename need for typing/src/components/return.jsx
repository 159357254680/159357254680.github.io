import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Return({path,src1,src2,width='8rem',height='5rem'}) {
    const [isPointed, setIsPointed] = useState(0);
    const navigate = useNavigate();
    
    const styles = {
        return:{
            display:'inline-block',
            position:'absolute',
            width:width,
            height:height,
            top:'1rem',
            left:'1rem',
            cursor:'pointer',
            zIndex:'1'
        },
    }

    return(
        <div
            onMouseEnter={() => setIsPointed(1)}
            onMouseLeave={() => setIsPointed(0)}
        >
            {isPointed === 1 ? 
                <img
                    src={src1}
                    alt="返回"
                    style={{
                        ...styles.return,
                    }}
                    onClick={() => navigate(path)}
                />
                    :
                <img 
                    src={src2}
                    alt="返回"
                    style={{
                                ...styles.return,
                            }}
                />
                        }
            </div>
    )
}

