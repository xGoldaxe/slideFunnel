import { render } from '@testing-library/react';
import React from 'react'
import { returnPropEqual, testArrayWithArgs } from '../../lib/utils/utils';

function Grid({grid, size}) {
    const {width, height} = size;
    var getLinePoints = testArrayWithArgs(grid, returnPropEqual)
    
    return (
        <svg width={width} height={height} version="1.1" xmlns="http://www.w3.org/2000/svg"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            {grid.map((line) => {
                return  <line x1={line[0].x} x2={line[1].x} y1={line[0].y} y2={line[1].y} stroke="white" fill="transparent" strokeWidth="0.2"/>
            })}
        </svg>
    )
}

export default React.memo(Grid)