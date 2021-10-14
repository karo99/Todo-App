import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('description') description: ElementRef<HTMLInputElement> | undefined;
  public subscriptions: Subscription[];
  public editMode: boolean;
  public id: number;
  public status: string;

  constructor(private backend: BackendService, private router: Router, private route: ActivatedRoute) {
    this.newTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.subscriptions = [];
    this.editMode = false;
    this.id = this.route.snapshot.params.id;
    this.status = TaskStatus.toDo;
  }

  ngOnInit(): void {
    const titleValueSub = this.newTaskForm.get('title')?.valueChanges.subscribe(() => {
      this.title?.nativeElement.classList.remove('error');
    });

    const descValueSub = this.newTaskForm.get('description')?.valueChanges.subscribe(() => {
      this.description?.nativeElement.classList.remove('error');
    });

    this.subscriptions.push(titleValueSub as Subscription);
    this.subscriptions.push(descValueSub as Subscription);

    if (this.id) {
      this.fillForm();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public saveNewTask(): void {
    if (this.newTaskForm.valid) {
      
      if (this.editMode) {
        const task = {
          id: this.id,
          title: this.newTaskForm.value.title,
          description: this.newTaskForm.value.description,
          status: this.status
        }
        this.backend.updateTask(this.id, task).subscribe(() => {
          this.router.navigate(['/dashboard']);
        })
      } else {
        const task = {
          id: this.backend.dataArray.length,
          title: this.newTaskForm.value.title,
          description: this.newTaskForm.value.description,
          status: TaskStatus.toDo
        }
        this.backend.addTask(task).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    } else {
      this.title?.nativeElement.classList.add('error');
      this.description?.nativeElement.classList.add('error');
    }
  }

  public goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  public fillForm(): void {
    this.editMode = true;
    this.backend.getTask(this.id).subscribe(res => {
      console.log(res);
      this.newTaskForm.get('title')?.setValue(res.title);
      this.newTaskForm.get('description')?.setValue(res.description);
      this.status = res.status;
    })
  }

}
