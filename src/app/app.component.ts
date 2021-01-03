import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private router: Router,
              private menu: MenuController) {  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString('#1F1F1F');
    //   this.splashScreen.hide();
    // });
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.toggle('sideMenu');
  }
  closeMenu() {
    this.menu.close('sideMenu');
  }

  redirect(page: string){
      this.router.navigate(['/' + page + '']);
      this.closeMenu();
  }
}
