import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public tasksList: string[];

  constructor() {
    this.tasksList = ['task 1', 'task 2', 'task 3', 'task 4']
   }

  ngOnInit(): void {
  }

}
