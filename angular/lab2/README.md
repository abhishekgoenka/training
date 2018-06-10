# Objective
1. Learn angular service 
2. Learn angular forms
3.  

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
  userid: number;
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
      <td>{{post.userid}}</td>
      <td>{{post.title}}</td>
      <td>{{post.body}}</td>
      <td class="actions"><a href="#" class="icon"><i class="s7-trash"></i></a></td>
    </tr>
  </tbody>
</table>
```

