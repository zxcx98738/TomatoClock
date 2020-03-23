import $ from 'jquery';

function closeToggleView(){
    $('#main').removeClass('toggle-view toggle-#analysis toggle-#todolist');
}

function openToggleView(hash){
    closeToggleView();
    if(hash == '#analysis' || hash == '#todolist'){
        $('#main').addClass(`toggle-view toggle-${hash}`);
    }
}

function handleHashChnage(){
    let hash = location.hash;
    openToggleView(hash);
}

function init(){
    handleHashChnage();
    window.onhashchange = handleHashChnage;
    $('#tomato').click(closeToggleView);
}

export {
    init,
    openToggleView,
    closeToggleView
};