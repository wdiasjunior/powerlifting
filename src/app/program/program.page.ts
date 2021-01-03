import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides, PopoverController } from '@ionic/angular';
import { ApiProvider } from '../provider/api.service';


@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})

export class ProgramPage implements OnInit {

  activeProgramData: any;
  // days: any;

  activeProgramName: any;
  exercice: any;
  sets: any;
  reps: any;
  weight: any;
  percentage: any;
  amrap: any;
  rpe: any;
  description: any;

  isAMRAP: boolean;
  has1RM: boolean;
  hasRPE: boolean;
  hasRIR: boolean;

  private segmentList: Array<string> = [];
  private selectedSegment: string;
  private slideList: Array<string> = [];

  slideOptions = {
    slidesperView: 1,
    allowTouchMove: false,
  }

  @ViewChild('slide') slide: IonSlides;

  constructor(private router: Router,
              private menu: MenuController,
              private api: ApiProvider,) {
    //identation placeholder

  }

  ngOnInit() {
    this.menu.enable(true, 'sideMenu');
    this.activeProgramName = 'phat';
    // this.ionViewDidEnter();
    this.getAMRAP();
    this.loadProgram();
  }

  ionViewDidEnter() {

    // console.log(this.selectedSegment);

  }

  counter(i: number) {
    return new Array(i);
  }

  redirect(page: string){
      this.router.navigate(['/' + page + '']);
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.open('sideMenu');
  }

  setAMRAP() {
    localStorage.setItem('amrap', this.amrap);
    // this.getAMRAP();
  }

  getAMRAP() {
    this.amrap = JSON.parse(localStorage.getItem('amrap'));
  }

  segmentChanged(ev: any, index: any) {
    // console.log('Segment changed', ev, index);
  }

  _segmentSelected(item: string, index: number) {
    // console.log(item, index);
    this.slide.slideTo(index);

    document.getElementById("segmentId" + index).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  _ionSlideDidChange(event: any) {
    // console.log(event);
    this.slide.getActiveIndex().then(index => {
      // console.log(index)
      this.selectedSegment = this.segmentList[index];

      document.getElementById("segmentId" + index).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

    })

  }

  async loadProgram() {

    // this.days = [];
    this.activeProgramData = [];
    this.api.get(this.activeProgramName).subscribe(async res =>  {

      for(var i = 0; i < res.length; i++) {
        this.segmentList[i] = 'Day ' + (i + 1);
        this.slideList[i] = 'day' + (i + 1);
        // for(var j = 0; j < this.days[i][j].day.length; j++) {
        // for(let data of res) {
        //   this.activeProgramData.push(data);
        //   // this.activeProgramData[j].push({
        //   //   exercice: this.days[i][j].exercice,
        //   //   has1RM: this.days[i][j].has1RM,
        //   //   oneRM: this.days[i][j].oneRM,
        //   //   percentage: this.days[i][j].percentage,
        //   //   weight: this.days[i][j].weight,
        //   //   sets: this.days[i][j].sets,
        //   //   reps: this.days[i][j].reps,
        //   //   hasRPE: this.days[i][j].hasRPE,
        //   //   rpe: this.days[i][j].rpe,
        //   //   isAMRAP: this.days[i][j].isAMRAP,
        //   //   amrap: this.days[i][j].amrap,
        //   //   hasRIR: this.days[i][j].hasRIR,
        //   //   rir: this.days[i][j].rir,
        //   //   description: this.days[i][j].description,
        //   //   restDay: this.days[i][j].restDay,
        //   // })
        // }
      }
      for(let data of res) {
        this.activeProgramData.push(data);
      }
      this.selectedSegment = this.segmentList[0];
      // console.log(this.activeProgramData[0].day[0].exercice);
      // console.log(res.length);
    });
  }

}
