import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IchComponent } from './ich.component';

describe('IchComponent', () => {
  let component: IchComponent;
  let fixture: ComponentFixture<IchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
