const inputNum = 99000;

function formatMoney(money) {
    let moneyStr = money.toString();
    let currentIndex = moneyStr.length - 3;
    while (currentIndex > 0) {
        moneyStr = moneyStr.slice(0, currentIndex) + "," + moneyStr.slice(currentIndex, moneyStr.length);
        currentIndex -= 3;
    }
    console.log(moneyStr);
}

formatMoney(inputNum);