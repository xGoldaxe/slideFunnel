import { curry } from "lodash";
import { gapBeetweenParallel, isParallel } from "./utils/geometry";
import { findAndReturn, newArrayForEach, testInterval, comparePropSendOtherProp, testArrayWithArgs, returnPropEqual } from "./utils/utils";

export default function testGridForMovement({grid,magnetPow}) {
    return function testWithValue({x,y, width, height}) {
        var magnetPoint = {}
        magnetPoint.x = getPossibleLinesDirection(magnetPow, grid, 'x', x, width)
        magnetPoint.y = getPossibleLinesDirection(magnetPow, grid, 'y', y, height)
        return magnetPoint
    }
}

export function testSingleLine({grid, magnetPow}) {
    return function testSingleLine(point) {
        var newGrid = getGridPoints(grid)('x')
        return getPossibleLines(magnetPow, newGrid, [point], point)
    }
}

export function getPossibleLinesDirection(magnetPow, grid, direction, point, width) {
    var singleDirGrid = getGridPoints(grid)(direction);
    return getPossibleLines(magnetPow, singleDirGrid)(getThreePoints(point, width), point, direction)
}

export function getGridPoints(grid) {
    return function getGridPoints(direction) {
        return testArrayWithArgs(grid, returnPropEqual)(direction)
    }
}

export var getPossibleLines = curry(
    function getPossibleLinesCurry (magnetPow, grid, arrayPoints, point) {
        var possibleLines = newArrayForEach(arrayPoints)(testGrid({grid , magnetPow}));
        return sortLines(possibleLines, point)
    },
4)

export function sortLines(possibleLines, point) {
    if(possibleLines.length) {
        var optimalLine = possibleLines.sort((a, b) => a.diff - b.diff)[0]
        return {
            point: optimalLine.newPoint - (optimalLine.oldPoint - point),
            magnetLine: newArrayForEach(possibleLines, comparePropSendOtherProp(optimalLine, {compare: 'diff', send: 'newPoint'}))
        }
    } 
    return {
        point: point,
        magnetLine: false
    }
}



function testGrid({grid, magnetPow}) {
    return function setUpTestGrid(actualPoint) {
        const testPointWithSetUp = testPoint(magnetPow)(actualPoint)
        var newPoint = grid.find(testPointWithSetUp)
        return newPoint !== undefined ? {
            newPoint: newPoint,
            oldPoint: actualPoint,
            diff: newPoint - actualPoint
        } : false
    }
}

export var testPoint = curry(
    function testPointCurry(magnetPow, point, gridLine) {
        return testInterval([-magnetPow,magnetPow])(gridLine-point);
    },
3)

export function getThreePoints(origin, width) {
    var end = origin + width;
    var center = origin + Math.round(width/2)
    return [origin, center, end]
}