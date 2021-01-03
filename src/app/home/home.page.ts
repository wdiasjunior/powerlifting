import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  implements OnInit {

  user: any;
  activeProgram: any;

  constructor(private router: Router,
              private menu: MenuController,) {
  }

  ngOnInit() {
    this.menu.enable(true, 'sideMenu');
  }

  ionViewDidEnter() {

    this.user = 'Will';
    this.activeProgram = 'PH3';
  }

  redirect(page: string){
      this.router.navigate(['/' + page + '']);
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.toggle('sideMenu');
  }
}
