export default function SetTitle(title, ...arrContents) {
    console.log(`\n========== ${title} ==========\n`);
    if (arrContents[0] !== null) {
        for (let val of arrContents[0]) {
            if (val !== null)
                console.log(val);
        }
        console.log();
    }
}