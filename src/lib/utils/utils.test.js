import { comparePropSendOtherProp, newArrayForEach, testInterval } from "./utils";

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