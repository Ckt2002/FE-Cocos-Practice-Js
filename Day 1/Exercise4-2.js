const inputNum = 20021;// chín mươi tám vạn tám nghìn ba trăm bốn mươi lăm
const VIETNAMESE_READ_DICT = {
    units: {
        0: 'không',
        1: 'một',
        2: 'hai',
        3: 'ba',
        4: 'bốn',
        5: 'năm',
        6: 'sáu',
        7: 'bảy',
        8: 'tám',
        9: 'chín'
    },

    tens: {
        10: 'mười',
        20: 'hai mươi',
        30: 'ba mươi',
        40: 'bốn mươi',
        50: 'năm mươi',
        60: 'sáu mươi',
        70: 'bảy mươi',
        80: 'tám mươi',
        90: 'chín mươi',
        100: 'một trăm'
    },

    special: {
        1: 'mốt',
        5: 'lăm',
    },

    hundred: 'trăm',
    thoundsands: 'nghìn',
    tenThoundsands: 'vạn'
};

function readNum(inputNum) {
    if (inputNum === 0) {
        console.log(VIETNAMESE_READ_DICT.units[inputNum]);
        return;
    }

    let result = '';
    if (inputNum >= 1000) {
        let temp = (inputNum - inputNum % 1000) / 1000;
        inputNum %= 1000;

        // >= 10 vạn
        if (temp >= 100) {
            // handle 10->99 in 100->999
            let ten = (temp - temp % 10) / 10;
            temp %= 10;
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.tens[ten - ten % 10]); // get tens
            let unit = ten % 10;

            if (result != VIETNAMESE_READ_DICT.tens[10] && VIETNAMESE_READ_DICT.special[unit]) {
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.special[unit]);
            }
            else if (VIETNAMESE_READ_DICT.units[unit])
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[unit]);
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.tenThoundsands);
        }

        if (temp >= 10) {
            // handle ten
            let ten = temp - temp % 10;
            temp %= 10;
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.tens[ten - ten % 10]); // get tens
            let unit = temp;
            temp = 0;

            if (result != VIETNAMESE_READ_DICT.tens[10] && VIETNAMESE_READ_DICT.special[unit]) {
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.special[unit]);
            }
            else if (unit > 0 && VIETNAMESE_READ_DICT.units[unit])
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[unit]);
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.thoundsands);
        }

        if (temp > 0) {
            // handle units
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[temp]);
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.thoundsands);
        }
    }

    if (inputNum > 0) {
        let temp;
        if (inputNum >= 100) {
            temp = (inputNum - inputNum % 100) / 100;
            inputNum = inputNum % 100;
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[temp]);
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.hundred);
        }
        else if (result !== '') {
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[0]);
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.hundred);
        }

        if (inputNum >= 10) {
            // handle ten
            let ten = inputNum - inputNum % 10;
            inputNum %= 10;
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.tens[ten - ten % 10]); // get tens
            let unit = inputNum;
            inputNum = 0;

            if (result != VIETNAMESE_READ_DICT.tens[10] && VIETNAMESE_READ_DICT.special[unit]) {
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.special[unit]);
            }
            else if (unit > 0 && VIETNAMESE_READ_DICT.units[unit])
                result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[unit]);
        }
        else if (result !== '' && inputNum > 0)
            result = addTxtToResult(result, 'linh');

        if (inputNum > 0)
            result = addTxtToResult(result, VIETNAMESE_READ_DICT.units[inputNum]);
    }

    console.log(result);
}

function addTxtToResult(result, txt) {
    if (result !== '' && result[result.length - 1] !== ' ') {
        result += ' ';
    }
    return result += txt;
}

readNum(inputNum);