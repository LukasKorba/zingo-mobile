const { log, device, by, element } = require('detox');

describe('Example', () => {

  it('Checkbox send screen -> include UA in memo field', async () => {
    await element(by.id('loadingapp.restorewalletseed')).tap();
    await element(by.id('seed.seedplaceholder')).replaceText(
      'lottery multiply patient simple ivory leisure swift square west despair beauty match crowd margin reject box always title photo remind word diet ecology badge',
    );
    await element(by.id('birthdayinput')).replaceText('1985000');
    await element(by.text('RESTORE WALLET')).tap();

    await element(by.text('SEND')).tap();
    await element(by.id('send.addressplaceholder')).replaceText(
      'u1lx7nlnqqqs7p4hcqz4hyjgnw7h8zskcgr2f8dfhm96np0gnfdzu7jtms7q2pxd7ufy96wxzdsdy65jvp3td7fj2ltcz0jpak86ddyszl9ykn5s86q3xataya5867z3tj2x8cw0ljyrenymr2gcqmjf50gmexqj233yn3kdaxn2yukwcx87emurufakf82wapgnu5h3fvae6aw9uus2r',
    );
    await element(by.id('send.amount')).replaceText('0');
    await element(by.id('send.checkboxUA')).tap();
    await element(by.id('send.button')).tap();
    const memo = element(by.id('send.confirm-memo'));

    log.info('Text:', memo.text);

    await expect(memo).toBeVisible();
    await expect(memo).toHaveText(
      'Reply to: \nu1lx7nlnqqqs7p4hcqz4hyjgnw7h8zskcgr2f8dfhm96np0gnfdzu7jtms7q2pxd7ufy96wxzdsdy65jvp3td7fj2ltcz0jpak86ddyszl9ykn5s86q3xataya5867z3tj2x8cw0ljyrenymr2gcqmjf50gmexqj233yn3kdaxn2yukwcx87emurufakf82wapgnu5h3fvae6aw9uus2r',
    );
  });
});
