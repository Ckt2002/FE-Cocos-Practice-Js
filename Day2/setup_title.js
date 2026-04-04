export default function SetTitle(title, ...arrContents) {
    console.log(`\n========== ${title} ==========\n`);

    arrContents.forEach(element => {
        if (element !== null)
            console.log(element + '\n');
    });
}