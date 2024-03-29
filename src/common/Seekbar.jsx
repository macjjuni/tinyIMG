import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const WrapStyled = styled.div`
    position: absolute; bottom: 10px; right: 10px; background-color: rgba(0,0,0, 0.25);
    width: 130px; height:50px; z-index: 1000; user-select: none;
    & p{ 
        position: absolute; left: 50%; top: 25%; transform: translate(-50%, -50%);
        font-size: 12px; color: #fff; width: 100%; text-align: center;
    }    
`
const SeekbarStyled = styled.div`
    display: inline-block; position: absolute; top: 70%; left: 50%; transform : translate(-50%, -50%);
    width: 100px; height: 8px; border-radius: 5px;
    background-color: #fff !important;`
const SeekStyled = styled.span` 
    display: inline-blcok; position: absolute; top: 50%; transform: translate(-50%, -50%); 
    left: ${props=> props.left}px;
    width: 20px; height: 20px; user-select: none;
    border-radius: 50%; cursor: pointer; background-color: #EEEEEE; border: 1px solid #B2B1B9;
`

const Seekbar = ({changeQuality}) => {

    const [_default, setDefault] = useState(70) // _default === left
    const [left, setLeft] = useState(70); // 0~100
    const [clientX, setClientX] = useState();

    useEffect(()=> {
        if(clientX !== undefined){
            document.onmouseup = closeDrag;
            document.addEventListener('touchend',closeDrag);
            document.onmousemove = elementDrag;
            document.addEventListener('ontouchmove',elementDrag);
        }
    }, [clientX]);
    useEffect(()=> {
        changeQuality(left);
        setDefault(left);
    }, [left]);
    
    const mouseDown = (e) => {
        // e = e || window.event;
        // e.preventDefault();
        
        if (e.changedTouches) {
            e.clientX = e.changedTouches[0].clientX
        }
    
        setClientX(e.clientX);
        
    }

    const elementDrag = (e) =>{
        
        // e = e || window.event;
        // e.preventDefault();
        if (e.changedTouches) {
            e.clientX = e.changedTouches[0].clientX;
            const moveX = (clientX - e.clientX).toFixed(0)/40;
            const realMoveX = _default - moveX;
            
            if(realMoveX >= 0 && realMoveX <= 100){            
                setLeft(realMoveX);
            }   

        }else{

            const moveX = (clientX - e.clientX).toFixed(1);
            const realMoveX = _default - moveX;
            if(realMoveX >= 0 && realMoveX <= 100){            
                if(realMoveX%2 === 0){
                    setLeft(realMoveX);
                }
            }        
        }
        
        
    }

    function closeDrag() {
        document.onmouseup = null;
        document.removeEventListener('touchend', closeDrag);
        document.onmousemove = null;
        document.removeEventListener('touchmove', elementDrag);
    }

    return(
        <WrapStyled>
            <p>Quality : {left.toFixed(0)}%</p>
            <SeekbarStyled>
                <SeekStyled onMouseDown={mouseDown} onTouchStart={mouseDown} onTouchMove={elementDrag} left={left}/>
            </SeekbarStyled>
        </WrapStyled>    
    )
}

export default Seekbar;