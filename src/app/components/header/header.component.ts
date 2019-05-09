import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public sidebarIsOpen: boolean;

  constructor() { }

  public toggleSidebar() {
    const element = document.getElementById('layout-sidebar');
    const elementMobile = document.getElementById('sidebar-mobile');
    const clazz = 'collapsed';
  
    element.classList.toggle('collapsed');
    elementMobile.classList.toggle('collapsed');
    this.sidebarIsOpen = element.classList.contains(clazz);
    this.sidebarIsOpen = element.classList.contains(clazz);
  }

  ngOnInit() {
    this.sidebarIsOpen = true;
  }

  ngOnDestroy() { }

}
