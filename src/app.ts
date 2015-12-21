import {Component, View, provide} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Http, ConnectionBackend, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {TodoService} from './todo_service';
import {Todo} from './interfaces';
 
@Component({
	selector: 'app',
	template: `
		Todo list - {{name}}
		<ul>
			<li *ngFor="#todo of todos">
				<h3>{{todo.text}}</h3>
			</li>
		</ul>`,
	viewProviders: [TodoService, HTTP_PROVIDERS],
	directives: [NgFor]
})
export class App {
	todos: Todo[];
	name: string = 'School';
	constructor(public service: TodoService) {
		this.service.todos$.subscribe(updatedTodos => {
			this.todos = updatedTodos;
		});
		this.service.loadTodos();
	}
}
