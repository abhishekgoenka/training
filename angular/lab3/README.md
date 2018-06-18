# Objective
1. Learn Edit and Delete feature of Form 
2. 

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

### Start JSON Server
> npm run server


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
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/toastr/build/toastr.min.css",
        "styles.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/bootstrap/dist/js/bootstrap.min.js",
        "../node_modules/toastr/build/toastr.min.js"
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
    this.route.params.subscribe(res => {
      console.log(res.id);
    });
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
    this.route.params.subscribe(res => {
      if (res.id) {
        this.dataService.postById(res.id).subscribe(p => {
          this.post = p;
          this.editMode = true;
        }, () => toastr.error(`Error Occurred`));
      }
    });
  }
```

Add a method in `data.service.ts` to update post by id
```typescript
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.URL}/posts/${post.id}`, post);
  }
```

Also you will have to update save method
```typescript
onSubmit() {
    if (this.editMode) {
      this.dataService.updatePost(this.post).subscribe(() => toastr.success(`Record Updated`), () => toastr.error(`Error Occurred`));
    } else {
      this.dataService.addPost(this.post).subscribe(() => toastr.success(`Record saved`), () => toastr.error(`Error Occurred`));
    }
  }
```

Now all the CRUD operations should be working fine.