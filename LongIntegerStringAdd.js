// 题目
// 实现一个函数add，输入两个字符串表达的整数，计算二者之和。

// 输入输出样例
// 样例一
// 输入：add("123", "456")
// 输出："579"

// 样例二
// 输入：add("11111111111111111111", "22222222222222222222")
// 输出："33333333333333333333"

// 样例三
// 输入：add("123456", "-1234")
// 输出："122222"

// 样例四
// 输入：add("-123456", "1234")
// 输出："-122222"

// 样例五
// 输入：add("1234", "-1234")
// 输出："0"

function add(strFirst, strSecond) {
    first = strFirst.split('');
    second = strSecond.split('');
    let carryOver = 0;
    let borrow = 0;
    let sign = '';

    /**
     * function instance to do single digit add.
     * @param {String} dA 
     * @param {String} dB 
     */
    let singleDigitAdd = function (dA, dB) {
        let sum = parseInt(dA, 10) + parseInt(dB, 10) + carryOver;
        let remainder;
        if (sum > 10) {
            remainder = sum % 10;
            carryOver = 1;
            return remainder;
        }
        else {
            carryOver = 0;
            return sum;
        }
    }

    /**
     * Likewise, single digit subtraction.
     * @param {String} dA 
     * @param {String} dB 
     */
    let singleDigitSubtract = function (dA, dB) {
        let a = parseInt(dA, 10);
        let b = parseInt(dB, 10);
        let res;
        if (a >= b) {
            res = a - borrow - b;
            borrow = 0;
        }
        else {
            res = a + 10 - borrow - b;
            borrow = 1;
        }
        return res;
    }

    /**
     * Kick "sign" outta the input array, reverse array in order to make it easier to do adding & subtraction.
     * @param {Array<String>} arr 
     */
    let sortOut = function (arr) {
        return /-/i.test(arr[0]) ? (sign += '-', arr.slice(1).reverse()) : arr.reverse();
    }

    /**
   * Assume the operation is subtraction
   * @param {String} strA 
   * @param {String} strB 
   */
    let detectResultSign = function (strA, strB) {
        return (
            (strA[0] === '-' && Math.abs(strA) > Math.abs(strB))
            || (strB[0] === '-' && Math.abs(strB) > Math.abs(strA))
        ) ? '-' : '';
    }

    /**
   * Check if result array is filled with straight zero.
   * @param {Array<Number>} arr 
   */
    let isZero = function (arr) {
        return arr.reduce(function (pre, current) {
            return parseInt(pre, 10) + parseInt(current, 10);
        }, 0) === 0;
    }

    /**
     * Trim result array that starts with couple of "zero" digits 
     * @param {Array<Number>} arr 
     */
    let trimZero = function (arr) {
        let stop = false;
        let trimIdx = -1;
        arr.forEach(function (el, idx) {
            if (stop) {
                // do nothing.
            }
            else {
                if (el === 0) {
                    trimIdx = idx;
                }
                else {
                    stop = true;
                }
            }
        });
        return trimIdx >= 0 ? arr.slice(trimIdx + 1) : arr;
    }

    first = sortOut(first);
    second = sortOut(second);

    let isSubtraction = /^-$/i.test(sign);

    // Add
    if (!isSubtraction) {
        let res = first.length > second.length ? first.map(function (firstEl, idx) {
            let secondEl = second[idx] || 0;
            return singleDigitAdd(firstEl, secondEl);

        }) : second.map(function (secondEl, idx) {
            let firstEl = first[idx] || 0;
            return singleDigitAdd(secondEl, firstEl);
        })
        return res.reverse().join('');
    }
    // Subtraction
    else {
        let resultSign = detectResultSign(strFirst, strSecond);
        let res = first.length > second.length || Math.abs(first) > Math.abs(second) ? first.map(function (firstEl, idx) {
            let secondEl = second[idx] || 0;
            return singleDigitSubtract(firstEl, secondEl);
        }) : second.map(function (secondEl, idx) {
            let firstEl = first[idx] || 0;
            return singleDigitSubtract(secondEl, firstEl);
        })
        return isZero(res) ? 0 : resultSign + trimZero(res.reverse()).join('');
    }
}
