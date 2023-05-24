document.body.style.display = 'none';
window.onload = function() {
  var UserInput = null;

  var cookies = document.cookie;
  var cookiesArray = cookies.split(';');
  var mi = 'ZnV3YWZ1d2FPbXVyYWlzdQ==';

  for(var c of cookiesArray){
    var cArray = c.split('=');
    if(cArray[0].indexOf('cruw-basic') > -1){
      UserInput = decodeURIComponent(cArray[1]);
    }
  }
  if(!(UserInput && UserInput == window.atob(mi))){
    UserInput = prompt("パスワードを入力して下さい:","");
  }

  if(UserInput != window.atob(mi)){
    document.body.innerHTML = "403 Forbidden";
  }else{
    var now = new Date();
    now.setMinutes(now.getMinutes() + 60*24*3);
    document.cookie = "cruw-basic=" + encodeURIComponent(UserInput) + ";expires=" + now.toUTCString()+"; path=/;";
  }
  document.body.style.display = null;
}


//update-logの開閉処理
const updateLogTtl = document.getElementsByClassName('update-log__ttl');
const updateLogBody = document.getElementsByClassName('update-log__body');

for (let i = 0; i < updateLogTtl.length; i++) {
  updateLogTtl[i].addEventListener('click', function() {
    updateLogBody[i].classList.toggle('is-open');
  });
}



const input = document.getElementById('searchInput');
const dataContainer = document.getElementById('dataContainer');

// データをローカルストレージから取得
fetch('datas.json') // あなたのJSONデータのURLをここに書きます
  .then(response => response.json())
  .then(datas => {
    // データをDOMに描画
    datas.forEach(data => {
      const div = document.createElement('div');
      div.classList.add('word-item');

      const h2 = document.createElement('h2');
      h2.classList.add('word-item__ttl');
      h2.innerText = data.heading;
      div.appendChild(h2);

      // booksをループする
      data.books.forEach(book => {
        let bookContent;
        if (book.title === 'SW2.5 ルールブックⅠ') {
          bookContent = '<img class="icon" src="img/251.svg">&nbsp;';
        } else if (book.title === 'SW2.5 ルールブックⅡ') {
          bookContent = '<img class="icon" src="img/252.svg">&nbsp;';
        } else if (book.title === 'SW2.5 ルールブックⅢ') {
          bookContent = '<img class="icon" src="img/253.svg">&nbsp;';
        } else {
          bookContent = '<span class="ttl">'+ book.title + '...</span>';
        }

        const divPages = document.createElement('div');
        divPages.classList.add('word-item__pages');
        divPages.innerHTML = bookContent + ' <span>' + book.pages.join('. ') + '</span>';
        div.appendChild(divPages);
      });

      const divTags = document.createElement('div');
      divTags.classList.add('word-item__tags');
      divTags.innerHTML = 'タグ: <span>' + data.tags.join('. ') + '</span>';
      div.appendChild(divTags);

      const divKindle = document.createElement('div');
      divKindle.classList.add('word-item__kindle');
      divKindle.innerHTML = '<a href="kindle://book?action=open' + data.kindle + '">Kindle</a>';
      div.appendChild(divKindle);

      dataContainer.appendChild(div);
    });

  // 検索機能を設定
  input.addEventListener('keyup', function() {
    // 入力されたクエリを半角スペースと全角スペースで分割
    const queries = this.value.toLowerCase().split(/[\s　]+/);

    Array.from(dataContainer.getElementsByClassName('word-item')).forEach(data => {
      const heading = data.getElementsByClassName('word-item__ttl')[0].innerText.toLowerCase();
      const pages = data.getElementsByClassName('word-item__pages')[0].innerText.toLowerCase();
      const tags = data.getElementsByClassName('word-item__tags')[0].innerText.toLowerCase();
      const kindle = data.getElementsByClassName('word-item__kindle')[0].innerText.toLowerCase();

      const dataData = heading + ' ' + pages + ' ' + tags + ' ' + kindle;

      if (queries.every(query => dataData.includes(query))) {
          data.style.display = 'block';
      } else {
          data.style.display = 'none';
      }
    });
  });
});