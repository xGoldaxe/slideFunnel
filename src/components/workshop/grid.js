import { render } from '@testing-library/react';
import React from 'react'

function Grid({grid, size}) {
    console.log('render')
    const {width, height} = size;
    return (
        <svg width={width} height={height} version="1.1" xmlns="http://www.w3.org/2000/svg"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            {grid.x.map((x) => {
                return  <line x1={x} x2={x} y1="0" y2={height} stroke="white" fill="transparent" stroke-width="0.2"/>
            })}
            {grid.y.map((y) => {
                return  <line x1={0} x2={width} y1={y} y2={y} stroke="white" fill="transparent" stroke-width="0.2"/>
            })}
        </svg>
    )
}

export default React.memo(Grid)