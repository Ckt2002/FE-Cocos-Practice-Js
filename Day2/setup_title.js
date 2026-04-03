export default function SetTitle(title, ...arrContents) {
    console.log(`\n==========${title}==========\n`);
    arrContents.forEach(element => {
        console.log(element + '\n');
    });
}