import rl from "./InputManager";

export default function question(prompt: string): Promise<string> {
    return new Promise((resolve) => rl.question(prompt, resolve));
}