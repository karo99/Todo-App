import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskStatus } from 'src/app/models/task-status.enum';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {
  public newTaskForm: FormGroup;
  @ViewChild('title') title: ElementRef<HTMLInputElement> | undefined;
  public subscriptions: Subscription[];

  constructor(private backend: BackendService, private router: Router) {
    this.newTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
    this.subscriptions = [];
  }

  ngOnInit(): void {
    const titleValueSub = this.newTaskForm.get('title')?.valueChanges.subscribe(() => {
      this.title?.nativeElement.classList.remove('error');
    });

    this.subscriptions.push(titleValueSub as Subscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public saveNewTask(): void {
    if (this.newTaskForm.valid) {
      const task = {
        id: this.backend.dataArray.length,
        title: this.newTaskForm.value.title,
        description: this.newTaskForm.value.description,
        status: TaskStatus.toDo
      }
      this.backend.addTask(task).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.title?.nativeElement.classList.add('error');
    }
  }
}
