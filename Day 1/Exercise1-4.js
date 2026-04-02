const inputFileName = "a.mp3";

function getExtension(file) {
    let ex = '';
    for (let index = file.length - 1; index >= 0; index--) {
        if (file[index] === ".")
            break;
        ex = file[index] + ex;
    }
    console.log(ex);
}

getExtension(inputFileName);