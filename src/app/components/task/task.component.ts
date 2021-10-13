import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/models/task.model';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public currentTask: TaskModel;

  constructor(private backend: BackendService, private route: ActivatedRoute) {
    this.currentTask = {} as TaskModel;
    const id = this.route.snapshot.params.id;

    this.backend.getTask(id).subscribe( res => {
      this.currentTask = res;
    })
  }

  ngOnInit(): void {
  }

}
