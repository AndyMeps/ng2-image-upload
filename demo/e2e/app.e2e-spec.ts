import { Ng2ImageuploadDemoPage } from './app.po';

describe('ng2-imageupload-demo App', function() {
  let page: Ng2ImageuploadDemoPage;

  beforeEach(() => {
    page = new Ng2ImageuploadDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
