import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  constructor(private router: Router,
              private menu: MenuController) {

  }

  ngOnInit() {
    this.menu.enable(true, 'sideMenu');
  }

  ionViewDidEnter() {

  }

  redirect(page: string){
      this.router.navigate(['/' + page + '']);
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.open('sideMenu');
  }

}
