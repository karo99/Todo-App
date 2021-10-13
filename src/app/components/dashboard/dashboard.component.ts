import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public toDo: TaskModel[];
  public inProgress = [];
  public done = [];

  constructor(private backend: BackendService) {
    this.toDo = [];
  }

  ngOnInit(): void {
    this.backend.getTasksList().subscribe( (res) => {
      this.toDo = res;
    })
  }
}
