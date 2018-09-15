# Objective
1. Understand Kinetic Components
2. Migrate Angular6 project to Kinetic

# Install Kinetic
Open the terminal install the Kinetic Framework dependency via npm. 
> npm install @epicor/kinetic --save

Create a sysconfig.json file in the /src directory of the application. This is the primary Kinetic configuration file for the application features.

Add the following line into the `projects/my-project/architect/build/options/assets` section of the angular.json file. 
```json
"assets": [
              "src/sysconfig.json",
              { "glob": "**/*", "input": "./node_modules/@epicor/kinetic/assets/", "output": "/assets/" }
            ],
```

Add the following lines into the `projects/my-project/architect/build/options/styles` section of the angular.json file. 
```json
"node_modules/@epicor/kinetic/epicor-kinetic.min.css",
```

Start by importing the `EpCoreModule` and `BrowserAnimationsModule` in the app.module.ts file. 
```typescript
import { EpCoreModule } from '@epicor/kinetic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    EpCoreModule
  ],
})
export class AppModule { }
```

Next, use the EpAppRoot component inside of your app.component.html file. Replace all of the contents in this file inside `<ep-app-root>`.
```html
<ep-app-root>
  ...
  ...
  <main role="main" class="container">
      <router-outlet></router-outlet>
  </main>
</ep-app-root>
``` 

Next, import the `IEpViewModel` into your `./data-entry/data-entry.component.ts` and `./report/report.component.ts` file, and implement a property called viewModel that implements the IEpViewModel interface. 
```typescript
  viewModel: IEpViewModel = {
    navbar: {
      title: 'Data Entry'
    }
  };
```

Next, move all the contents of `data-entry.component.ts` and `report.component.ts` file inside `<ep-view>` element. 
```html
<ep-view [model]="viewModel">
  <h1>Add Post</h1>
  <form #postForm="ngForm" (ngSubmit)="onSubmit()">
    ...
    ...
  </form>
</ep-view>
```

# Change DataEntry component controls to Kinetic
Replace all the `textbox` with `ep-text-box` and `button` with `ep-button`
```html
<ep-view [model]="viewModel">
  <h1>Add Post</h1>
  <form #postForm="ngForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <ep-text-box type="text" labelText="UserId" id="UserId" name="UserId" required [(ngModel)] = "data.userId" #UserId="ngModel"></ep-text-box>
      <div [hidden]="UserId.valid || UserId.pristine " class="alert alert-danger">
        User Id is required
      </div>
    </div>
    <div class="form-group">
      <ep-text-box type="text" labelText="Title" id="title" name="title" required  [(ngModel)] = "data.title" #Title="ngModel"></ep-text-box>
      <div [hidden]="Title.valid || Title.pristine" class="alert alert-danger">
        Title is required
      </div>
    </div>
    <div class="form-group">
        <ep-text-area  maxLength="256" rows="5" cols="80" labelText="Body" id="body" name="body" rows="5" [(ngModel)] = "data.body"></ep-text-area>
    </div>
    <ep-button type="submit" [primary]="true" [disabled]="!postForm.form.valid">Submit</ep-button>
  </form>
  <ep-button (onclick)="navigateToReport()" [primary]="false" class="btn-block">Navigate to Report</ep-button>
</ep-view>
```
```typescript
  navigateToReport() {
    this.router.navigate(['report']);
  }
```

Use Kinetic's `EpToast` component service of `toast` service 
```typescript
import { Injectable } from '@angular/core';
import { EpToastService } from '@epicor/kinetic';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(public epToast: EpToastService) {}

  success(msg: string) {
    this.toastr(msg, 'success');
  }

  error(msg: string) {
    this.toastr(msg, 'error');
  }

  private toastr(msg: string, toastType: string) {
    const tstConfig = {
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000,
      extendedTimeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true
    };
    const toastOpt = {
      message: `<p><a href="#"><b><u> Click here </u></b></a>${msg}</p>`,
      title: toastType,
      toastConfig: tstConfig,
      toastType: toastType
    };
    this.epToast.show(toastOpt);
  }
}
```