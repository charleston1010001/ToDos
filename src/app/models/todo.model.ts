export class TodoModel {
  constructor(public id: string, public headline: string, public text: string, public dueDate: number, public isDone: boolean) {
  }
}
