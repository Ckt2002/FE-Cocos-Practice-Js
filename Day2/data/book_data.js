export default class Book {
    constructor(title) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.title = title;
    }

    getName() {
        return this.title;
    }

    applyData({ id, title }) {
        this.id = id;
        this.title = title;
    }
}