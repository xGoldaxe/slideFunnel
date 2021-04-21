import {verticaleLine, horizontalLine, generateRectangleLines, lineEquation, slope, gapBeetweenParallel, isSameLine} from './geometry.js';

test('should be an horizontal line', () => {
    expect(horizontalLine(100,0)).toEqual([{x:0,y:0},{x:100,y:0}])
})

test('should be a vertical line', () => {
    expect(verticaleLine(100,0)).toEqual([{x:0,y:0},{x:0,y:100}])
})

test('should give the 4 segment of a rectangle', () => {
    var result = [
        [{x:0,y:0}, {x:100,y:0}],
        [{x:100,y:0}, {x:100,y:100}],
        [{x:100,y:100}, {x:0,y:100}],
        [{x:0,y:100}, {x:0,y:0}],
    ]
    expect(generateRectangleLines({x:0,y:0,width:100,height:100})).toEqual(result)
})

test('should give the slope', () => {
    expect(slope([{x: 1, y: -3},{x: 5, y: 3}])).toBe(1.5)
    expect(slope([{x: 5, y: 3},{x: 1, y: -3}])).toBe(1.5)
    expect(slope([{x: 0, y: 100},{x: 100, y: 100}])).toBe(0)
    expect(slope([{x: 0, y: 0},{x: 0, y: 100}])).toBe(Infinity)
})

test('should be a,b cartesian equation', () => {
    expect(lineEquation([{x: 4, y: -1},{x: 3, y: 5}])).toEqual({a:-6,b:23})
    expect(lineEquation([{x: 0, y: 0},{x: 0, y: 100}])).toEqual({a: 0,b: 0}) // vertical
    expect(lineEquation([{x: 0, y: 20},{x: 100, y: 20}])).toEqual({a: 0,b: 20}) // horizontal
})

test('should be giving a gap', () => {
    var s1 = [{x:0,y:0},{x:100, y:0}]
    var s2 = [{x:0,y:5},{x:100, y:5}]
    expect(gapBeetweenParallel([s1,s2])).toEqual(5) // horizontal
    expect(gapBeetweenParallel([s2,s1])).toEqual(-5) // horizontal reverse
    var s1 = [{x:0,y:0},{x:100, y:0}]
    var s2 = [{x:0,y:-5},{x:100, y:-5}]
    expect(gapBeetweenParallel([s1,s2])).toEqual(-5) // horizontal neg
    expect(gapBeetweenParallel([s2,s1])).toEqual(5) // horizontal reverse neg

    s1 = [{x:0,y:0},{x:0, y:100}]
    s2 = [{x:5,y:0},{x:5, y:100}]
    expect(gapBeetweenParallel([s1,s2])).toEqual(5) // vertical
    expect(gapBeetweenParallel([s2,s1])).toEqual(-5) // vertical reverse
    s1 = [{x:0,y:0},{x:0, y:100}]
    s2 = [{x:-5,y:0},{x:-5, y:100}]
    expect(gapBeetweenParallel([s1,s2])).toEqual(-5) // vertical neg
    expect(gapBeetweenParallel([s2,s1])).toEqual(5) // vertical reverse neg
})

test.only('is same line', () => {
    var s1 = [{x:12,y:7},{x:8, y:5}]
    var s2 = [{x:0,y:0},{x:20, y:0}]
    var s3 = [{x:30,y:0},{x:120, y:0}]
    var s4 = [{x:0,y:50},{x:0, y:80}]
    var s5 = [{x:0,y:100},{x:0, y:20}]
    expect(isSameLine([s1,s1])).toBe(true) // identic segments
    expect(isSameLine([s1,s2])).toBe(false) // diferent segments
    expect(isSameLine([s2,s3])).toBe(true) // horizontal
    expect(isSameLine([s4,s5])).toBe(true) // vertical
    expect(isSameLine([[{x:600,y:0},{x:600, y : 700}],[{x:600,y:-89},{x: 2500, y: -89}]])).toBe(false)
    expect(isSameLine([[{x:11,y:0},{x:211, y : 0}],[{x:400,y:0},{x: 400, y: 700}]])).toBe(false)
})