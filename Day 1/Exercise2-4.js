const arr1 = [10, 3, 5, 6];
const arr2 = [10, 3, 4, 100, 80];

function checkLostElements(arr1, arr2) {
    let result = [];
    if (!arr2) {
        return;
    }
    if (!arr1) {
        console.log(arr2);
        return;
    }

    for (let e of arr2) {
        if (!arr1.includes(e)) {
            result.push(e);
        }
    }
    console.log(result);
}

checkLostElements(arr1, arr2);