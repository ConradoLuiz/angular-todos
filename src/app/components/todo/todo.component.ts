import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };
    return classes;
  }

  onToggle() {
    // Toggle in Ui
    this.todo.completed = !this.todo.completed;
    // Toggle on Server
    this.todoService
      .toggleComplete(this.todo)
      .subscribe((todo) => console.log(todo));
  }
  onDelete(e) {
    e.stopPropagation();
    this.deleteTodo.emit(this.todo);
  }
}
