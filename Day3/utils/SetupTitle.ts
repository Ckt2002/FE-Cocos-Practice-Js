export default function SetupTitle(title: string, arrContents: string[] | null): void {
    console.log(`\n========== ${title} ==========\n`);
    if (arrContents !== null) {
        for (let str of arrContents) {
            if (str !== null)
                console.log(str);
        }
        console.log();
    }
}