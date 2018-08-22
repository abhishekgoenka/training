# Objective
1. Learn angular service 
2. Learn angular forms
3. Form Validation 

# Add HTML Template 
We need some `HTML` template to work with `Report` tab. Use below `HTML`

report.component.html
```html
<table class="table">
  <thead>
    <tr>
      <th style="width:10%;">Id</th>
      <th style="width:10%;">UserId</th>
      <th style="width:30%;">Title</th>
      <th style="width:40%;">Body</th>
      <th class="actions"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>1</td>
      <td>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</td>
      <td>quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</td>
      <td class="actions"><a href="#" class="icon"><i class="s7-trash"></i></a></td>
    </tr>
    <tr>
      <td>2</td>
      <td>1</td>
      <td>qui est esse</td>
      <td>est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"</td>
      <td class="actions"><a href="#" class="icon"><i class="s7-trash"></i></a></td>
    </tr>
  </tbody>
</table>
```

# Model
Create a post model. We will be using this model for our entire exercise.

post.ts
```typescript
export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

# Create Service
Create `data.service.ts` using `angular.cli`
> ng g service data

Register `DataService` to `app.module.ts` under `providers`. A provider is an instruction to the DI system on how to obtain a value for a dependency. Most of the time, these dependencies are services that you create and provide. [more](https://angular.io/guide/providers)

you need to import the Angular `HttpClientModule`. [more](https://angular.io/guide/http)
```typescript
@NgModule({
  declarations: [
    AppComponent,
    DataEntryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
```

JSONPlaceholder is a free online REST service that you can use whenever you need some fake data [more](https://jsonplaceholder.typicode.com/). We will use JSONPlaceholder for all our RESTful requests.

# HTTPClient
When Angular 2 was first released in September 2016, you made HTTP calls with it by first importing the HTTP module, and then using a class simply named HTTP that included methods for making HTTP requests. It worked fine, but the API was a little clunky, and it was missing some nice features that developers appreciated in the 1.X version of Angular now known as Angular JS. So, in version 4.3 of Angular, which was released of July 2017, the Angular team added a completely new set of APIs for making HTTP requests. They're in a module named `HttpClientModule`, and the class you use to make requests is named `HttpClient`. Beginning with the release of Angular 5 in November 2017, the older HTTP module has been deprecated. 

# GET Posts
Now, let us write a method to get all the posts.

```typescript
export class DataService {
  private URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }
}
```

# Show all the Posts in Reports
`subscribe` to posts in `ngOnInit`

report.component.ts
```typescript
ngOnInit() {
    this.dataService.posts().subscribe((data: Array<Post>) => this.posts = data);
  }
```  

Update the HTML file to show all the posts
report.component.html
```html
<table class="table">
  <thead>
    <tr>
      <th style="width:10%;">Id</th>
      <th style="width:10%;">UserId</th>
      <th style="width:30%;">Title</th>
      <th style="width:40%;">Body</th>
      <th class="actions"></th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let post of posts">
      <td>{{post.id}}</td>
      <td>{{post.userId}}</td>
      <td>{{post.title}}</td>
      <td>{{post.body}}</td>
      <td class="actions"><a href="#" class="icon"><i class="s7-trash"></i></a></td>
    </tr>
  </tbody>
</table>
```

# Angular Forms
Forms are the mainstay of business applications. You use forms to log in, submit a help request, place an order, book a flight, schedule a meeting, and perform countless other data-entry tasks. [more](https://angular.io/guide/forms) 

Angular offers two form-building technologies
1. **Template-driven forms** - You can build forms by writing templates in the Angular template syntax with the form-specific directives and techniques described in this page. [more](https://angular.io/guide/forms)

    * Advantages - Simple, quick to get started, perfect for simple forms, don’t need to know how form model objects work
    * Disadvantages - HTML and business rules are coupled, no unit testing
    
2. **Reactive forms** - Angular reactive forms facilitate a reactive style of programming that favors explicit management of the data flowing between a non-UI data model (typically retrieved from a server) and a UI-oriented form model that retains the states and values of the HTML controls on screen. Reactive forms offer the ease of using reactive patterns, testing, and validation. [more](https://angular.io/guide/reactive-forms)

    * Advantages - More control, perfect for more advanced forms, enable unit testing, HTML and business rules are decoupled
    * Disadvantages - Need to know how form model objects work, take more time to develop

Add `FormsModule` to `app.module.ts`
```typescript
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
```

# Implementing The Form Template
Now that the `DataEntryComponent` is available and has been added to AppModule we can continue to implement the form template in file data-entry.component.html:

```html
<h1>Add Post</h1>
<form (ngSubmit)="onSubmit()" #postForm="ngForm">
  <div class="form-group">
    <label for="UserId">UserId</label>
    <input type="text" class="form-control" id="UserId" name="UserId" required [(ngModel)] = "post.userId">
  </div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" required [(ngModel)] = "post.title">
  </div>
  <div class="form-group">
      <label for="body">Body</label>
      <textarea type="text" class="form-control" id="body" name="body" rows="5" [(ngModel)] = "post.body"></textarea>
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
</form>
```

# Implementing Two-Way Data Binding
Now that the form template is ready and the form is displayed in the browser we need to find a way to access the form data. Angular 2 offers the concept of two-way data binding which helps us to solve that problem. 
 
To enable two-way data binding we need to extend the form template and use the `ngModel` directive in the input elements. The extended form template code with ngModel looks like the following:

`<input type="text" class="form-control" id="UserId" name="UserId" required [(ngModel)] = "post.userId">`

Notice that, together with `ngModel`, we also added the `name` attribute to each element. We're assinging a unique string value to this attribute. Defining a `name` attribute is a requirement when using `[(ngModel)]` in combination with a form. Why is this a requirement? For each input element with a `name` attribute assigned Angular 2 created internally a FormControl. Furthermore these FormControls are registered with an `NgForm` directive which is automatically created for each `<form>` element in the template code. Each `FormControl` is registered under the `name` we assigned to the `name` attribute.

# Validations

```html
<h1>Add Post</h1>
<form (ngSubmit)="onSubmit()" #postForm="ngForm">
  <div class="form-group">
    <label for="UserId">UserId</label>
    <input type="text" class="form-control" id="UserId" name="UserId" required [(ngModel)] = "post.userId" #UserId="ngModel">
    <div [hidden]="UserId.valid || UserId.pristine" class="alert alert-danger">
          User Id is required
    </div>
  </div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" required [(ngModel)] = "post.title" #Title="ngModel">
    <div [hidden]="Title.valid || Title.pristine" class="alert alert-danger">
        Title is required
  </div>
  </div>
  <div class="form-group">
      <label for="body">Body</label>
      <textarea type="text" class="form-control" id="body" name="body" rows="5" [(ngModel)] = "post.body"></textarea>
  </div>
  <button type="submit" class="btn btn-success" [disabled]="!postForm.form.valid">Submit</button>
</form>

```
# Add Post Request
I'm going to add the new `Post` by making an HTTP request with the post verb. I can do that by using the post method available on the `HttpClient`. By convention, when a resource is added to a REST service with a post request, the newly-added resource is returned in the body of the `HttpResponse`. That object will also be the object that gets wrapped into the observable returned by Angular's `HttpClient`. Therefore, I'm going to specify the type of that object, Post, as the generic parameter on the method. I'm also returning from this method the same observable returned by the post method, which is why the return type of addPost is an Observable of Post. Just like the get method we've already seen, the first parameter to post is the URL where the request will be sent. I'm adding a Post, so the URL is the same address I used when retrieving all posts, /api/posts. The server will interpret the two requests differently because of the different HTTP verbs being used. The second parameter I'll pass is the book object to be added, which is the newPost parameter passed into this method. 

data.service.ts
```typescript
  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost);
  }
```
# Show Success Message
Let's imporve user interface by adding success message. 

```html
<div class="alert alert-success" role="alert" style="margin-top: 10px" *ngIf="isSuccess">
      Record saved successfully !!!
</div>
```

```typescript
onSubmit() {
    this.dataService.addPost(this.post).subscribe(post => {
      if (post) {
        this.isSuccess = true;
      }
    });
  }
```
Todo
1. Add error message.
2. Add Reset button

# Reactive forms
Create a new component so we don't pollute existing.
> ng g component dataEntryReactive --spec=false --inline-style

# Import the ReactiveFormsModule
To create a Reactive form, you need to import  the `ReactiveFormsModule` from @angular/forms and add it to the imports array in `app.module.ts`.
```typescript
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
```

# Tracking the State Using FormControl
While building forms with the reactive forms strategy, you won't come across the ngModel and ngForm directives. Instead, we use the underlying FormControl and FormGroup API.

A FormControl is a directive used to create a FormControl instance that you can use to keep track of a particular form element's state and its validation status.

data-entry-reactive.component.html
```html
<h1>Add Post - Reactive</h1>
<form (ngSubmit)="onSubmit()" [formGroup]="postForm">
  <div class="form-group">
    <label for="UserId">UserId</label>
    <input type="text" class="form-control" id="UserId" name="UserId" formControlName = "userId">
    <div *ngIf="postForm['controls'].userId.invalid && postForm['controls'].userId.touched" class="alert alert-danger">
          User Id is required
    </div>
  </div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" required formControlName = "title">
    <div *ngIf="postForm['controls'].title.invalid && postForm['controls'].title.touched" class="alert alert-danger">
        Title is required
    </div>
  </div>
  <div class="form-group">
      <label for="body">Body</label>
      <textarea type="text" class="form-control" id="body" name="body" rows="5" formControlName = "body"></textarea>
  </div>
  <button type="submit" class="btn btn-success" [disabled]="!postForm.valid">Submit</button>

  <div class="alert alert-success" role="alert" style="margin-top: 10px" *ngIf="isSuccess">
      Record saved successfully !!!
  </div>

</form>
```

data-entry-reactive.component.ts
```typescript
export class DataEntryReactiveComponent implements OnInit {
  isSuccess = false;
  postForm: FormGroup;
  constructor(private fb: FormBuilder,
    private dataService: DataService) {
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.postForm = this.fb.group({
      userId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl()
    });
  }

  onSubmit() {
    const newPost: Post = this.postForm.value;
    this.dataService.addPost(newPost).subscribe(post => {
      if (post) {
        this.isSuccess = true;
      }
    });
  }
}
```
