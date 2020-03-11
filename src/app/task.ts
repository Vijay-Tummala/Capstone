// Tisk class to define this object's properties.
export class Task {
    constructor(
        public TaskID: number,
        public Description: string,
        public Category: string,
        public StopID: number,
        public QuestionType: string,
        public Question: string
    ){}
}