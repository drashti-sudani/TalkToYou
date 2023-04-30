import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpfComponent } from './otpf.component';

describe('OtpfComponent', () => {
  let component: OtpfComponent;
  let fixture: ComponentFixture<OtpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
