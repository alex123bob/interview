// Tournament
function getPoint (res){
    let point
    switch (res) {
        case 'win':
            point = 3;
            break;
        case 'draw':
            point = 1;
            break;
        case 'loss':
            point = 0;
            break;
        default:
            point = -1;
            break;
    }
    return point
}

function reverseResult (str){
    let result
    switch (res) {
        case 'win':
            result = 'loss';
            break;
        case 'draw':
            result = 'draw';
            break;
        case 'loss':
            result = 'win';
            break;
        default:
            result = false;
            break;
    }
    return result
}

function input (str){
    let historyData = localStorage.getItem('data') || '{}';
    historyData = JSON.parse(historyData)
    let arr = str.split(';')
    if (3 !== arr.length) {
        return false
    }
    let point = getPoint(arr[2])

    if (historyData[arr[0]] && point !== -1) {
        historyData[arr[0]][arr[2]]++
        historyData[arr[0]]['total'] += point
    }
    else {
        historyData[arr[0]] = {}
        historyData[arr[0]][arr[2]] = 1
        historyData[arr[0]]['total'] = point
    }

    if (historyData[arr[1]] && point !== -1) {
        historyData[arr[1]][arr[2]]++
        historyData[arr[1]]['total'] += point
    }
    else {
        historyData[arr[1]] = {}
        historyData[arr[1]][reverseResult(arr[2])] = 1
        historyData[arr[1]]['total'] = point
    }

    console.log(historyData)

    localStorage.setItem('data', JSON.stringify(historyData))
}


// Ordered Link List
function firstOrLast (arr, exp){
    if ( 'first/last'.indexOf(exp) === -1) {
        return false
    }
    let found = []
    let foundIndex = []
    arr.forEach((el, index, self) => {
        if (el[exp]) {
            found.push(el)
            foundIndex.push(index)
        }
    })
    if (found.length === 1) {
        arr.splice(foundIndex[0], 1)
        return found[0]
    }
    else {
        return false
    }
}

function order (arr){
    let first = firstOrLast(arr, 'first')
    let last = firstOrLast(arr, 'last')
    let res = []
    let specialObj = []
    first instanceof Object && res.push(first)
    arr.forEach((el) => {
        if (el.before || el.after) {
            specialObj.push(el)
        }
        else {
            res.push(el)
        }
    })
    // 这段地方有问题，我在调试，但时间到了，因为如果添加了新元素，res数组就会变化，直接遍历有问题，需要映射一张表记录index
    specialObj.forEach((obj) => {
        if (obj.before) {
            res.forEach((el, index) => {
                if (el.id === obj.before) {
                    res.splice(index, 0, obj)
                }
            })
        }
        else if (obj.after) {
            res.forEach((el, index) => {
                if (el.id === obj.after) {
                    res.splice(index + 1, 0, obj)
                }
            })
        }
    })
    last instanceof Object && res.push(last)
    console.log(res)
}


// Create Tree From Flat Data
function tree (arr){
    let res = {}
    let hash = {}
    let prev
    let next

    arr.forEach((obj, index, self) => {
        if (!obj.parentId) {
            res  = {
                prev: null,
                data: obj,
                next: null
            }
            self.splice(index, 1)
        }
    })

    arr.forEach((el) => {
        let pointer = res
        let attached = false
        while (pointer) {
            if (el.parentId === pointer.data.id) {
                pointer.next = el
                attached = false
                break
            }
            else {
                pointer = pointer.next
            }
        }
        for (let pro in hash) {
            if (hash[pro].data.id === el.id) {
                hash[pro].next = el
                attached = true
            }
        }
        // In this case, this element will be temporarily put into hashMap coz it's an standalone node.
        if (!attached) {
            hash[el.id] = {
                data: el,
                next: null,
                prev: null
            }
        }
    })

    // go through hashMap Object to attach the remaining nodes.
    for (let pro in hash) {
        
    }

    
}