import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DataEntryComponent } from './data-entry.component';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Post } from '../model/post';
import { By } from '@angular/platform-browser';
// describe('DataEntryComponent', () => {
//   let component: DataEntryComponent;
//   let fixture: ComponentFixture<DataEntryComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DataEntryComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DataEntryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


describe('DataEntryComponent', () => {
  let fixture: ComponentFixture<DataEntryComponent>;
  let component: DataEntryComponent;
  let mockdataService, mockActivatedRoute;
  beforeEach(() => {
    mockdataService = jasmine.createSpyObj(['']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => 0}}
    };

    // mockActivatedRoute = {
    //   snapshot: { paramMap: { get: () => {
    //     return 3;
    //   }}}
    // };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DataEntryComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: DataService, useValue: mockdataService}
      ]
    });
    fixture = TestBed.createComponent(DataEntryComponent);
    component = fixture.componentInstance;

    // mockdataService.postById.and.returnValue(of<Post>( {id: 1, title: 'dummy title', body: 'dummy body', userId : 1}));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('all the fields should be empty', () => {

    // To trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    const userid = fixture.debugElement.query(By.css('#UserId'));
    expect(userid.nativeElement.textContent).toBe('');

    // todo : test for other 2 fields.
  });
});
