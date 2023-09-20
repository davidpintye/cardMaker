import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;
  isMenu = false;
  authState!: boolean;

  constructor(
    private bpObserver: BreakpointObserver,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe(state => {
      this.authState = state;
    });
  }

  ngAfterViewInit(): void {
    this.bpObserver.observe(['(max-width: 768px)']).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
        this.isMenu = true;
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
        this.isMenu = false;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
