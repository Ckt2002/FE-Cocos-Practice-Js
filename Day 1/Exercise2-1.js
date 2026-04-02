const n = 30;
const k = 4;

function calculateCom(n, k) {
    console.log(Math.round(factorialOperator(n) / (factorialOperator(k) * factorialOperator(n - k))));
}

function factorialOperator(num) {
    if (num === 0 || num === 1) {
        return 1;
    }

    let result = 1;
    let index = 0;
    while (index < num) {
        index++;
        result *= index;
    }

    return result
}

calculateCom(n, k)