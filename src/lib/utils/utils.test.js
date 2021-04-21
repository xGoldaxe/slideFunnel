import { comparePropSendOtherProp, newArrayFor, newArrayForEach, testInterval, loopArrayBack, arrayOfArray } from "./utils";

test('should be an include interval', () => {
    expect(testInterval([5,6])(5)).toBe(true)
    expect(testInterval([-5,5])(3)).toBe(true)
    expect(testInterval([5,-5])(3)).toBe(true)
    expect(testInterval([5,-5])(8)).toBe(false)
    expect(testInterval([5,-5])(-8)).toBe(false)
    expect(testInterval([5,-5])(-5)).toBe(true)
})

test('should compare prop object and return some prop', () => {
    var obj = {
        name: 'jack',
        surname: 'doe',
        age: '18'
    }
    var otherObj = {
        name: 'jane',
        surname: 'doe',
        age: '18'
    }
    expect(comparePropSendOtherProp(obj, {compare: 'name', send: 'name'}, otherObj)).toBe(false)
    expect(comparePropSendOtherProp(obj, {compare: 'age', send: 'name'}, otherObj)).toBe('jane')
    expect(comparePropSendOtherProp(obj, {compare: 'age', send: 'name'}, otherObj)).not.toBe('jack')
})

test('should create a new array with all the true call of the callback', () => {
    var array = [0,1,2,3,4,5,6,7,8,9]
    expect(newArrayForEach(array, (value)=>{
        return value;
    })).toEqual([0,1,2,3,4,5,6,7,8,9])
    expect(newArrayForEach(array, (value)=>{
        return value==1 || value == 2 ? 'giraffe' : false;
    })).toEqual(['giraffe','giraffe'])
})

test('should create a new array with a for loop', () => {
    var max = 300
    var loop = newArrayFor(0, (i) => i<=max, 100)
    var callback = (i) => i
    expect(loop(callback)).toEqual([0,100,200,300])
})

test('should loop throught an array many times', () => {
    var result = [
        [0,1],
        [1,2],
        [2,3],
        [3,0],
        [0,1],
        [1,2]
    ]
    var array = [0,1,2,3]
    expect(loopArrayBack(array,6,(a,b) => [a,b]))
})

test('should return an array of array', () => {
    var result = [[1,1,1,1],[2,2,2,2],[3,3,3]]
    expect(arrayOfArray([1,2,3,1,2,3,1,2,1,2,3])((x) => x*2)).toEqual(result)
})