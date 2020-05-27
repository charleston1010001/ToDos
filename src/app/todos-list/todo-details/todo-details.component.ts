import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from "@angular/router";
import {exhaustMap} from "rxjs/operators";
import {EMPTY} from "rxjs";

import {CustomErrorStateMatcher} from "../../authentication/authentication-form/authentication-form.component";
import {AppState} from "../../app.module";
import * as TodosListActions from '../store/todos-list.actions';
import {TodoModel} from "../../models/todo.model";
import {getSingleTodo} from "../store/todos-list.selectors";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  todo: TodoModel = null;
  isFormSubmitted = false;
  matcher = new CustomErrorStateMatcher();
  todoForm = this.fb.group({
    headline: ['', [Validators.required]],
    text: ['', [Validators.required]],
    dueDate: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      exhaustMap(params => {
        if (!params['id']) {
          return EMPTY;
        }
        return this.store.pipe(getSingleTodo(params['id']));
      })
    ).subscribe((todo: TodoModel) => {
      if (todo) {
        this.todo = todo;
        const {headline, text, dueDate} = todo;
        this.todoForm.setValue({
          headline,
          text,
          dueDate
        });
      }
    });
  }

  get headline() {
    return this.todoForm.get('headline');
  }

  get dueDate() {
    return this.todoForm.get('dueDate');
  }

  get text() {
    return this.todoForm.get('text');
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.todoForm.valid) {
      const action = this.todo ? TodosListActions.updateTodo : TodosListActions.addTodo;
      this.store.dispatch(action({
        todo: new TodoModel(
          this.todo ? this.todo.id : uuidv4(),
          this.todoForm.value.headline,
          this.todoForm.value.text,
          this.todoForm.value.dueDate,
          this.todo ? this.todo.isDone : false
        )
      }))
      this.onClear();
    }
  }

  onClear() {
    this.isFormSubmitted = false;
    this.todoForm.reset();
  }

  onCancel() {
    this.router.navigate(['/list']);
  }
}
