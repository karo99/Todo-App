import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TasksListComponent } from '../components/tasks-list/tasks-list.component';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public dataArray: TaskModel[];

  constructor() {
    this.dataArray = [{
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
  }

  public getTask(index: number): Observable<TaskModel> {

    const task = this.dataArray[index];

    return of(task);
  }

  public getTasksList(): Observable<TaskModel[]> {
    const tasksList = this.dataArray;

    return of(tasksList);
  }

  public addTask(task: TaskModel): Observable<TaskModel[]> {
    this.dataArray.push(task);

    return of(this.dataArray);
  }

  public updateTask(index: number, newTask: TaskModel): Observable<TaskModel[]> {
    this.dataArray[index] = newTask;

    return of(this.dataArray);

  }

  public deleteTask(index: number): Observable<TaskModel[]> {
    this.dataArray.splice(index, 1)

    return of(this.dataArray);
  }
}
