import { flatten } from "lodash"
import { isSameLine } from "../utils/geometry"
import { newArrayForEach } from "../utils/utils"

export function hydrateMagnetLines(grid, segments) {
    var allLinesPossible = newArrayForEach(segments, (segment) => {
        var newArray = []
        newArray = newArrayForEach(grid, function condititionTest(gridSegment) {
            if(isSameLine([segment, gridSegment])) {
                return gridSegment
            }
            return false
        })
        if(newArray.length!==0) {
            newArray.push(segment)
            return newArray
        }
        return false
    })
    return newArrayForEach(allLinesPossible, (lines) => {
        return extremumLine(lines)
    })
}

export function extremumLine(lines) {//we assume that every lines are already parralel
    lines = flatten(lines);
    var lowestX = sortByProp(lines,'x', (a,b) => a-b)[0].x
    var lowestY = sortByProp(lines,'y', (a,b) => a-b)[0].y
    var highestX = sortByProp(lines,'x', (a,b) => b-a)[0].x
    var highestY = sortByProp(lines,'y', (a,b) => b-a)[0].y
    return [{x:lowestX, y:lowestY}, {x:highestX, y:highestY}]
}

export function sortByProp(array,prop, callback) {
    return array.sort((a,b) => callback(a.[prop], b.[prop]))
}