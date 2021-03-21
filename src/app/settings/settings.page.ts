import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  ngOnInit() {
    this.menu.enable(false, 'sideMenu');
  }

  constructor(private router: Router,
              private menu: MenuController,) {

  }

  ionViewDidEnter() {
    // document.getElementById("bottomTabs").style.display = "none";
  }

  goBack() {
    this.router.navigate(['/home']);
    // document.getElementById("bottomTabs").style.display = "block";
  }
}
