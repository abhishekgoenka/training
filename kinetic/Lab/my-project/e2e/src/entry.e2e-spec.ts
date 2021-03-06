import { EntryPage } from './entry.po';
import { browser } from 'protractor';

describe('my-project App', () => {
  let entry: EntryPage;

  beforeEach(() => {
    entry = new EntryPage();
  });
  it('should be on entry page', () => {
    entry.getCurrentUrl().then(url => {
      expect(url).toContain('/entry');
    });
  });

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
});
