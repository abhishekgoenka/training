# Objective
1. Learn Edit and Delete feature of Form 
2. Unit Testing

# JSON Server
Get JSON server so we can test our APIs. [more](https://github.com/typicode/json-server)

### Install
> npm install -g json-server

### Create a db.json file
```json
{
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "json-server",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

### Add NPM Script
project.json
```json
"scripts": {
    "ng": "ng",
    "start": "concurrently --kill-others \"npm run server\" \"npm run client\"",
    "client": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "server": "json-server --watch db.json"
  },
```

### Start Application
Add `concurrently` npm module to start `Angular` and `json-server` at the same time
> npm install concurrently --save-dev

Start 
> npm start


# Add Edit and Delete Feature
We would first need Edit and Delete icon. We will use [Font Awesome](https://fontawesome.com/) for icons.

Place this code, which contains everything you need, within the `<head>` of each template or page that you want to use Font Awesome on. In our case, `Index.html`

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
```

**ng2-toastr**
Add `ng2-toastr` for notifications. [more](https://www.npmjs.com/package/ng2-toastr)

Install ng2-toastr using npm:
> npm install --save toastr

Include js and css files in angular-cli.json
```json
 "styles": [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/toastr/build/toastr.min.css",
        "styles.css"
      ],
      "scripts": [
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
        "./node_modules/toastr/build/toastr.min.js"
      ],
```

### Delete
data.service.ts
```typescript
  deletePost(post: Post): Observable<any> {
    return this.http.delete(`${this.URL}/posts/${post.id}`);
  }
```

report.component.html
```html
<td>
  <button class="btn btn-link far fa-trash-alt" (click)="delete(post)"></button>
</td>
```
report.component.ts
```typescript
  delete(post: Post) {
    this.dataService.deletePost(post).subscribe(() => toastr.success(`Record deleted`), () => toastr.error(`Error Occurred`));
  }
```
Since toastr is global JavaScript variable. Declare this variable at top of TypeScript file
> declare var toastr;

### Edit Record
Add edit method in `report.component.ts`
```typescript
  edit(post: Post) {
    this.router.navigate(['entry', post.id]);
  }
```

Don't forget to inject router module
```typescript
 constructor(
      private router: Router,
      private dataService: DataService) { }
```

Update the `report.component.html`
```html
<td>
  <button class="btn btn-link far fa-edit" (click)="edit(post)"></button>
  <button class="btn btn-link far fa-trash-alt" (click)="delete(post)"></button>
</td>
```

On click of edit, we are routing to `http://localhost:4200/entry/1`; where 1 is entry id. We don't have this route. Therefore, create one in `app-routing.module.ts`
```typescript
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/entry',
        pathMatch: 'full'
      },
      { path: 'entry/:id', component: DataEntryComponent },
      { path: 'entry', component: DataEntryComponent },
      { path: 'report', component: ReportComponent }
    ])
  ],
  exports: [RouterModule]
})
```
Get the id value on `data-entry.component.ts` initialize
```typescript
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
```
Don't forget to inject `ActivatedRoute` module
```typescript
 constructor(
    private dataService: DataService,
    private route: ActivatedRoute) { }
```

Add a method in `data.service.ts` to get post by id
```typescript
  postById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`);
  }
```

Use this method in data-entry.component.ts
```typescript
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.postById(id).subscribe((p: Post) => {
        this.data = p;
        this.editMode = true;
      }, () => toastr.error(`Error Occurred`));
    }
  }
```

Add a method in `data.service.ts` to update post by id
```typescript
  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.URL}/posts/${post.id}`, post);
  }
```

Also you will have to update save method
```typescript
  onSubmit() {
    if (this.editMode) {
      this.dataService.updatePost(this.data).subscribe(() => toastr.success(`Record Updated`), () => toastr.error(`Error Occurred`));
    } else {
      this.dataService.addPost(this.data).subscribe(() => toastr.success(`Record saved`), () => toastr.error(`Error Occurred`));
    }
  }
```

# ROUTE GUARDS
A route guard is a feature of the Angular Router that allows developers to run some logic when a route is requested, and based on that logic, it allows or denies the user access to the route. It’s commonly used to check if a user is logged in and has the authorization before he can access a page.

You can add a route guard by implementing the CanActivate interface available from the @angular/router package and extends the canActivate() method which holds the logic to allow or deny access to the route. For example, the following guard will always allow access to a route:
```typescript
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }
}
```

You can then protect a route with the guard using the canActivate attribute:
```typescript
{ path: 'entry', canActivate: [ AuthGuard ],  loadChildren: './data-entry/data-entry.module#DataEntryModule' },
```

Now all the CRUD operations should be working fine.

# Testing
Two types of test cases we can write in Angular. 
1. Unit Tests
2. Integration and Functional Testing or End-to-End Tests

## Unit Tests in Angular
We will use following tools
1. Karma - Spectacular Test Runner for Javascript [more](https://karma-runner.github.io/2.0/index.html)
2. Jasmine - Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests. [more](https://jasmine.github.io/)

## Jasmine Concepts
Name | Description | Code Keyword
------------ | ------------- | -------------
Suite | Described set of tests that corresponds to an area of code that needs testing. there is usually one suite of tests per unit test fle, such as app. component.suite.ts. however, you can have more than one described set of tests in a unit test fle. | describe
Spec | A test that performs code and checks the result against expectations. there can be multiple specs in a suite. | it
Expectations | Used within a test to check the result. | expect
Matchers | Used by an expectation to specify the expectation as a rule. | toBe, toEqual, toBeNull, toContain, toThrow, toThrowError, and so on

## Writing Good Unit Tests
* **Arrange** all necessary preconditions and inputs
* **Act** on the object or class under test
* **Assert** that the expected results have occurred

## Run Test
> npm run test

or

> npm test

Instead of just running `ng test`, I want to run `ng test` with a specific flag. I'm going to turn off the source maps by setting `--sourcemaps=false`. [more](https://github.com/angular/angular-cli/wiki/test)

You might think that turning off the source maps is a bad thing to do, but it turns out that the way that Karma and zone interact on certain kinds of failing tests, this is actually the way to see what's really going on. It's possible in the future that this isn't a necessary step, but for now I highly recommend you do this in your unit testing, and we're going to use that flag in this course. [more](https://angular.io/guide/testing)

### my first test
```typescript
describe('DataEntryComponent', () => {
  it('my first test', () => {
    expect(true).toBe(true);
  });
});
```
### The TestBed
It's time now to begin writing our first integration test. This is going to be a shallow integration test, meaning that we're only going to test a single component and none of its child components or directives.

We're going to use a special utility called the `TestBed`. The `TestBed` is what allows us to test both the component and its template running together. And really what's going to happen is we're going to create a special module just for testing purposes. We do that again with the `TestBed` object, and I'm going to import that object from `@angular/core/testing`, and we can see that imported up here.

### data-entry.component.spec.ts
Initialize component test
```typescript
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
});
```
You can create a component fixture with TestBed.createComponent. Fixtures have access to a debugElement, which will give you access to the internals of the component fixture.
Change detection isn’t done automatically, so you’ll call detectChanges on a fixture to tell Angular to run change detection.
```typescript
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
```

### data-entry.component.edit.spec.ts
```typescript
  it('should be allowed to update record', () => {
    // To trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    expect(component.editMode).toBeTruthy();
    expect(component.post.id).toBe(1);
    expect(component.post.title).toBe('dummy title');

    expect(mockdataService.postById).toHaveBeenCalledTimes(1);

    fixture.whenStable().then(() => {
      const userid = fixture.debugElement.query(By.css('#UserId'));
      expect(userid.nativeElement.value).toBe('1');
      // todo : test for other 2 fields.

      component.onSubmit();
      expect(mockdataService.updatePost).toHaveBeenCalledTimes(1);
    });
  });
```
