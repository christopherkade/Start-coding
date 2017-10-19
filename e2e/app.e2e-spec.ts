import { StartCodingPage } from './app.po';

describe('start-coding App', () => {
  let page: StartCodingPage;

  beforeEach(() => {
    page = new StartCodingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
