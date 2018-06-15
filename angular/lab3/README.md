# Objective
1. Learn Edit and Delete feature of Form 
2. 

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

**Delete**
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
    this.dataService.deletePost(post).subscribe(() => toastr.success(`Record deleted`));
  }
```
Since toastr is global JavaScript variable. Declare this variable at top of TypeScript file
> declare var toastr;

