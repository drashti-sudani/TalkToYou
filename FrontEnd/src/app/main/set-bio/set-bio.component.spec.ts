import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBioComponent } from './set-bio.component';

describe('SetBioComponent', () => {
  let component: SetBioComponent;
  let fixture: ComponentFixture<SetBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
