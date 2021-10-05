import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasksList: string[];
  @Input() name: string;
  @Input() isButtonShown: boolean;

  constructor(private router: Router) {
    this.tasksList = []
    this.name = '';
    this.isButtonShown = false;
  }

  ngOnInit(): void {
  }

  public addTask(): void {
    this.router.navigate(['/add']);
  }

  public manageTask(): void {
    this.router.navigate(['/task']);
  }
}
