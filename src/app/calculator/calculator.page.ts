import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})

export class CalculatorPage implements OnInit {

  //#region  //variable declaration
  weightLifted: any;
  repsPerformed: any;

  weightInput: string;
  repInput: string;

  weightCheck: boolean;
  repCheck: boolean;

  weightInputClosed: boolean;
  repInputClosed: boolean;

  e1rm: any;
  e2rm: any;
  e3rm: any;
  e4rm: any;
  e5rm: any;
  e6rm: any;
  e7rm: any;
  e8rm: any;
  e9rm: any;
  e10rm: any;
  e11rm: any;
  e12rm: any;
  e15rm: any;

  ormPercent105: any;
  ormPercent1025: any;
  ormPercent95: any;
  ormPercent90: any;
  ormPercent85: any;
  ormPercent80: any;
  ormPercent75: any;
  ormPercent70: any;
  ormPercent65: any;
  ormPercent60: any;
  ormPercent55: any;
  ormPercent50: any;
  ormPercent45: any;
  ormPercent40: any;

  weightUnit: String;
  //#endregion


  constructor(private router: Router,
              // private statusBar:StatusBar,
              private menu: MenuController,) {

  }

  ngOnInit() {
    this.menu.enable(true, 'sideMenu');
    this.loadData();
    this.oneRMCalc();
  }

  ionViewDidEnter() {
    // this.weightLifted = 100;
    // this.repsPerformed = 11;

    this.weightUnit = "kg";
    // this.weightUnit = "lbs";

    this.weightInputClosed = true;
    this.repInputClosed = true;
    this.weightCheck = false;
    this.repCheck = false;
  }

  loadData() {
    // this.weightLifted = 100;
    this.weightLifted = JSON.parse(localStorage.getItem('weightLifted'));
    this.repsPerformed = JSON.parse(localStorage.getItem('repsPerformed'));

    this.oneRMCalc();
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.open('sideMenu');
  }

  redirect(page: string) {
      this.router.navigate(['/' + page + '']);
  }

  concatenate(num: string) {
    if(!this.weightInputClosed){
      if(this.weightInput == '0'){
        this.weightInput = num;
        this.weightCheck = true;
      } else if(parseInt(this.weightInput) > 0){
        this.weightInput += num;
        this.weightCheck = true;
      }
      if(parseInt(this.weightInput) > 2000) {
        this.weightCheck = false;
      }
    }
    else if(!this.repInputClosed) {
      if(this.repInput == '0'){
        this.repInput = num;
        this.repCheck = true;
      } else if(parseInt(this.repInput) > 0){
        this.repInput += num;
        this.repCheck = true;
      }
      if(parseInt(this.repInput) > 20) {
        this.repCheck = false;
      }
    }
  }

  deleteLastCharacter() {
    if(!this.weightInputClosed){
        this.weightInput = this.weightInput.slice(0, -1);
        if(this.weightInput.length == 0) {
          this.weightInput = '0';
          this.weightCheck = false;
        } else if(parseInt(this.weightInput) > 0 || parseInt(this.weightInput) <= 2000) {
          this.weightCheck = true;
        }
    }
    else if(!this.repInputClosed) {
        this.repInput = this.repInput.slice(0, -1);
        if(this.repInput.length == 0) {
          this.repInput = '0';
          this.repCheck = false;
        } else if(parseInt(this.repInput) > 0 || parseInt(this.repInput) <= 20) {
          this.repCheck = true;
        }
    }
  }

  closeWeightInput(flag: string) {
    if(flag === 'ok'){
      this.weightInputClosed = true;
      this.menu.enable(true, 'sideMenu');
      this.weightLifted = parseFloat(this.weightInput);
      localStorage.setItem('weightLifted', this.weightLifted);
      this.oneRMCalc();
    } else {
      this.weightInputClosed = true;
      this.menu.enable(true, 'sideMenu');
      this.weightInput = '0';
    }
  }

  openWeightInput() {
    this.weightInputClosed = false;
    this.menu.enable(false, 'sideMenu');
    this.weightInput = '0';
    this.weightCheck = false;
  }

  closeRepsInput(flag: string) {
    if(flag === 'ok'){
      this.repInputClosed = true;
      this.menu.enable(true, 'sideMenu');
      this.repsPerformed = parseFloat(this.repInput);
      localStorage.setItem('repsPerformed', this.repsPerformed);
      this.oneRMCalc();
    } else {
      this.repInputClosed = true;
      this.menu.enable(true, 'sideMenu');
      this.repInput = '0';
    }
  }

  openRepsInput() {
    this.repInputClosed = false;
    this.menu.enable(false, 'sideMenu');
    this.repInput = '0';
    this.repCheck = false;
  }

  incrementWeight() {
    if((this.weightLifted + 5) > 2000) {
      this.weightLifted = 2000;
    } else {
      this.weightLifted += 5;
      localStorage.setItem('weightLifted', this.weightLifted);
    }
  }

  decrementWeight() {
    if((this.weightLifted - 5) < 0) {
      this.weightLifted = 0;
    } else {
      this.weightLifted -= 5;
      localStorage.setItem('weightLifted', this.weightLifted);
    }
  }

  incrementReps() {
    this.repsPerformed += 1;
    localStorage.setItem('repsPerformed', this.repsPerformed);
  }

  decrementReps() {
    this.repsPerformed -= 1;
    localStorage.setItem('repsPerformed', this.repsPerformed);
  }

  //in the future implement a way to select which formulas should be used
  oneRMCalc() {
    if(this.repsPerformed == 1) {
      this.e1rm = this.weightLifted;
      localStorage.setItem('e1rm', this.e1rm);
    } else {
      this.e1rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 1) + this.brzycki(this.weightLifted, this.repsPerformed, 1) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 1) + this.lombardi(this.weightLifted, this.repsPerformed, 1) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 1) + this.oconner(this.weightLifted, this.repsPerformed, 1) +
                      this.wathen(this.weightLifted, this.repsPerformed, 1)) / 7);
      localStorage.setItem('e1rm', this.e1rm);
    }

    this.e2rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 2) + this.brzycki(this.weightLifted, this.repsPerformed, 2) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 2) + this.lombardi(this.weightLifted, this.repsPerformed, 2) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 2) + this.oconner(this.weightLifted, this.repsPerformed, 2) +
                      this.wathen(this.weightLifted, this.repsPerformed, 2)) / 7);

    this.e3rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 3) + this.brzycki(this.weightLifted, this.repsPerformed, 3) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 3) + this.lombardi(this.weightLifted, this.repsPerformed, 3) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 3) + this.oconner(this.weightLifted, this.repsPerformed, 3) +
                      this.wathen(this.weightLifted, this.repsPerformed, 3)) / 7);

    this.e4rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 4) + this.brzycki(this.weightLifted, this.repsPerformed, 4) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 4) + this.lombardi(this.weightLifted, this.repsPerformed, 4) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 4) + this.oconner(this.weightLifted, this.repsPerformed, 4) +
                      this.wathen(this.weightLifted, this.repsPerformed, 4)) / 7);

    this.e5rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 5) + this.brzycki(this.weightLifted, this.repsPerformed, 5) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 5) + this.lombardi(this.weightLifted, this.repsPerformed, 5) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 5) + this.oconner(this.weightLifted, this.repsPerformed, 5) +
                      this.wathen(this.weightLifted, this.repsPerformed, 5)) / 7);

    this.e6rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 6) + this.brzycki(this.weightLifted, this.repsPerformed, 6) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 6) + this.lombardi(this.weightLifted, this.repsPerformed, 6) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 6) + this.oconner(this.weightLifted, this.repsPerformed, 6) +
                      this.wathen(this.weightLifted, this.repsPerformed, 6)) / 7);

    this.e7rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 7) + this.brzycki(this.weightLifted, this.repsPerformed, 7) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 7) + this.lombardi(this.weightLifted, this.repsPerformed, 7) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 7) + this.oconner(this.weightLifted, this.repsPerformed, 7) +
                      this.wathen(this.weightLifted, this.repsPerformed, 7)) / 7);

    this.e8rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 8) + this.brzycki(this.weightLifted, this.repsPerformed, 8) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 8) + this.lombardi(this.weightLifted, this.repsPerformed, 8) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 8) + this.oconner(this.weightLifted, this.repsPerformed, 8) +
                      this.wathen(this.weightLifted, this.repsPerformed, 8)) / 7);

    this.e9rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 9) + this.brzycki(this.weightLifted, this.repsPerformed, 9) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 9) + this.lombardi(this.weightLifted, this.repsPerformed, 9) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 9) + this.oconner(this.weightLifted, this.repsPerformed, 9) +
                      this.wathen(this.weightLifted, this.repsPerformed, 9)) / 7);

    this.e10rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 10) + this.brzycki(this.weightLifted, this.repsPerformed, 10) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 10) + this.lombardi(this.weightLifted, this.repsPerformed, 10) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 10) + this.oconner(this.weightLifted, this.repsPerformed, 10) +
                      this.wathen(this.weightLifted, this.repsPerformed, 10)) / 7);

    this.e11rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 11) + this.brzycki(this.weightLifted, this.repsPerformed, 11) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 11) + this.lombardi(this.weightLifted, this.repsPerformed, 11) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 11) + this.oconner(this.weightLifted, this.repsPerformed, 11) +
                      this.wathen(this.weightLifted, this.repsPerformed, 11)) / 7);

    this.e12rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 12) + this.brzycki(this.weightLifted, this.repsPerformed, 12) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 12) + this.lombardi(this.weightLifted, this.repsPerformed, 12) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 12) + this.oconner(this.weightLifted, this.repsPerformed, 12) +
                      this.wathen(this.weightLifted, this.repsPerformed, 12)) / 7);

    this.e15rm = Math.floor((this.epley(this.weightLifted, this.repsPerformed, 15) + this.brzycki(this.weightLifted, this.repsPerformed, 15) +
                  this.mcglothin(this.weightLifted, this.repsPerformed, 15) + this.lombardi(this.weightLifted, this.repsPerformed, 15) +
                    this.mayhew(this.weightLifted, this.repsPerformed, 15) + this.oconner(this.weightLifted, this.repsPerformed, 15) +
                      this.wathen(this.weightLifted, this.repsPerformed, 15)) / 7);

    this.oneRMPercent();
  }

  oneRMPercent() {
    this.ormPercent105 = Math.floor(this.e1rm * 1.05);
    this.ormPercent1025 = Math.floor(this.e1rm * 1.025);
    this.ormPercent95 = Math.floor(this.e1rm * 0.95);
    this.ormPercent90 = Math.floor(this.e1rm * 0.90) ;
    this.ormPercent85 = Math.floor(this.e1rm * 0.85) ;
    this.ormPercent80 = Math.floor(this.e1rm * 0.80) ;
    this.ormPercent75 = Math.floor(this.e1rm * 0.75) ;
    this.ormPercent70 = Math.floor(this.e1rm * 0.70) ;
    this.ormPercent65 = Math.floor(this.e1rm * 0.65) ;
    this.ormPercent60 = Math.floor(this.e1rm * 0.60) ;
    this.ormPercent55 = Math.floor(this.e1rm * 0.55) ;
    this.ormPercent50 = Math.floor(this.e1rm * 0.50) ;
    this.ormPercent45 = Math.floor(this.e1rm * 0.45) ;
    this.ormPercent40 = Math.floor(this.e1rm * 0.40) ;
  }

  //#region //1rm formulas
  epley(weight, reps, xRM) {
    var oneRM = weight * (1 + reps / 30);
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor(oneRM / (1 + xRM / 30));
    }
  }

  brzycki(weight, reps, xRM) {
    var oneRM = weight * 36 / (37 - reps);
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor((oneRM * (37 - xRM)) / 36);
    }
  }

  mcglothin(weight, reps, xRM) {
    var oneRM = 100 * weight / (101.3 - (2.67123 * reps));
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor((oneRM * (101.3 - 2.67123 * xRM)) / 100);
    }
  }

  lombardi(weight, reps, xRM) {
    var oneRM = weight * Math.pow(reps, 0.10);
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor(oneRM / (Math.pow(xRM, 0.10)));
    }
  }

  mayhew(weight, reps, xRM) {
    var oneRM = (weight * 100) / (52.2 + (41.9 * Math.exp(-1 * (reps * 0.055))));
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor((oneRM * (52.2 + (41.9 * Math.exp(-1 * (xRM * 0.055))))) / 100);
    }
  }

  oconner(weight, reps, xRM) {
  	var oneRM = weight * (1 + (reps / 40));
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor(oneRM / (1 + xRM / 40));
    }
  }

  wathen(weight, reps, xRM) {
  	var oneRM = (weight * 100) / (48.8 + (53.8 * Math.exp(-1 * (reps * 0.075))));
    if(xRM == 1) {
      return Math.floor(oneRM);
    } else {
      return Math.floor((oneRM * (48.8 + (53.8 * Math.exp(-1 * (xRM * 0.075))))) / 100);
    }
  }
 //#endregion
}
