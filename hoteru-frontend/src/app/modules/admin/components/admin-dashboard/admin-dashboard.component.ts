import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReportService} from "../../../../services/report/report.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Earning, EarningReport} from "../../../../core/models/Earning";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  tasksReport: any[] = [];
  bestRoomTypes: any[] = [];
  earningDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('earningPaginator') earningPaginator!: MatPaginator;
  @ViewChild('earningSort') earningSort!: MatSort;

  earningsForm: FormGroup;
  earningColumns: string[] = ['date', 'total'];
  data!: EarningReport;

  constructor(private reportService: ReportService, private builder: FormBuilder) {
    this.earningsForm = this.builder.group({
      init: [new Date(), Validators.required],
      end: [new Date(), Validators.required]
    })
  }

  ngOnInit(): void {
    this.getTodayTasksReport();
    this.getBestRoomTypes();
    this.getEarnings();
  }


  ngAfterViewInit(): void {
    this.earningDataSource.paginator = this.earningPaginator;
    this.earningDataSource.sort = this.earningSort;
  }

  getTodayTasksReport() {
    this.reportService.findTodayTasks()
      .subscribe({
        next: response => {
          this.tasksReport = response;
        }
      })
  }

  getEarnings() {

    if(this.earningsForm.invalid) {
      return;
    }

    const { init, end } = this.earningsForm.value;
    this.reportService.earnings(init.toISOString(), end.toISOString())
      .subscribe({
        next: (response: EarningReport) => {
          console.log(response);
          this.earningDataSource.data = response.earnings;
          this.data = response;
        }
      })
  }

  getBestRoomTypes() {
    this.reportService.bestRoomTypes()
      .subscribe({
        next: response => {
          this.bestRoomTypes = response;
        }
      })
  }
}
