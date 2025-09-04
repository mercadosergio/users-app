import { Component, inject, signal, ViewChild } from '@angular/core';
import { GithubUsersService } from '../../../../core/services/github-users.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { GithubUser, UserDetail } from '../../../../core/models/interfaces/github-user.interface';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, UserCardComponent, ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private githubUsersService = inject(GithubUsersService);
  searchTerm = signal('');
  usersDetail = signal<UserDetail[]>([]);

  users = signal<GithubUser[]>([]);

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  searchUsers(searchValue: string) {
    this.usersDetail.set([]);
    this.searchTerm.set(searchValue);
    this.githubUsersService.getUsersByParams({ username: this.searchTerm() }).subscribe({
      next: (resp) => {
        this.users.set(resp.items);
        this.users().forEach((user) => {
          this.githubUsersService.getUser(user.login).subscribe({
            next: (user) => {
              this.usersDetail.update((state) => [...state, user]);
              this.loadChartValues(this.usersDetail());
            },
          });
        });
      },
    });
  }

  loadChartValues(users: UserDetail[]) {
    this.chartOptions = {
      series: [
        {
          name: 'basic',
          data: users.map((user) => user.followers),
        },
      ],
      xaxis: {
        categories: users.map((user) => user.login),
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: 'Seguidores',
      },
    };
  }
}
