import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAllComponent } from './doc-all.component';

describe('DocAllComponent', () => {
  let component: DocAllComponent;
  let fixture: ComponentFixture<DocAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
