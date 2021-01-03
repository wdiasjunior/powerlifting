import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {

  constructor(private router: Router,
              private menu: MenuController,) {

  }

  ngOnInit() {
    this.menu.enable(false, 'sideMenu');
  }

  ionViewDidEnter() {
    // document.getElementById("bottomTabs").style.display = "none";
  }

  goBack() {
    this.router.navigate(['/home']);
    // document.getElementById("bottomTabs").style.display = "block";
  }
}
