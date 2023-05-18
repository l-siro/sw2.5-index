
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
const bookContainer = document.getElementById('bookContainer');

// データをローカルストレージから取得
fetch('books.json') // あなたのJSONデータのURLをここに書きます
    .then(response => response.json())
    .then(books => {
  // データをDOMに描画
  books.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('word-item');

      const h2 = document.createElement('h2');
      h2.classList.add('word-item__ttl');
      h2.innerText = book.heading;

      const divTitle = document.createElement('div');
      divTitle.classList.add('word-item__book');
      divTitle.innerText = book.title;

      const divPages = document.createElement('div');
      divPages.classList.add('word-item__pages');
      divPages.innerHTML = 'ページ: <span>' + book.pages.join('. ') + '</span>';

      const divTags = document.createElement('div');
      divTags.classList.add('word-item__tags');
      divTags.innerHTML = 'タグ: <span>' + book.tags.join('. ') + '</span>';

      const divKindle = document.createElement('div');
      divKindle.classList.add('word-item__kindle');
      divKindle.innerHTML = '<a href="kindle://book?action=open' + book.kindle + '">Kindle</a>';

      div.appendChild(h2);
      div.appendChild(divTitle);
      div.appendChild(divPages);
      div.appendChild(divTags);
      div.appendChild(divKindle);

      bookContainer.appendChild(div);
  });

// 検索機能を設定
input.addEventListener('keyup', function() {
    // 入力されたクエリを半角スペースと全角スペースで分割
    const queries = this.value.toLowerCase().split(/[\s　]+/);

    Array.from(bookContainer.getElementsByClassName('word-item')).forEach(book => {
        const heading = book.getElementsByClassName('word-item__ttl')[0].innerText.toLowerCase();
        const title = book.getElementsByClassName('word-item__book')[0].innerText.toLowerCase();
        const pages = book.getElementsByClassName('word-item__pages')[0].innerText.toLowerCase();
        const tags = book.getElementsByClassName('word-item__tags')[0].innerText.toLowerCase();
        const kindle = book.getElementsByClassName('word-item__kindle')[0].innerText.toLowerCase();

        const bookData = heading + ' ' + title + ' ' + pages + ' ' + tags + ' ' + kindle;

        if (queries.every(query => bookData.includes(query))) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
});
});