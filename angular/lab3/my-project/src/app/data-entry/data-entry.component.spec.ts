import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataEntryComponent } from './data-entry.component';
import { DataEntryModule } from './data-entry.module';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DataEntryComponent', () => {
  let fixture: ComponentFixture<DataEntryComponent>;
  let component: DataEntryComponent;
  let mockdataService, mockActivatedRoute;
  beforeEach(() => {
    mockdataService = jasmine.createSpyObj(['']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => null}}
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
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all the fields should be empty', () => {

    // To trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    expect(component.editMode).toBeFalsy();
    const userid = fixture.debugElement.query(By.css('#UserId'));
    expect(userid.nativeElement.textContent).toBe('');

    // todo : test for other 2 fields.
  });

  it('should be allowed to add record', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const userid = fixture.debugElement.query(By.css('#UserId'));
      userid.nativeElement.value = 3;
      const title = fixture.debugElement.query(By.css('#title'));
      title.nativeElement.value = 'title testing...';
      const body = fixture.debugElement.query(By.css('#body'));
      body.nativeElement.value = 'body testing...';

      expect(userid.nativeElement.value).toBe('3');
      // todo : test for other 2 fields.

      component.onSubmit();
      expect(mockdataService.addPost).toHaveBeenCalledTimes(1);
    });
  });
});
