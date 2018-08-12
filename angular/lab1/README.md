# Prerequisites
1.  [nodejs](https://nodejs.org/en/)
2.  [Visual Studio Code](https://code.visualstudio.com/download)

# Objective
*   Bootstrap Angular App 
*   Understand various Angular files
*   Understand routing

# Install Angular CLI
The Angular CLI is a tool to initialize, develop, scaffold and maintain Angular applications. [wiki](https://github.com/angular/angular-cli/wiki)

The following command installs the Angular CLI globally
> npm install -g @angular/cli

To update the CLI version, you should uninstall it and reinstall it with the following commands:

> npm uninstall -g angular-cli

> npm cache clean

> npm install -g angular-cli


# New Project
Generating and serving an Angular project via a development server Create and run a new project:
* ng new my-project
* cd my-project
* ng serve

# Understand package.json
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
```
Add `--open` to start script. This will open the url in default browser. 
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve --open",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
```
Now, `npm start` will start the angular app and also open the URL in default browser. npm supports the "scripts" property of the package.json file. [Here](https://docs.npmjs.com/misc/scripts) is the complete list.

Additionally, arbitrary scripts can be executed by running npm run build. 

Finally, you should following output

![Welcome](https://github.com/abhishekgoenka/training/blob/master/angular/lab1/git/2018-06-08%2016_43_40-.png)

# Add package
 Bootstrap is the world’s most popular framework for building responsive, mobile-first sites, with BootstrapCDN and a template starter page. [more](https://getbootstrap.com/docs/4.1/getting-started/introduction/)

 > npm install bootstrap --save

Now you should see `"bootstrap": "^4.1.3",` in package.json file under dependencies.

Similarly add jQuery package. jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript. [more](https://jquery.com/)

> npm install jquery --save

After both packages have been installed successfully, the jQuery and Bootstrap files can be found at:

* node_modules/jquery/dist/jquery.min.js
* node_modules/bootstrap/dist/css/bootstrap.min.css
* node_modules/bootstrap/dist/js/bootstrap.min.js

Add the file paths to the styles and scripts array in file `angular.json`:

```json
"styles": [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ],
"scripts": [
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.min.js"
      ],
```
**Note**: Always restart the server when you make changes in `angular.json` file

Angular CLI v6 supports the addition of packages through the ng add command which executes in one step the set of otherwise individually needed commands.

> ng add bootstrap

# Update default page
Now, it is time to update default page. Update following HTML in `app.component.html` page

```html
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <a class="navbar-brand" href="#">My App</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Data Entry <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/report">Report</a>
      </li>
    </ul>
  </div>
</nav>

<main role="main" class="container">
  <div class="jumbotron">
    <h1>My App</h1>
    <p class="lead">This example is a quick exercise to illustrate how the Angular works.</p>
    <a class="btn btn-lg btn-primary" href="https://angular.io/" role="button">View Angular docs &raquo;</a>
  </div>
</main>
```

You should now see following output
![Welcome](https://github.com/abhishekgoenka/training/blob/master/angular/lab1/git/2018-06-09%2014_51_07-.png)

# Add Routing & Navigation
The Angular Router enables navigation from one view to the next as users perform application tasks. [more](https://angular.io/guide/router)

We have 2 links. Therefore, we will need 2 new components. Use `angular-cli` to generate 2 new components
1. Data Entry
2. Report

> ng g component DataEntry

> ng g component Report

You should now see 2 new folders under app directory. Create routing module

> ng g module appRouting --flat

Add following code to newly created file

app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/entry',
        pathMatch: 'full'
      },
      { path: 'entry', component: DataEntryComponent },
      { path: 'report', component: ReportComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Add `AppRoutingModule` to `app.module.ts`
```typescript
@NgModule({
  declarations: [
    AppComponent,
    DataEntryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Router outlet
Given this configuration, when the browser URL for this application becomes `/entry`, the router matches that URL to the route path `/entry` and displays the `DataEntryComponent` after a `RouterOutlet` that you've placed in the host view's HTML.

Add `<router-outlet></router-outlet>` to `app.component.html`

```html
<main role="main" class="container">
  <router-outlet></router-outlet>
  <div class="jumbotron">
    <h1>My App</h1>
    <p class="lead">This example is a quick exercise to illustrate how the Angular works.</p>
    <a class="btn btn-lg btn-primary" href="https://angular.io/" role="button">View Angular docs &raquo;</a>
  </div>
</main>
```
It would be nice if we move `<div class="jumbotron">` to `data-entry.component.html` file

Move following code
```html
<div class="jumbotron">
    <h1>My App</h1>
    <p class="lead">This example is a quick exercise to illustrate how the Angular works.</p>
    <a class="btn btn-lg btn-primary" href="https://angular.io/" role="button">View Angular docs &raquo;</a>
</div>
```

**Checkpoint** - At this point your navigation should be working fine. But our `Router links` are still classic HTML. Let's fix that.

# Router links
Now you have routes configured and a place to render them, but how do you navigate? The URL could arrive directly from the browser address bar. But most of the time you navigate as a result of some user action such as the click of an anchor tag.

Update following `html` in file `app.component.html`
```html
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">My App</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/entry" routerLinkActive="active">Data Entry</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" routerLink="/report" routerLinkActive="active">Report</a>
        </li>
      </ul>
    </div>
</nav>
```




