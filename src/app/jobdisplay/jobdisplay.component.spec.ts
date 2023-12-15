import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdisplayComponent } from './jobdisplay.component';

describe('JobdisplayComponent', () => {
  let component: JobdisplayComponent;
  let fixture: ComponentFixture<JobdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
