import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {TodoModel} from "../../../models/todo.model";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;
  @Output() todoClick = new EventEmitter<{todo: TodoModel}>()
  @Output() onTodoCheckboxChange = new EventEmitter<{todo: TodoModel; isChecked: boolean}>()

  constructor() { }

  ngOnInit(): void {
  }

  get dueDate() {
    return new Date(this.todo.dueDate).toLocaleString();
  }

  onClick() {
    this.todoClick && this.todoClick.emit({todo: this.todo});
  }

  handleCheckboxClick(evt: MouseEvent) {
    evt.stopPropagation();
  }

  handleCheckboxChange(evt: MatCheckboxChange) {
    this.onTodoCheckboxChange.emit({todo: this.todo, isChecked: evt.checked});
  }
}
