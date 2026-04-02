const inputNum = 671001;// chín mươi tám vạn tám nghìn ba trăm bốn mươi lăm
const VIETNAMESE_READ_DICT = {
    units: {
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
    moreThoundsands: 'vạn'
};

function readNum(inputNum) {
    let result = '';
    if (inputNum >= 1000) {
        let temp = (inputNum - inputNum % 1000) / 1000;
        inputNum %= 1000;

        // >= 10 vạn
        if (temp >= 100) {
            let ten = (temp - temp % 10) / 10;
            temp %= 10;
            result += VIETNAMESE_READ_DICT.tens[ten - ten % 10]; // get tens
            let unit = ten % 10;

            if (result != VIETNAMESE_READ_DICT.tens[10] && VIETNAMESE_READ_DICT.special[unit]) {
                result += ' ' + VIETNAMESE_READ_DICT.special[unit];
            }
            else if (VIETNAMESE_READ_DICT.units[unit])
                result += ' ' + VIETNAMESE_READ_DICT.units[unit];
            result += ' ' + VIETNAMESE_READ_DICT.moreThoundsands;

            if (temp > 0) {
                result += ' ' + VIETNAMESE_READ_DICT.units[temp] + ' ' + VIETNAMESE_READ_DICT.thoundsands + ' ';
            }
        }
    }

    if (inputNum > 0) {
        let temp;
        if (inputNum >= 100) {
            temp = (inputNum - inputNum % 100) / 100;
            inputNum = inputNum % 100;
            result += VIETNAMESE_READ_DICT.units[temp] + ' ' + VIETNAMESE_READ_DICT.hundred;
        }

        if (inputNum >= 10) {
            temp = Math.round(inputNum - inputNum % 10);
            inputNum = inputNum % 10;
            result += ' ' + VIETNAMESE_READ_DICT.tens[temp];
        }
        // Fix following when input is an unit
        else if (result !== '' && inputNum > 0)
            result += ' ' + 'linh';

        result += ' ' + VIETNAMESE_READ_DICT.units[inputNum];
    }

    console.log(result);
}

function addToResult(params) {

}

readNum(inputNum);