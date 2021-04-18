import { curry } from "lodash";
import { findAndReturn, newArrayForEach, testInterval, comparePropSendOtherProp } from "./utils/utils";

export default function testGridMagnet({grid,magnetPow}) {
    return function testWithValue({x,y, width, height}) {
        var magnetPoint = {}
        magnetPoint.x = testObj({point:x, width:width})({grid: grid.x, magnetPow})
        magnetPoint.y = testObj({point:y, width:height})({grid: grid.y, magnetPow})
        return magnetPoint
    }
}

export function testObj(obj) {
    return function testThisObj({grid, magnetPow}) {
        var {point,width} = obj;
        var testingPoints = getThreePoints(point, width)
        var testGridSetUp = testGrid({grid, magnetPow})
        var possibleLines = newArrayForEach(testingPoints, testGridSetUp)

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
}

function testGrid({grid, magnetPow}) {
    return function setUpTestGrid(actualPoint) {
        const testPointWithSetUp = testPoint(magnetPow)(actualPoint)
        var newPoint = findAndReturn(actualPoint)(grid)(testPointWithSetUp)
        return newPoint !== actualPoint ? {
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