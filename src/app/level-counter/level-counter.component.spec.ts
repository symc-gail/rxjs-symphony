import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCounterComponent } from './level-counter.component';

describe('LevelCounterComponent', () => {
  let component: LevelCounterComponent;
  let fixture: ComponentFixture<LevelCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
