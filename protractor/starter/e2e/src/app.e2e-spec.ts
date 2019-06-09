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
