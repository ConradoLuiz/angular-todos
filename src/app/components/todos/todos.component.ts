import { Component, OnInit, ɵisBoundToModule__POST_R3__ } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/Todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  todosSubscription: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService
      .getTodos()
      .subscribe((todos: Todo[]) => (this.todos = todos));
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
  }

  deleteTodo(todo: Todo) {
    // Delete from UI
    this.todos = this.todos.filter((t) => t.id !== todo.id);

    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: any) {
    this.todoService.addTodo(todo).subscribe((t: Todo) => this.todos.push(t));
  }
}
