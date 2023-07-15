let loading_page = document.getElementById('loading-page');

function to_follow() {
    let recomm_page = document.getElementById('main-page-recommend');
    let follow_page = document.getElementById('main-page-follow');
    let hline2 = document.getElementById('hline-right');
    let hline1 = document.getElementById('hline-left');
    let htbutton1 = document.getElementById('header-button-h1');
    let htbutton2 = document.getElementById('header-button-h2');

    recomm_page.setAttribute('style', 'display: none;');
    follow_page.setAttribute('style', 'margin-top:90px; margin-bottom:72px;');
    hline2.setAttribute('style', 'background: #000;');
    hline1.removeAttribute('style');
    htbutton1.setAttribute('class', 'header-button-disable pointer');
    htbutton2.setAttribute('class', 'header-button pointer');
}

function to_recomm() {
    let recomm_page = document.getElementById('main-page-recommend');
    let follow_page = document.getElementById('main-page-follow');
    let hline1 = document.getElementById('hline-left');
    let hline2 = document.getElementById('hline-right');
    let htbutton1 = document.getElementById('header-button-h1');
    let htbutton2 = document.getElementById('header-button-h2');

    recomm_page.setAttribute('style', 'margin-top:90px; margin-bottom:72px;');
    follow_page.setAttribute('style', 'display: none;');
    hline1.setAttribute('style', 'background: #000;');
    hline2.removeAttribute('style');
    htbutton1.setAttribute('class', 'header-button pointer');
    htbutton2.setAttribute('class', 'header-button-disable pointer');
}

function cb_check(o) {
    let cb = document.getElementById('review-cb');
    if (o == true) {
        // on
        cb.setAttribute('checked', 'true');
        cb.setAttribute('onclick', 'cb_check(false);');
        cb.setAttribute('class', 'cb checked');
    } else {
        // off
        cb.setAttribute('checked', 'false');
        cb.setAttribute('onclick', 'cb_check(true);');
        cb.setAttribute('class', 'cb');
    };
}

function radio_check(n) {
    let r1 = document.getElementById('radio-lunch');
    let r2 = document.getElementById('radio-dinner');

    if (n === 1) {
        r1.setAttribute('class', 'radio-button r-active');
        r2.setAttribute('class', 'radio-button');

        r1.removeAttribute('style');
        r2.removeAttribute('style');

        r1.setAttribute('checked', 'true');
        r2.setAttribute('checked', 'false');
    }
    else if (n === 2) {
        r1.setAttribute('class', 'radio-button');
        r2.setAttribute('class', 'radio-button r-active');

        r1.setAttribute('style', 'border-right: 1px solid #A21E31;');
        r2.setAttribute('style', 'border-left: 1px solid #0000;');

        r1.setAttribute('checked', 'false');
        r2.setAttribute('checked', 'true');
    } else {
        r1.setAttribute('class', 'radio-button');
        r2.setAttribute('class', 'radio-button');

        r1.removeAttribute('style');
        r2.removeAttribute('style');

        r1.setAttribute('checked', 'false');
        r2.setAttribute('checked', 'false');
    }
}

function stylebar(o) {
    let sb = document.getElementById('tool-style-btn');
    let style_bar = document.getElementById('editor-menubar');

    if (o === true) {
        // open
        style_bar.setAttribute('style', 'border-top: #0000;');
        sb.setAttribute('onclick', 'stylebar(false)');
    } else {
        // close
        style_bar.setAttribute('style', 'border-top: #0000; display: none;');
        sb.setAttribute('onclick', 'stylebar(true)');
    }
}

function upload_review() {
    // checkbox
    let cb = document.getElementById('review-cb');

    // lunch dinner radio button
    let r1 = document.getElementById('radio-lunch');
    let r2 = document.getElementById('radio-dinner');

    // text input
    let title_input = document.getElementById('title-input');
    let editor1 = document.getElementById('editor1');
    let editor2 = document.getElementById('editor2');

    // 식당
    let restaurant_input = document.getElementById('restaurant-name-text');

    // 방문일자
    let visit_date_input = document.getElementById('visit-date-text');

    // test

    if (title_input.value.trim() === '' || editor1.textContent.trim() === '' || editor2.textContent.trim() === '') {
        alert('내용을 모두 입력해주세요.');
        return;
    }

    if (r1.getAttribute('checked') === 'false' && r2.getAttribute('checked') === 'false') {
        alert('식사 시간을 선택해주세요.');
        return;
    }

    if (cb.getAttribute('checked') === 'false') {
        alert('어뷰징 리뷰 및 허위 광고가 아님을 확인해주세요');
        return;
    }

    //loading_page.removeAttribute('style');

    // upload to server
    var jlist = new Array();

    var data = new Object();
    data.UID = 0;
    data.title = title_input.value.trim();
    data.content1 = editor1.innerHTML.trim();
    data.content2 = editor2.textContent.trim();
    data.RID = 0;
    data.visit_date = Date.now();
    jlist.push(data);

    upload_data(JSON.stringify(jlist));
}

function upload_data(sdata) {
    console.log(sdata);
    fetch("http://158.247.251.57:5000/api/upload_review", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        header: {'Content-Type': 'application/json'},
        credentials : 'same-origin',
        redirect : 'follow',
        referrer : 'no-referrer',
        body: sdata,
    }).then(response => {
        console.log(response);
        //loading_page.setAttribute('style', 'display: none;');
        window.location.href = 'http://beta.coarr.kro.kr:5000/review_uploaded';
    });
}

function backto(t) {
    console.log('http://beta.coarr.kro.kr:5000/' + t);
    window.location.href = 'http://beta.coarr.kro.kr:5000/' + t;
}

function open_restaurant_view(t) {
    let rview = document.getElementById('restaurant-view');

    if (t === true) {
        rview.setAttribute('class', 'popup-view long');
    } else {
        rview.setAttribute('class', 'popup-view long hide');
    }
}

function open_calendar_view(t) {
    let rview = document.getElementById('calendar-view');

    if (t === true) {
        rview.setAttribute('class', 'popup-view short');
    } else {
        rview.setAttribute('class', 'popup-view short hide');
    }
}

function select_rest(rid) {
    console.log(rid);
    let rname_text = document.getElementById('selected-restaurant-text');
    var rnames = ["밍글스", "서울신라호텔 라연", "온6.5", "솔밤", "이속우화진"];

    rname_text.textContent = rnames[rid];
    open_restaurant_view(false);
}
