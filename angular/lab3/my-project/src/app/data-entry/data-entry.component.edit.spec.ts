import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DataEntryComponent } from './data-entry.component';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Post } from '../model/post';
import { By } from '@angular/platform-browser';

describe('DataEntryComponent Edit', () => {
  let fixture: ComponentFixture<DataEntryComponent>;
  let component: DataEntryComponent;
  let mockdataService, mockActivatedRoute;
  beforeEach(() => {
    mockdataService = jasmine.createSpyObj(['postById']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => {
        return 3;
      }}}
    };

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

    mockdataService.postById.and.returnValue(of<Post>( {id: 1, title: 'dummy title', body: 'dummy body', userId : 1}));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit should show previous record', () => {
    // To trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.editMode).toBeTruthy();
      expect(component.post.id).toBe(1);
      expect(component.post.title).toBe('dummy title');

      const userid = fixture.debugElement.query(By.css('#UserId'));
      expect(userid.nativeElement.textContent).toBe('');

    });

    // expect(component.post.id).toBe(1);
    // expect(component.post.title).toBe('dummy title');

    // const userid = fixture.debugElement.query(By.css('#UserId'));
    // expect(userid.nativeElement.textContent).toBe('');

    // todo : test for other 2 fields.
  });
});
