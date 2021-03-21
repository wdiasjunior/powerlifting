import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-program-mgmt',
  templateUrl: './program-mgmt.page.html',
  styleUrls: ['./program-mgmt.page.scss'],
})

export class ProgramMgmtPage implements OnInit {

  pageTitle: string;

  firstPage: boolean = true;
  weekListPage: boolean = false;
  dayListPage: boolean = false;
  oneRMPage: boolean = false;
  firstTimeOneRM: boolean = false;
  editRMlist: boolean = false;
  optionsPopoverClosed: boolean = true;

  programName: any;
  programOBJ: any = [];
  exerciseOBJ: any;
  exerciseList: any = [];
  weekOBJ: any;
  oneRMobj: any;
  weekList: any = [];
  oneRMList: any = [];
  weekIndexControl: any;
  oneRMIndexControl: any;
  oneRMpageReturnControl: any;
  id: any = 0;

  weightUnit: string;
  weightUnitChange: boolean;
  changeRPErir: boolean;

  // private cardWeekList: Array<string> = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];
  // private cardTrainingBlockList: Array<string> = ['block 1', 'block 2', 'block 3', 'block 4', 'block 5'];
  private segmentList: Array<string> = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  private selectedSegment: string;
  private slideList: Array<string> = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
      // for(var i = 0; i < res.length; i++) {
      //   this.segmentList[i] = 'Day ' + (i + 1);
      //   this.slideList[i] = 'day' + (i + 1);
      // }
  slideOptions = {
    slidesperView: 1,
    allowTouchMove: false,
  }

  @ViewChild('slide') slide: IonSlides;

  constructor(private router: Router,
              private menu: MenuController) {
    //

  }

  ngOnInit() {
    this.menu.enable(true, 'sideMenu');
    this.pageTitle = "Program Management";
  }

  ionViewDidEnter() {
    this.firstPage = true; // change this
    this.oneRMPage = false;
    this.weekListPage = false;
    this.dayListPage = false;
    this.optionsPopoverClosed = true;

    this.weightUnit = "kg";

    // document.getElementById('bottomTabs').style.display = 'none'
  }

  redirect(page: string){
      this.router.navigate(['/' + page + '']);
  }

  closeOptionsPopover() {
    this.optionsPopoverClosed = true;
    this.menu.enable(true, 'sideMenu');
  }

  openOptionsPopover() {
    this.optionsPopoverClosed = false;
    this.menu.enable(false, 'sideMenu');
  }

  changeWeightUnit(ev) {
    // if(!this.weightUnitChange){
    //   this.weightUnit = "kg";
    // } else {
    //   this.weightUnit = "lbs";
    // }
    this.weightUnit = !this.weightUnitChange ? "kg" : "lbs";
  }

  rpeRIRchanged(ev) {
    // if(!this.changeRPErir){
    //   // this.rpeRIR = "RPE";
    // } else {
    //   // this.rpeRIR = "RIR";
    // }
    // this.rpeRIR = !this.changeRPErir ? "RPE" : "RIR";
  }

  goBack() {
    //program not saved
    //any changes made will be lost!
    // this.firstPage = true;
    // this.weekListPage = false;
    // this.dayListPage = false;

     if(this.oneRMPage) {
      this.oneRMPage = false;
      this.pageTitle = "Program Management";
      this.firstPage = true;
    } else if(this.weekListPage) {
      this.weekListPage = false;
      this.pageTitle = "Create Program";
      this.oneRMPage = true;
    } else if(this.dayListPage) {
      this.dayListPage = false;
      this.pageTitle = "Create Program";
      this.weekListPage = true;
    }
    //clean input fields - after program is saved????
    //delete object
    // this.exerciseList = [];
    // this.weekList = [];
  }

  goSelectedProgram() {
    //get program list on ionViewDidEnter and display it here
  } //todo

  goWeek(i: any) {
    //pass  i  into a global variable and control ngFor slice?
    this.weekListPage = false;
    this.dayListPage = true;
    this.pageTitle = "Week " + (i + 1);
    this.weekIndexControl = i;
    this.id = 0;
    this.selectedSegment = this.segmentList[0];

    // console.log(this.id, this.weekList[this.weekIndexControl])
  }

  goOneRMPage() {

    this.optionsPopoverClosed = true;
    // if(this.firstTimeOneRM) { // || this.editOneRMList
    //   this.firstPage = false;
    //   this.oneRMPage = true;
    // }
    if(this.weekListPage) {
        this.oneRMPage = true;
      this.oneRMpageReturnControl = 1;
      this.weekListPage = false;
      this.pageTitle = "Edit 1RMs"
    } else if(this.dayListPage) {
        this.oneRMPage = true;
      this.oneRMpageReturnControl = 2;
      this.dayListPage = false;
      this.pageTitle = "Edit 1RMs"
    }

  }

  closeOneRMpage() {
    if(this.firstTimeOneRM) {
      this.weekListPage = true;
      this.oneRMPage = false;
      this.firstTimeOneRM = false;
    } else {
      if(this.oneRMpageReturnControl == 1) {
        this.weekListPage = true;
          this.oneRMPage = false;
        this.pageTitle = "Week " + (this.weekIndexControl + 1);
      } else if(this.oneRMpageReturnControl == 2) {
        this.dayListPage = true;
          this.oneRMPage = false;
        this.pageTitle = "Week " + (this.weekIndexControl + 1);
      }
    }
  }

  addRM() {
    // if(this.oneRMList.length == 0) {
    //   this.oneRMIndexControl = 0;
    // } else {
    //   this.oneRMIndexControl++;
    // }
    this.oneRMobj = new oneRM();

    this.oneRMList.push(this.oneRMobj);
    // this.oneRMList[this.oneRMIndexControl].id = this.oneRMIndexControl;

    // this.oneRMList[this.oneRMIndexControl].day = Array(7);
    // for(var i = 0; i < 7; i++) {
    //   this.oneRMList[this.oneRMIndexControl].day[i] = []
    // }
    console.log(this.oneRMList)
  }

  removeRM(i: any) { //show errorDiv
    //ask
    //are you sure? this action can't be undone!
    // if weeklist length == 1 show message "your program must contain at least one week"

    // if(this.weekList.length > 1) {
      this.oneRMList.splice(i, 1);
      this.editRMlist = false;
    // }
  }

  editRM(i: any) {
    this.editRMlist = true;
  }

  confirmEditRM() {
    this.editRMlist = false;
  }

  openMenuButton() {
    this.menu.enable(true, 'sideMenu');
    this.menu.open('sideMenu');
  }

  saveProgram() {
    // store program in json file

    // var programOBJ = new program();
    // programOBJ.push(this.weeklist)
    // console.log(programOBJ)
    // this.menu.enable(true, 'sideMenu');
    // this.firstPage = true;
    // // this.updateProgramList(); //todo
    // this.oneRMPage = false;
    // this.weekListPage = false;
    // this.dayListPage = false;
    console.log("save program")
  }

  createProgram() {
    this.firstPage = false;
    // this.menu.enable(false, 'sideMenu');
    this.firstTimeOneRM = true; //goOneRMPage and this.pageTitle = "1RM"
    this.oneRMPage = true;
    this.oneRMList = [];
    this.oneRMIndexControl = 0;

    // this.weekListPage = true;
    this.pageTitle = "Create Program";

    this.menu.enable(false, 'sideMenu');

    this.programOBJ = new program();
    this.weekList = [];
    this.weekIndexControl = 0;
    this.addWeek();
  }

  addExercise(dayIndex: any) { //check lastExerciseFilled

    this.exerciseOBJ = new exercise();

    // if (this.lastExerciseFilled()) {
      this.weekList[this.weekIndexControl].day[this.id].push(this.exerciseOBJ);
    // }
    console.log(this.weekList)
  }

  removeExercise(exerciseIndex: any) { //show errorDiv
    //ask
    //are you sure? this action can't be undone!
      this.weekList[this.weekIndexControl].day[this.id].splice(exerciseIndex, 1);
  }

  addWeek() {

    if(this.weekList.length == 0) {
      this.weekIndexControl = 0;
    } else {
      this.weekIndexControl++;
    }
    this.weekOBJ = new week();

    this.weekList.push(this.weekOBJ);

    this.weekList[this.weekIndexControl].day = Array(7);
    for(var i = 0; i < 7; i++) {
      this.weekList[this.weekIndexControl].day[i] = []
    }
    // console.log(this.weekList)
  }

  removeWeek(i: any) { //show errorDiv
    //ask
    //are you sure? this action can't be undone!
    // if weeklist length == 1 show message "your program must contain at least one week"

    // if(this.weekList.length > 1) {
      this.weekList.splice(i, 1);
    // }
  }

  lastExerciseFilled() { //change logic
    var lastArrayIndex = this.exerciseList[this.exerciseList.length - 1]
    if (lastArrayIndex.exerciseName == "" || lastArrayIndex.sets > 0 || lastArrayIndex.minReps > 0) {
      return false;
    } else {
      return true;
    }
  }

  showErrorDivBackdrop(title: string, description: string) {
  //   this.hideFlag = false;
  //   this.errorTitle = title;
  //   this.errorDescription = description;
  }

  segmentChanged(ev: any, index: any) {
    // console.log('Segment changed', ev, index);
  }

  _segmentSelected(item: string, index: number) {
    // console.log(item, index);
    this.slide.slideTo(index, 0);
    this.id = index;

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

}

class exercise {
  exerciseName: string = "";

  oneRM: number = 0;
  percentage: number = 0;
  hasPercentage: boolean = false;

  weight: number = 0;
  weightInput: boolean = false;

  sets: number = 0;
  reps: number = 0;

  hasRPE: boolean = false;
  rpe: number = 0;

  isAMRAP: boolean = false;
  amrap: number = 0;

  hasRIR: boolean = false;
  rir: number = 0;

  description: string = "";

  restDay: boolean = false;
}

class oneRM {
  // id: number; // do I really need this?
  exerciseName: string = "";
  oneRM: number;
}

// class day { //do I need this?
//   //day is an array of objects
//   //push into week?
// }

class week {
//week is an array of days
//push day into exerciseList array
} //do I need this?

class program {
// is an array of weeks
// push weekList

  programName: string = "";
  weightUnit: string = "";
  oneRMs: any = [];
}
