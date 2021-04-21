import { createGridLines, createLinesOfSquare } from './grid';

test('should create the grid', () => {
    let testObj = [
        [{x:0,y:0},{x:0,y:100}],
        [{x:100,y:0},{x:100,y:100}],
        [{x:0,y:0},{x:100,y:0}],
        [{x:0,y:100},{x:100,y:100}]
    ]
    
    expect(createGridLines({
        width: 100,
        height: 100
    })).toEqual(testObj)


    // expect(createGridLines({
    //     width: 200,
    //     height: 200
    // })).toEqual([
    //     [{x:0,y:0},{x:0,y:200}],
    //     [{x:100,y:0},{x:100,y:200}],
    //     [{x:200,y:0},{x:200,y:200}]
    // ])
})


// test('should give the 6 magnet lines', () => {
//     expect(createGridLines({x:0,y:0,width: 100, height:100})).toEqual([

//     ])
// })