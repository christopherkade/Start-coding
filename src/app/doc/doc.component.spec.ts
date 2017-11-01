import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocComponent } from './doc.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DocComponent', () => {
  let component: DocComponent;
  let fixture: ComponentFixture<DocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DocComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
