import { verticaleLine, horizontalLine } from "../utils/geometry"
import { newArrayFor } from "../utils/utils"

export function createGridLines({width, height}) {
    const verticaleLinesArray = createLines(width)(verticaleLine(height))
    const horizontalLinesArray = createLines(height)(horizontalLine(width))
    return [...verticaleLinesArray, ...horizontalLinesArray]
}

export function createLines(max) {
    return function createLinesCurry(callback) {
        var loop = newArrayFor(0, (i) => i<=max, 100)
        return loop(callback)
    }
}

export function createLinesOfSquare({x,y,width, height}) {

}