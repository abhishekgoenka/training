import { AppPage } from './po/app.po';

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
