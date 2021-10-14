import { Component, OnInit } from '@angular/core';
import { TaskStatus } from 'src/app/models/task-status.enum';
import { TaskModel } from 'src/app/models/task.model';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public toDo: TaskModel[];
  public inProgress: TaskModel[];
  public done: TaskModel[];

  constructor(private backend: BackendService) {
    this.toDo = [];
    this.inProgress = [];
    this.done = [];
  }

  ngOnInit(): void {
    this.backend.getTasksList().subscribe((resTaskArray: TaskModel[]) => {
      for (let item of resTaskArray) {
        switch (item.status) {
          case TaskStatus.toDo:
            this.toDo.push(item);
            break;
          case TaskStatus.inProgress:
            this.inProgress.push(item);
            break;
          case TaskStatus.done:
            this.done.push(item);
            break;
        }
      }
    })
  }
}
