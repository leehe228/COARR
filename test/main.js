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