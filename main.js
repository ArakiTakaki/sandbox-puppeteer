const puppeteer = require('puppeteer');
const userMeta = require('./meta');

const tweet = async text =>{
  const browser = await puppeteer.launch({
    arg: ['--lang=ja,en-US,en'], //日本語化する
    headless: true // デフォルトは true  true: ブラウザが開かない false: ブラウザが開く
  });

  // 新しいページを作成する。
  const page = await browser.newPage();

  // headlessモードだと必要ない
  await page.setViewport({width:720, height: 600});

  await page.goto('https://twitter.com/Araki_t_t');

  await page.waitFor(2000);

  // twitter id 入力
  await page.type(
    "#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-username > input",
    userMeta.userID
  );
  // twitter password 入力
  await page.type(
    "#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-password > input",
    userMeta.password
  );

  // ログインボタンクリック
  await page.click(
    "#signin-dropdown > div.signin-dialog-body > form > input.EdgeButton.EdgeButton--primary.EdgeButton--medium.submit.js-submit"
  );

  // ページ遷移するの待つ
  await page.waitFor("#global-new-tweet-button", {timeout: 5000});

  // ツイートボタンclick
  await page.click("#global-new-tweet-button");

  await page.waitFor(1000);

  // textareaにツイート本文打ち込む
  await page.type(
    "#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.tweet-content > div.RichEditor.RichEditor--emojiPicker.is-fakeFocus > div.RichEditor-container.u-borderRadiusInherit > div.RichEditor-scrollContainer.u-borderRadiusInherit > div.tweet-box.rich-editor.is-showPlaceholder",
    text
  );

  // 打ち込みを待つ
  await page.waitFor(1000);

  // ツイートするボタン
  await page.click(
    "#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.TweetBoxToolbar > div.TweetBoxToolbar-tweetButton > span > button.SendTweetsButton.EdgeButton.EdgeButton--primary.EdgeButton--medium.js-send-tweets"
  );

  // ツイートするの待つ
  await page.waitFor(6000);

  // 終わり
  await browser.close();
};

tweet('test text aieuo');
