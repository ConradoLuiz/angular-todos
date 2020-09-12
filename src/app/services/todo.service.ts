import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  limit: number = 10;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl, {
      params: { _limit: this.limit.toString() },
    });
    // return [
    //   {
    //     id: 1,
    //     title: 'Todo 1',
    //     completed: false,
    //   },
    //   {
    //     id: 2,
    //     title: 'Todo two',
    //     completed: true,
    //   },
    //   {
    //     id: 3,
    //     title: 'Todo three',
    //     completed: false,
    //   },
    // ];
  }

  toggleComplete(todo: Todo): Observable<any> {
    return this.http.put(`${this.todosUrl}/${todo.id}`, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete(`${this.todosUrl}/${todo.id}`, httpOptions);
  }

  addTodo(todo: any): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
