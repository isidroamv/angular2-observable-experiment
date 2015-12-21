import {Injectable} from 'angular2/core';
import {Inject} from 'angular2/core'
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Todo} from './interfaces';

@Injectable()
export class TodoService {
	url: string = 'http://localhost:8080';
	_http: Http;
	todos$: Observable<Array<Todo>>;
	private _todosObserver: any;
	private _dataStore: {
		todos: Array<Todo>
	};
	
	constructor(_http: Http) {
		this._http = _http;
		this.todos$ = new Observable(observer => this._todosObserver = observer).share();
		this._dataStore = { todos: [] };
	}
	
	loadTodos() {
		console.log(this._http.get(this.url+'/api/todos'));
		this._http.get(this.url+'/api/todos').map(response => response.json()).subscribe(data => {
			this._dataStore.todos = data;
			this._todosObserver.next(this._dataStore.todos);
		}, error => console.log('Could not load todos'));
	}
}