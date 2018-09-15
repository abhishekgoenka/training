import { browser, by, element, promise } from 'protractor';
export class EntryPage {
  getCurrentUrl(): promise.Promise<string> {
    return browser.getCurrentUrl();
  }

  setValue(ele: string, val: string) {
    return element(by.id(ele)).sendKeys(val);
  }
  submitButton() {
    return element(by.className('btn btn-success'));
  }
  successMsg() {
    return element(by.className('toast toast-success'));
  }
}
