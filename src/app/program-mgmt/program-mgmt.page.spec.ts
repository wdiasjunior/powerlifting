import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgramMgmtPage } from './program-mgmt.page';

describe('ProgramMgmtPage', () => {
  let component: ProgramMgmtPage;
  let fixture: ComponentFixture<ProgramMgmtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMgmtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramMgmtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
