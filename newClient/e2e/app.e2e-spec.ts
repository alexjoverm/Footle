import { NewClientPage } from './app.po';

describe('new-client App', function() {
  let page: NewClientPage;

  beforeEach(() => {
    page = new NewClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
