import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {TodoModel} from "../../../models/todo.model";
import {MatCheckboxChange, MatCheckboxClickAction} from "@angular/material/checkbox";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  get dueDate() {
    return new Date(this.todo.dueDate).toLocaleString();
  }

  navigateToDetails() {
    this.router.navigate([this.todo.id], {relativeTo: this.route})
  }

  handleCheckboxClick(evt: MouseEvent) {
    evt.stopPropagation();
  }

  handleCheckboxChange(evt: MatCheckboxChange) {
    console.log(evt.checked);
  }
}
