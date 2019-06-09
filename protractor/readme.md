# Tools
* [Node.js](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Git](https://git-scm.com/download/win) - Not mandatory but good to have

# Setting-up a Development Environment
1. Download [Starter Kit](https://github.com/abhishekgoenka/training/blob/master/protractor/starter.zip)
2. Go to `starter` folder and run `npm i`. This will download all the npm dependencies.
3. `npm start`. This will start the application in browser. If you see below screen, it means everything is correct.

![starter](https://github.com/abhishekgoenka/training/blob/master/protractor/ref/images/starter.png)


# Writing Our First Test
The focus will be writing our first Protractor test. Writing a Protractor test is different than writing a unit test. The first area that we'll see a difference in is that we need a completed feature in order to write our Protractor test. It doesn't make much sense to write a Protractor test in the midst of development.

## Testing that the Page is Loaded
We're going to start with our Jasmine syntax just like we would with any other Jasmine tests. We're going to label this group of tests the Event List Details. The first situation we're going to tackle is describing when we click on an event. 

app.e2e-spec
```typescript
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should start with add post page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Add Post');
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

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}

```

