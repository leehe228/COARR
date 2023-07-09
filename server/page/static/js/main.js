function to_follow() {
    let recomm_page = document.getElementById('main-page-recommend');
    recomm_page.setAttribute('style', 'display: none;');

    let follow_page = document.getElementById('main-page-follow');
    follow_page.setAttribute('style', 'margin-top:90px; margin-bottom:72px;');

    // 
    let hline2 = document.getElementById('hline-right');
    hline2.setAttribute('style', 'background: #000;');

    let hline1 = document.getElementById('hline-left');
    hline1.removeAttribute('style');

    let htbutton1 = document.getElementById('header-text-b1');
    htbutton1.setAttribute('src', './websrc/follow-h1.png');

    let htbutton2 = document.getElementById('header-text-b2');
    htbutton2.setAttribute('src', './websrc/follow-h2.png');
}

function to_recomm() {
    let recomm_page = document.getElementById('main-page-recommend');
    recomm_page.setAttribute('style', 'margin-top:90px; margin-bottom:72px;');

    let follow_page = document.getElementById('main-page-follow');
    follow_page.setAttribute('style', 'display: none;');

    // 
    let hline1 = document.getElementById('hline-left');
    hline1.setAttribute('style', 'background: #000;');
    
    let hline2 = document.getElementById('hline-right');
    hline2.removeAttribute('style');

    let htbutton1 = document.getElementById('header-text-b1');
    htbutton1.setAttribute('src', './websrc/home-h1.png');

    let htbutton2 = document.getElementById('header-text-b2');
    htbutton2.setAttribute('src', './websrc/home-h2.png');
}