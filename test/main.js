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
    
    if (n == 1) {
        r1.setAttribute('class', 'radio-button r-active');
        r2.setAttribute('class', 'radio-button');
        
        r1.removeAttribute('style');
        r2.removeAttribute('style');

        r1.setAttribute('checked', 'true');
        r2.setAttribute('checked', 'false');
    }
    else if (n == 2) {
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
    
    if (o == true) {
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

    if (title_input.textContent.trim() == '' || editor1.textContent.trim() == '' || editor2.textContent.trim() == '') {
        alert('내용을 모두 입력해주세요.');
        return;
    }

    if (r1.getAttribute('checked') == 'false' && r2.getAttribute('checked') == 'false') {
        alert('식사 시간을 선택해주세요.');
        return;
    }
    
    if (cb.getAttribute('checked') == 'false') {
        alert('어뷰징 리뷰 및 허위 광고가 아님을 확인해주세요');
        return;
    }

    // upload to server
    
}