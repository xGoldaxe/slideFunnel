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