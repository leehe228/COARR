var GLOBAL_SELECT_VISIT_DAY = "";
var GLOBAL_SELECT_RESTAURANT = "";
var GLOBAL_SELECT_RESTAURANT_ID = -1;

// 식당
let MEDIA_ROOT = "../websrc/"
var RESTAURANTS_LIST = ["0::밍글스::서울 강남구 도산대로67길 19 힙탑빌딩 2층::rest1.jpeg", "1::서울신라호텔 라연::서울 중구 동호로 249::rest2.jpeg", "2::온6.5::서울 종로구 북촌로1길 28 지상1층 온6.5::new_rest-1.png", "3::솔밤::서울 강남구 도산대로37길 6 4층::new_rest-2.png", "4::이속우화진::서울 강남구 영동대로 513::rest5.jpeg"];

// 레스토랑 저장 리스트
var REVIEW_SAVED_LIST = [0, 3, 5];
var MAGAZINE_SAVED_LIST = [];

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
    }
    ;
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
    } else if (n === 2) {
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
    let loading_page = document.getElementById('loading-page');

    // checkbox
    let cb = document.getElementById('review-cb');

    // lunch dinner radio button
    let r1 = document.getElementById('radio-lunch');
    let r2 = document.getElementById('radio-dinner');

    // text input
    let title_input = document.getElementById('title-input');
    let editor1 = document.getElementById('editor1');
    let editor2 = document.getElementById('editor2');

    if (title_input.value.trim() === '' || editor1.textContent.trim() === '' || editor2.textContent.trim() === '') {
        alert('내용을 모두 입력해주세요.');
        return;
    }

    if (r1.getAttribute('checked') === 'false' && r2.getAttribute('checked') === 'false') {
        alert('식사 시간을 선택해주세요.');
        return;
    }

    // 식당 선택
    if (GLOBAL_SELECT_RESTAURANT === "") {
        alert('방문 식당을 선택해주세요.');
        return;
    }

    // 날짜 선택 
    if (GLOBAL_SELECT_VISIT_DAY === "") {
        alert('방문 날짜를 선택해주세요.');
        return;
    }

    if (cb.getAttribute('checked') === 'false') {
        alert('어뷰징 리뷰 및 허위 광고가 아님을 확인해주세요');
        return;
    }

    loading_page.setAttribute('class', 'loading-page');

    // upload to server
    var jlist = new Array();

    var data = new Object();
    data.UID = 0;
    data.title = title_input.value.trim();
    data.content1 = editor1.innerHTML.trim();
    data.content2 = editor2.innerHTML.trim();
    data.content1_text = editor1.textContent.trim();
    data.content2_text = editor2.textContent.trim();
    data.RID = GLOBAL_SELECT_RESTAURANT_ID;
    data.RNAME = GLOBAL_SELECT_RESTAURANT;
    data.visit_date = GLOBAL_SELECT_VISIT_DAY;
    jlist.push(data);

    upload_data(JSON.stringify(jlist));
}

function upload_data(sdata) {
    let loading_page = document.getElementById('loading-page');
    console.log(sdata);
    try {
        fetch("http://beta.coarr.kro.kr:8080/api/upload_review", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            header: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            redirect: 'follow',
            referrer: 'no-referrer',
            body: sdata,
        }).then(response=>{
            console.log(response);
            loading_page.setAttribute('class', 'loading-page hide');
        }
        );
    } catch (error) {
        console.log(error);
        loading_page.setAttribute('class', 'loading-page hide');
        alert("리뷰 업로드에 실패했습니다. 네트워크를 확인해주세요.");
    }
    window.location.href = 'http://beta.coarr.kro.kr:8080/review_uploaded';
}

function backto(t) {
    console.log('http://beta.coarr.kro.kr:8080/' + t);
    window.location.href = 'http://beta.coarr.kro.kr:8080/' + t;
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
        set_calendar(-1);
    } else {
        rview.setAttribute('class', 'popup-view short hide');
    }
}

function select_rest(rid) {
    console.log(rid);
    let rname_text = document.getElementById('selected-restaurant-text');
    var rnames = ["밍글스", "서울신라호텔 라연", "온6.5", "솔밤", "이속우화진"];

    rname_text.textContent = rnames[rid];
    GLOBAL_SELECT_RESTAURANT = rnames[rid];
    GLOBAL_SELECT_RESTAURANT_ID = rid;
    open_restaurant_view(false);
}

function select_visitday(year, month, day) {

    var rtv = confirm("방문 날짜를 " + year + "년 " + month + "월 " + day + "일로 선택할까요?");

    if (rtv === false)
        return;

    console.log("select_visitday : " + year + ", " + month + ", " + day);
    open_calendar_view(false);

    let vdate_text = document.getElementById('selected-visitdate-text');

    let today = new Date();
    let today_year = today.getFullYear();
    let today_month = today.getMonth() + 1;
    let today_date = today.getDate();

    if (year === today_year && month === today_month && day === today_date) {
        vdate_text.textContent = "오늘";
    } else {
        vdate_text.textContent = year + "년 " + month + "월 " + day + "일";
    }

    GLOBAL_SELECT_VISIT_DAY = year + "-" + month + "-" + day;
}

function set_calendar(year, month) {
    var target_year;
    var target_month;

    // 오늘
    let today = new Date();
    let today_year = today.getFullYear();
    let today_month = today.getMonth() + 1;
    let today_date = today.getDate();

    if (year === -1 || month === -1) {
        target_year = today.getFullYear();
        target_month = today.getMonth() + 1;
    } else {
        target_year = year;
        target_month = month;
    }

    // 이번달 1일
    let t = new Date(target_year,target_month - 1,1);
    let t_day = t.getDay();

    // 달력 OOOO년 O월로 변경
    let month_title = document.getElementById('calendar-title');
    month_title.textContent = t.getFullYear() + "년 " + (t.getMonth() + 1) + "월";

    // 이전달 변경 버튼
    var before_month_button = document.getElementById('before-month-button');
    before_month_button.setAttribute('onclick', 'set_calendar(' + t.getFullYear() + ',' + t.getMonth() + ');');

    // 다음달 변경 버튼
    var next_month_button = document.getElementById('next-month-button');
    next_month_button.setAttribute('onclick', 'set_calendar(' + t.getFullYear() + ',' + (t.getMonth() + 1 + 1) + ');');

    // 이번달 마지막날
    let last_day = new Date(target_year,target_month,0).getDate();
    let last_day_weekday = new Date(target_year,target_month,0).getDay();

    // div
    let date_month = document.getElementById('date-month');

    date_month.innerHTML = "";

    // 요일 넣기
    var week_row = document.createElement('div');
    week_row.setAttribute('class', 'cal-row weekdays');

    let week_array = ['일', '월', '화', '수', '목', '금', '토'];
    for (let i = 0; i < 7; i++) {
        var da = document.createElement('a');
        da.textContent = week_array[i];
        if (i == 0) {
            da.setAttribute('class', 'sun');
        } else if (i == 6) {
            da.setAttribute('class', 'sat');
        }
        week_row.appendChild(da);
    }
    date_month.appendChild(week_row);

    // 1주차
    var first_row = document.createElement('div');
    first_row.setAttribute('id', 'cal-row-days-1');
    first_row.setAttribute('class', 'cal-row days');

    last_input = -1;

    // 첫주
    for (let i = 0; i < t_day; i++) {
        var da = document.createElement('a');
        first_row.appendChild(da);
    }
    for (let i = t_day; i < 7; i++) {
        var da = document.createElement('a');
        var this_day = (i - t_day) + 1;
        var temp = new Date(target_year,target_month - 1,this_day);
        da.textContent = this_day;
        var class_text = '';
        da.setAttribute('onclick', 'select_visitday(' + target_year + ',' + target_month + ',' + this_day + ');');

        if (today_year === target_year && today_month === target_month && today_date == this_day) {
            class_text += 'today';
        }

        if (temp - new Date() > 0) {
            class_text += ' future';
            da.removeAttribute('onclick');
        }

        da.setAttribute('class', class_text);
        first_row.appendChild(da);
        last_input = this_day;
    }
    date_month.appendChild(first_row);

    var last_input_day = -1;
    var this_row;
    var id_it = 2;
    // 나머지
    for (let i = last_input + 1; i <= last_day + (6 - last_day_weekday); i++) {
        var class_text = '';
        var temp = new Date(target_year,target_month - 1,i);
        var temp_day = temp.getDay();
        var temp_year = temp.getFullYear();
        var temp_month = temp.getMonth() + 1;
        var temp_date = temp.getDate();

        if (temp_day == 0) {
            this_row = document.createElement('div');
            this_row.setAttribute('class', 'cal-row days');
            this_row.setAttribute('id', 'cal-row-days-' + id_it);
        }

        var da = document.createElement('a');

        if (i <= last_day) {
            da.textContent = i;
            da.setAttribute('onclick', 'select_visitday(' + target_year + ',' + target_month + ',' + i + ');');

            if (today_year === target_year && today_month === target_month && today_date == i) {
                class_text += 'today';
            }

            if (temp - new Date() > 0) {
                class_text += ' future';
                da.removeAttribute('onclick');
            }
        }

        da.setAttribute('class', class_text);
        this_row.appendChild(da);

        if (temp_day == 6) {
            date_month.appendChild(this_row);
            id_it++;
        }
        last_input_day = temp_day;
    }

    if (last_input_day < 6) {
        date_month.appendChild(this_row);
    }
}

function search_filter() {
    let search_input = document.getElementById('restaurant-search-input');
    var keyword = search_input.value.trim();

    if (keyword === "") {
        var idx_list = [0, 1, 2, 3, 4];
        render_restaurants(idx_list);
    } else {
        var idx_list = [];
        for (let i = 0; i < RESTAURANTS_LIST.length; i++) {
            if (RESTAURANTS_LIST[i].indexOf(keyword) >= 0) {
                idx_list.push(i);
            }
        }
        render_restaurants(idx_list);
    }
}

function render_restaurants(idx_list) {
    let restaurant_view = document.getElementById('restaurant-list-view');
    restaurant_view.innerHTML = "";

    for (let i = 0; i < RESTAURANTS_LIST.length; i++) {
        if (idx_list.includes(i)) {
            var d = document.createElement('div');
            d.setAttribute('class', 'restaurant-block');
            d.setAttribute('onclick', 'select_rest(' + i + ');');

            var img_tag = document.createElement('img');
            img_tag.setAttribute('src', MEDIA_ROOT + RESTAURANTS_LIST[i].split('::')[3]);
            img_tag.setAttribute('alt', '');
            d.appendChild(img_tag);

            var d2 = document.createElement('div');
            d2.setAttribute('class', 'rb-text-block');

            var b_text = document.createElement('b');
            b_text.textContent = RESTAURANTS_LIST[i].split('::')[1];
            d2.appendChild(b_text);

            var a_text = document.createElement('a');
            a_text.textContent = RESTAURANTS_LIST[i].split('::')[2];
            d2.appendChild(a_text);

            d.appendChild(d2);
            restaurant_view.appendChild(d);
        }
    }
}

function switch_tab(from, to) {

    if (from === to) {
        window.location.reload();
    }

    // home tab
    if (to === 0) {
        location.href = "http://beta.coarr.kro.kr:8080/"
    }
    // restaurant tab
    else if (to === 1) {
        location.href = "http://beta.coarr.kro.kr:8080/restaurant"
    }
    // promotion tab
    else if (to === 2) {
        location.href = "http://beta.coarr.kro.kr:8080/promotion"
    }
    // user tab
    else if (to === 3) {
        location.href = "http://beta.coarr.kro.kr:8080/user"
    }
}

function switch_tabview(from, to) {
    console.log(from + ", " + to);
    // home 
    if (from === 0) {
        let restaurant_tabview_switch = document.getElementById('recomm-tabview-switch');
        let review_tabview_switch = document.getElementById('follow-tabview-switch');

        let recomm_page = document.getElementById('recomm-page-review');
        let follow_page = document.getElementById('follow-page-review');

        if (to === 0) {
            restaurant_tabview_switch.setAttribute('class', 'active');
            review_tabview_switch.removeAttribute('class');

            recomm_page.setAttribute('class', 'main-page');
            follow_page.setAttribute('class', 'main-page disabled');
        } else if (to === 1) {
            restaurant_tabview_switch.removeAttribute('class');
            review_tabview_switch.setAttribute('class', 'active');

            recomm_page.setAttribute('class', 'main-page disabled');
            follow_page.setAttribute('class', 'main-page');
        }
    }
    // restaurant
    else if (from === 1) {
        let restaurant_tabview_switch = document.getElementById('restaurant-tabview-switch');
        let review_tabview_switch = document.getElementById('review-tabview-switch');

        let restaurant_page = document.getElementById('restaurant-page-restaurant');
        let review_page = document.getElementById('restaurant-page-review');

        if (to === 0) {
            restaurant_tabview_switch.setAttribute('class', 'active');
            review_tabview_switch.removeAttribute('class');

            restaurant_page.setAttribute('class', 'main-page');
            review_page.setAttribute('class', 'main-page disabled');
            
        } else if (to === 1) {
            restaurant_tabview_switch.removeAttribute('class');
            review_tabview_switch.setAttribute('class', 'active');

            restaurant_page.setAttribute('class', 'main-page disabled');
            review_page.setAttribute('class', 'main-page');
        }
    }
    // promotion
    else if (from === 2) {
        if (to === 0) {
        } else if (to === 1) {
        }
    }
    // user
    else if (from === 3) {
        if (to === 0) {
        } else if (to === 1) {
        }
    }
}

function toggle_save(i) {
    var new_review_list = [];

    // 제거 
    if (REVIEW_SAVED_LIST.includes(i)) {
        var save_icon = document.getElementById('save-btn-' + i);
        save_icon.setAttribute('src', MEDIA_ROOT + 'not_saved_icon.png');

        for (let j = 0; j < REVIEW_SAVED_LIST.length; j++) {
            if (i === REVIEW_SAVED_LIST[j]) {
                // pass
            } else {
                new_review_list.push(REVIEW_SAVED_LIST[j]);
            }
        }
        REVIEW_SAVED_LIST = new_review_list;
    }

    // 추가
    else {
        REVIEW_SAVED_LIST.push(i);

        var save_icon = document.getElementById('save-btn-' + i);
        save_icon.setAttribute('src', MEDIA_ROOT + 'saved_icon.png');
    }
}

function toggle_magazine_save(i) {
    var new_magazine_list = [];

    // 제거 
    if (MAGAZINE_SAVED_LIST.includes(i)) {
        var save_icon = document.getElementById('mag-save-btn-' + i);
        save_icon.setAttribute('src', MEDIA_ROOT + 'not_saved_icon.png');

        for (let j = 0; j < MAGAZINE_SAVED_LIST.length; j++) {
            if (i === MAGAZINE_SAVED_LIST[j]) {
                // pass
            } else {
                new_magazine_list.push(MAGAZINE_SAVED_LIST[j]);
            }
        }
        MAGAZINE_SAVED_LIST = new_magazine_list;
    }

    // 추가
    else {
        MAGAZINE_SAVED_LIST.push(i);

        var save_icon = document.getElementById('mag-save-btn-' + i);
        save_icon.setAttribute('src', MEDIA_ROOT + 'saved_icon.png');
    }
}

function refresh() {
    window.location.reload();
}

function add_dummy(t, i) {
    console.log(t + ', ' + i);
    
    if (t === 'like') {
        let like_text = document.getElementById('review-like-' + i);
        like_text.textContent = parseInt(like_text.textContent) + 1;
    }

    else if (t ==='save') {
        let save_text = document.getElementById('review-saved-' + i);
        save_text.textContent = parseInt(save_text.textContent) + 1;
    }
}

var review_page_gray_flag = false;

function init_review_page() {
    document.getElementById("main-review-page").addEventListener("scroll", evt => {
        let review_title_back = document.getElementById('review-title-bar');
        let review_back_icon = document.getElementById('review-title-back-icon');
        
        // console.log(evt.target.scrollTop);

        if (evt.target.scrollTop > 510 && review_page_gray_flag === false) {
            review_title_back.setAttribute('class', 'bar-block-center gray-back');
            review_back_icon.setAttribute('src', MEDIA_ROOT + 'btn_back.png');
            review_page_gray_flag = true;
        }

        else if (evt.target.scrollTop < 510 && review_page_gray_flag === true) {
            review_title_back.setAttribute('class', 'bar-block-center');
            review_back_icon.setAttribute('src', MEDIA_ROOT + 'back_arrow_white.png');
            review_page_gray_flag = false;
        }
    });  
}

function set_data(data) {
    let main_view = document.getElementById('review-detail-main-view');

    var content = data.content;
    content = content.replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replaceAll('<br>', '\n');

    main_view.innerHTML = content;
}