import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task.model';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public currentTask: TaskModel;

  constructor(private backend: BackendService, private route: ActivatedRoute,
    private router: Router) {
    this.currentTask = {} as TaskModel;
    this.refreshData();
  }

  ngOnInit(): void {
  }

  public deleteTask(): void {
    this.backend.deleteTask(this.currentTask.id).subscribe( () => {
      this.goBack();
    });
  }

  public goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  public changeStatus(newStatus: string): void {
    const newTask = this.currentTask;
    newTask.status = newStatus;

    this.backend.updateTask(this.currentTask.id, newTask).subscribe(() => {
      this.refreshData();
    })
  }

  public refreshData(): void {
    const id = this.route.snapshot.params.id;
    this.backend.getTask(id).subscribe( res => {
      this.currentTask = res;
    })
  }

  public editTask(): void {
    this.router.navigate([`/edit/${this.currentTask.id}`]);
  }

}
