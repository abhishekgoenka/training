# Objective
1. Unit Testing continued 
2. Code coverage
3. End-to-End Testing
4. Package

# HTTP Testing
The `HttpClientTestingModule` is an Angular module that just configures a test backend for your HTTP request. You have to configure your test to import and use it, but then it just handles the request, and you don't really have to think about it much again. You will have a little more interaction with the `HttpTestingController` class. It creates mock HTTP requests for the requests made in your app, and includes methods that lets you specify the `HttpResponse` that should be returned by the mock request. You can write tests against the mock requests, as well as how your application code processed the response returned by the mock request. 

### Configure TestBed
data.service.spec.ts
```typescript
  let httpTestingController: HttpTestingController;
  let service: DataService;

  const mockData: Post[] = [
    { id: 1, userId: 1, title: 'dummy title 1', body: 'dummy body 1' },
    { id: 2, userId: 1, title: 'dummy title 2', body: 'dummy body 2' },
    { id: 3, userId: 2, title: 'dummy title 3', body: 'dummy body 3' },
  ];

beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });
```

### Test DataService
```typescript
 it('should be created', () => {
    expect(service).toBeTruthy();
  });
```

### Should return all the posts
```typescript
  it('should return all the posts', () => {
    service.posts().subscribe((posts: Post[]) => {
      expect(posts.length).toBe(3);
    });
    const postsRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/posts');

    // Back in my code, I'm going to test that the HTTP request made by
    // GET all posts used the GET HTTP verb.
    expect(postsRequest.request.method).toBe('GET');

    postsRequest.flush(mockData);

    // This tests that all HTTP requests have been handled,
    // and that there are none pending. If there were, then that would also cause the test to fail.
    httpTestingController.verify();
  });
```
We can also move `httpTestingController.verify();` method to `afterEach`, as it is required for all the tests.
```typescript
  afterEach(() => {
    httpTestingController.verify();
  });
```
**Todo** : Test other methods of DataService.

# Code Coverage
The final thing we're going to do is look at how to generate a code coverage report. Thankfully, because of the CLI, generating code coverage reports is fairly straightforward. Now you either need to have the CLI installed globally or you'll have to add an npm script to your package.json.
```json
"scripts": {
    "testauto": "ng test --watch=false --single-run=true --browsers=ChromeHeadless -cc true",
  },
```

# End-to-End Testing
`Protractor` is an official library to used for writing E2E test suites with an Angular app. It’s nothing but a wrapper over the Selenium WebDriverJS Api that translates its succinct code and methods to WebDriver JS methods. That said, you can use WebDriverJS methods too inside your e2e script.
![Image](https://github.com/abhishekgoenka/training/blob/master/angular/lab4/git/protectorjs.png)

### Writing the first Test Suite
All we need to be concerned about is this folder, `e2e`. `app.e2e-spec.ts` is the main entry file of our automation script.

app.e2e-spec.ts
```typescript
describe('my-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have right title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('MyProject');
  });
});
```
app.po.ts
```typescript
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }
}
```
Now, lets run our test suite using `npm run e2e`. __Don't forget to start the server before running test__.

The prominent components exported by Protractor API are listed below.
1. `browser()`: You should call `browser()` for all the browser-level operations such as navigation, debugging, etc. 
2. `element()`: This is used to look up an element in the DOM based on a search condition or a chain of conditions. It returns an ElementFinder object, and you can perform actions such as `getText()` or `click()` on them.
3. `element.all()`: This is used to look for an array of elements that match some chain of conditions. It returns an ElementArrayFinder object. All the actions that can be performed on ElementFinder can be performed on ElementArrayFinder also.
4. `locators`: Locators provide methods for finding an element in an Angular application. 

Since we will be using locators very often, here are some of the commonly used locators.
*. `by.css('selector-name')`: This is by far the commonly used locator for finding an element based on the name of the CSS selector.
*. `by.name('name-value')`: Locates an element with a matching value for the name attribute.
*. `by.buttonText('button-value')`: Locates a button element or an array of button elements based on the inner text. [Ref](https://code.tutsplus.com/tutorials/getting-started-with-end-to-end-testing-in-angular-using-protractor--cms-29318)

### Add Debugging support
```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "type": "node",
          "request": "launch",
          "name": "Run Protractor",
          "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
          "args": ["${workspaceRoot}/protractor.conf.js"]
      }
  ]
}
```

### New Test - should be on entry page
Let's add new test
entry.po.ts
```typescript
import { browser, by, element, promise } from 'protractor';
export class EntryPage {
  getCurrentUrl(): promise.Promise<string> {
    return browser.getCurrentUrl();
  }
}
```

Add new test
```typescript
describe('my-project App', () => {
  it('should be on entry page', () => {
    entry.getCurrentUrl().then(url => {
      expect(url).toContain('/entry');
    });
  });
});
```

### New Test - should add new record
```typescript
  it('should add new record', () => {
    entry.setValue('UserId', '1000').then(() => {
      entry.setValue('title', 'test title').then(() => {
        entry.setValue('body', 'test body').then(() => {
          entry.submitButton().click().then(() => {
            entry.successMsg().getText().then(msg => {
              browser.sleep(500).then(() => {
                expect(msg).toBe('Record saved');
              });
            });
          });
        });
      });
    });
  });
```
entry.po.ts
```typescript
  setValue(ele: string, val: string) {
    return element(by.id(ele)).sendKeys(val);
  }
  submitButton() {
    return element(by.className('btn btn-success'));
  }
  successMsg() {
    return element(by.className('toast toast-success'));
  }
```

# Package
`ng build` compiles the application into an output directory. The build artifacts will be stored in the `dist/` directory. [more](https://github.com/angular/angular-cli/wiki/build)
> npm run build
