import testGridMagnet from "./testGridManget";
import {getThreePoints, testPoint} from "./testGridManget";

test('should give three points', () => {
    expect(getThreePoints(10, 100)).toStrictEqual([10, 60, 110])
    expect(getThreePoints(-10, 50)).toStrictEqual([-10, 15, 40])
    expect(getThreePoints(0, 200)).toStrictEqual([0, 100, 200])
})

