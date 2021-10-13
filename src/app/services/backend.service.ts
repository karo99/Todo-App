import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TasksListComponent } from '../components/tasks-list/tasks-list.component';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  public getTask(): Observable<TaskModel> {

    const task = {
      id: 2,
      title: "tytul",
      description: "to jest fajny task",
      status: "To Do"
    };

    return of(task);
  }

  public getTasksList(): Observable<TaskModel[]> {
    const tasksList = [{
      id: 2,
      title: "tytul",
      description: "to jest fajny task",
      status: "To Do"
    },
    {
      id: 3,
      title: "tytul drugi",
      description: "to jest fajny task drugi",
      status: "To Do"
    }];

    return of(tasksList);
  }
}
