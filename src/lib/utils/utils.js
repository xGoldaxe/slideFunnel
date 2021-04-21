import { curry } from "lodash"

export var findAndReturn = curry(
    function findAndReturn(value, array, callback) {
        var findValue = array.find((element) => {
            return callback(element) !== false
        })
        value = findValue !== undefined ? findValue : value
        return value
    },
3)

export var newArrayForEach = curry(
    function newArrayForEachCurry (array, callback) {
        var resultArray = []
        array.forEach((element) => {
            let result = callback(element)
            if(result !== undefined && result !== false && result !== null) {
                resultArray.push(result)
            }
        })
        return resultArray
    },
2)

export var newArrayFor = curry(
    function newArrayForCurry(init, test, step, callback) {
        var result = []
        for(let i = init; test(i); i += step) {
            result.push(callback(i))
        }
        return result
    }
)

export var testInterval = curry(
    function testIntervalCurry(framingArray, number) {
        framingArray = framingArray.sort((a ,b) => a - b);
        return number >= framingArray[0] && number <= framingArray[1]
    }
, 2)

export var comparePropSendOtherProp = curry((refObj, {compare,send}, otherObj) => {
    if(refObj.[compare] === otherObj.[compare]) {
        return otherObj.[send]
    }
    return false
},
3)

export function arrayInterval(step) {
    return function(max) {
        var resultArray = [];
        var value = 0;
        while(value <= max) {
            resultArray.push(value);
            value += step;
        }
        return resultArray;
    }
}

export var loopArrayBack = curry(
    function loopArrayBackCurry(array, iteration, callback) {
        var loop = newArrayFor(0, (i) => i<iteration, 1)
        return loop((i) => {
            let rollbackValueSetup = rollbackValue(array.length-1)
            return callback(array[rollbackValueSetup(i)],array[rollbackValueSetup(i+1)])
        })
    }, 
3)


export function rollbackValue(max) {
    return function rollbackValueSetup(value) {
        return value > max ? (value-(max+1)) : value
    }
}

export function arrayAreEqual(array) {
    var reference = array[0]
    var newArray = newArrayForEach(array)((element) => element === reference ? element : false)
    return newArray.length == array.length ? reference : false
}

export function returnPropEqual(array) {
    return function returnPropEqualCurry(prop) {
        var allProps = newArrayForEach(array)((element) => element.[prop]);
        return arrayAreEqual(allProps)
    }
}

export function testArrayWithArgs(array, callback) {
    return function testArrayWithArgs(...args) {
        return newArrayForEach(array)((element) => callback(element)(...args))
    }
}

export function arrayOfArray(array) {
    return function arrayOfArray(callback) {
        var modifiedArray = array.map((element) => callback(element))
        var watchingArray = []
        var watchingValue = null
        var resultArray = []
        while(modifiedArray.length !== 0) {
            if(!watchingValue) {
                watchingValue = modifiedArray[0]
            }
            for(let i = 0; i < modifiedArray.length; i++) {
                if(modifiedArray[i] === watchingValue) {
                    watchingArray.push(array[i])
                    array.splice(i,1)
                    modifiedArray.splice(i,1)
                    i--
                }
            }
            resultArray.push(watchingArray)
            watchingArray = []
            watchingValue = null
        }
        return resultArray
    }
}