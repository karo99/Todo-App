import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public toDo = ['1','2'];
  public inProgress = ['3'];
  public done = ['4','5','6'];

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getTask().subscribe( (res) => {
      console.log(res);
    })
  }
}
