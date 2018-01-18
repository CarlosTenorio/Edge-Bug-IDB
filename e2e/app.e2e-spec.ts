import { EdgeBugIDBPage } from './app.po';

describe('edge-bug-idb App', () => {
  let page: EdgeBugIDBPage;

  beforeEach(() => {
    page = new EdgeBugIDBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
