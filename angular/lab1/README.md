# Prerequisites
1.  [nodejs](https://nodejs.org/en/)
2.  [Visual Studio Code](https://code.visualstudio.com/download)

# Objective
*   Bootstrap Angular App 
*   Understand various Angular files
*   Understand routing
*   Lazy Loading

# Node
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

## NPM
You can use NPM to handle both production and development dependencies. Production dependencies are modules that must be present for your application to run. Development dependencies include tooling and type definitions that you only need while coding and that you don’t need when running the application.

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
    "build": "ng build",
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
    "build": "ng build",
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

Now you should see `"bootstrap": "^4.2.1",` in package.json file under dependencies.

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

**Angular CLI v6** supports the addition of packages through the ng add command which executes in one step the set of otherwise individually needed commands.

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
        <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/entry">Data Entry</a>
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

We have 3 links. Therefore, we will need 3 new components and one `PageNotFound` component. Use `angular-cli` to generate 4 new components
1. Dashboard
2. Data Entry
3. Report
4. PageNotFound -> When route doesn't match

> ng g component Dashboard

> ng g component DataEntry

> ng g component Report

> ng g component PageNotFound --skip-import --inline-style --spec=false

You should now see 3 new folders under app directory. Create routing module

> ng g module appRouting --flat

Add following code to newly created file

app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entry', component: DataEntryComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
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
        <a class="nav-link"routerLink="/dashboard" routerLinkActive="active" >Dashboard </a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  routerLink="/entry" routerLinkActive="active">Data Entry</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/report" routerLinkActive="active">Report</a>
      </li>
    </ul>
  </div>
</nav>
```
# Objects in the Router Module

Object | Type | Description
------------ | ------------- | -------------
RouterModule | Module | a separate angular module that provides the necessary service providers and directives for navigating through application views.
Router | | displays the application component for the active urL. Manages navigation from one component to the next.
Routes | | defnes an array of routes, each mapping a urL path to a component.
Route | | defnes how the router should navigate to a component based on a urL pattern. Most routes consist of a path and a component type.
RouterOutlet | Directive | The directive (`<router-outlet>`) that marks where the router displays a view.
RouterLink | Directive | The directive for binding a clickable htML element to a route. Clicking an element with a RouterLink directive that’s bound to a string or a link parameters array triggers a navigation.
RouterLinkActive | Directive | The directive for adding/removing classes from an HTML element when an associated RouterLink contained on or inside the element becomes active/inactive.
ActivatedRoute | | A service that’s provided to each route component that contains route-specifc information such as route parameters, static data, resolve data, global query params, and the global fragment.
RouterState | | The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.

# Lazy Loading
Before we can lazy load a module, the feature area to lazy load must meet a few requirements. The feature area must be defined in its own feature module, that's because lazy loading loads all of the components declared in one specific Angular module. [Read More](https://angular.io/guide/lazy-loading-ngmodules)

Move DataEntry and Report to own feature module.

> ng g m dataEntry

> ng g m report

Add following code to `data-entry.module`
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryComponent } from './data-entry.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DataEntryComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    DataEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DataEntryModule { }
```
Here, we’re using an empty path because these will be the relative routes for this module, not for the entire application. Also, for the same reason, we use **RouterModule.forChild()** instead of forRoot().

However, our `app.module.ts` contains a reference to our `DataEntryComponent` and `ReportComponent`. We need to remove that or the DataEntryComponent will be downloaded with our other application files. We delete it here and delete the import statement for it here. 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
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

## Lazy-loading the new module
Now we need to go to `app-routing.module.ts` and create another route for our new LazyModule: we won’t specify any component! Instead, we’ll specify the path to the module, followed by the name of the module’s class with a hashtag. Also, we’ll use the special keyword loadChildren:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'entry',  loadChildren: './data-entry/data-entry.module#DataEntryModule' },
  { path: 'report', loadChildren: './report/report.module#ReportModule' },
  { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### References
- https://angularfirebase.com/lessons/how-to-lazy-load-components-in-angular-4-in-three-steps/
- https://angular.io/guide/lazy-loading-ngmodules
- https://medium.com/@michelestieven/lazy-loading-angular-modules-27856e940bb0
- [Angular Router - by Victor Savkin](https://www.amazon.com/Angular-Router-Victor-Savkin/dp/1787288900)
