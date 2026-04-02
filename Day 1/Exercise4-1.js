const num = 715;
const ROMAN_NUMERAL_DICT = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
];

function convertRoman(num) {
    let result = '';
    while (num > 0) {
        for ({ value, symbol } of ROMAN_NUMERAL_DICT) {
            if (num >= value) {
                result += symbol;
                num -= value;
                break;
            }
        }
    }
    console.log(result);
}

convertRoman(num);