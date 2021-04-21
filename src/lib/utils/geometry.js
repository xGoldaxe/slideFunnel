import { create, curry, round } from "lodash"
import { loopArrayBack } from "./utils"

export var verticaleLine = curry(
    function verticaleLineCurry(height, x) {
        return [{x:x,y:0}, {x:x,y:height}]
    } ,
2)
export var horizontalLine = curry(
    function horizontalLineCurry(width, y) {
        return [{x:0,y:y}, {x:width,y:y}]
    }, 
2)

export function generateRectangleLines({x, y, width, height}) {
    var points = generateRectanglePoints({x, y, width, height});
    return loopArrayBack(points)(points.length)(createLine);
}

export function generateMagnetRectangleLines({x, y, width, height}) {
    var normalRectangle = generateRectangleLines({x, y, width, height})
    var centerLines = [
        createLine({x:x+(width/2),y:y},{x:x+(width/2),y:y+height}),
        createLine({x:x,y:y+(height/2)},{x:x+width,y:y+(height/2)})
    ]
    return [...normalRectangle, ...centerLines]
}

export function generateRectanglePoints({x, y, width, height}) {
    var points = []
    points.push({x:x,y:y})
    points.push({x:x+width,y:y})
    points.push({x:x+width,y:y+height})
    points.push({x:x,y:y+height})
    return points
}

export function createLine(point1, point2) {
    return [point1,point2]
}


export function getStraightLineEqution([A,B]) {
    var a = (B.y - A.y) / (B.x - A.x);
    var b = - (a * A.x) + A.y;
    console.log(a,b)
    return [a,b];
}

// export function cartesianEquation([A,B]) {
//     return a,c,b
// }


//pour chaque point on cherche le plus proche // on valide ensuite tout les points qui on le meme gap

//une fois que j'ai les lignes possibles, jexploite comme je veut
//=> des coordoonneéés (avec le x et le y le plus petit)

//=> hydrater les lignes d'aimant 

function hydrateLines(possibleLines) {
    //je prend un tableau
    //je regarde les segments issues d'une même droite 
    //définis un plus grand segment à partir des extrêmes segments
}

//math à faire : 
//pour notre cas on recoit un coefficient directeur par exemple, et on trie par 2 group les 2 coefficient ( 0 et infinity )

//need two segement
export function isSameLine([s1,s2]) {

    if(slope(s1) == Infinity || slope(s2) == Infinity) {//vertical
        return slope(s1) === slope(s2) && s2[0].x === s1[0].x
    }
    var equations = [lineEquation(s1),lineEquation(s2)]
    return equations[0].a === equations[1].a && equations[0].b === equations[1].b
}

export function gapBeetweenParallel([s1,s2]) {//we assume line are parrallel
    if(slope(s1) == Infinity) {//vertical
        return  s2[0].x - s1[0].x
    }
    var linesScope = slope(s1)
    var equation = [lineEquation(s1), lineEquation(s2)]
    return ((equation[1].b - equation[0].b)) / Math.sqrt(linesScope*linesScope + 1)
}

export function lineEquation([A,B]) {
    var a = slope([A,B])
    var b;
    if(a == Infinity) {//that mean horizontal line
        b = 0
        a = 0
    }
    var b = A.y - a*A.x;
    return {a,b}
}

export function isParallel(s1,s2) {
    return slope(s1) === slope(s2)
}

export function slope([A,B]) {
    if(A.x == B.x) {
        //horizontal line
        return Infinity
    }
    return round((B.y-A.y) / (B.x-A.x), 2)
}

// export function cartesianEquation(A,B) {
//     var b = slope(A,B);
//     var a = B.y-A.y;
//     var c = -(a*A.x + b*A.y)
//     return {a,b,c}
// }

// function getPossibleLines(magnetPow, gridArray, segments) {
//     // var gridArray = arrayOfArray((s) => slope(s)) // crée un tableau pour chaque groupe de parrallèle
//     //we find the closest line for each segments
//     magnetLines = segments.map((segment)=>{
//         var minGap = magnetPow+1;
//         var returnLine = null;
//         var parrallelGrid = gridArray.find((array) => isParallel(array[0], segment));
//         parrallelGrid.forEach((gridLine) => {
//             if(isParallel([segment, gridLine]) && gapBeetweenParallel([segment, gridLine]) <= minGap) {
//                 returnLine.push(gridLine)
//             }
//         })
//         return {returnLine, minGap}
//     })
//     //we find the closest line between the bestd of each segments
//     var optimalLine = magnetLines.sort((a,b) => a.minGap - b.minGap)[0]
//     return newArrayForEach(magnetLines, function() {
//         if(optimalLine.minGap == line.minGap) {
//             return line
//         }
//     })
// }