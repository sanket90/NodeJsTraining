import { BusinessError } from "../errors/business-errors.js";

export class Notes {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    isValid() {
        // if (!this.title) {
        //     return false;
        // }

        // if (!this.content) {
        //     return false;
        // }

        // return true;

        if (!this.title || !this.content) {
            throw new BusinessError("Validation Failure: both title and content are required.!")
        }
    }
}