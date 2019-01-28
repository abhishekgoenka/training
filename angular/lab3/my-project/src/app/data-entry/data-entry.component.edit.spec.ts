import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DataEntryComponent } from './data-entry.component';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Post } from '../post';

describe('DataEntryComponent Edit', () => {
  let fixture: ComponentFixture<DataEntryComponent>;
  let component: DataEntryComponent;
  let mockdataService, mockActivatedRoute;
  beforeEach(() => {
    mockdataService = jasmine.createSpyObj(['postById', 'updatePost']);
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
    mockdataService.updatePost.and.returnValue(of({}));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be allowed to update record', () => {
    // To trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    expect(component.editMode).toBeTruthy();
    expect(component.data.id).toBe(1);
    expect(component.data.title).toBe('dummy title');

    expect(mockdataService.postById).toHaveBeenCalledTimes(1);

    fixture.whenStable().then(() => {
      const userid = fixture.debugElement.query(By.css('#UserId'));
      expect(userid.nativeElement.value).toBe('1');
      // todo : test for other 2 fields.

      component.onSubmit();
      expect(mockdataService.updatePost).toHaveBeenCalledTimes(1);
    });
  });
});
