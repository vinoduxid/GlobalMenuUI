/* 
    
    Savage Menu 
    Version 1.0

*/

"use strict";
var savageclose = document.getElementById('sv-menu-control'),
    svmenubox = document.getElementById('sv-menu-box'),
    svuserbox = document.getElementById('sv-welcomeusr'),
    savageMenuSlider = document.getElementById('savage-header-bar'),
    quicklinkbar = document.getElementById('sv-quicklink-bar'),
    svQuickLink = document.getElementById('sv-quicklink'),
    svmenuslider = document.getElementById('sv-menu-slider'),
    svusrctrl = document.getElementById('sv-user-control'),
    menudropdown = document.querySelectorAll('.sv-menu-dropbox'),
    tiledropdown = document.querySelectorAll('.sv-tile-drop'),
    tilegroup = document.getElementById('sv-menu-tilegroup'), 
    tileMenu = document.querySelectorAll('.sv-menu-tile'),
    tileItem = document.querySelectorAll('.sv-menu-subgroup');

//Burger Menu event
savageclose.addEventListener('click', function () {
    console.log(this.classList.contains('back'));
    if (!this.classList.contains('back')) {
        this.classList.toggle('open');
        savageMenuSlider.classList.toggle('open');
        quicklinkbar.classList.remove('open');
        svQuickLink.classList.toggle('off');
        document.body.classList.toggle('scrolloff');
        svQuickLink.classList.remove('on');
        tileMenus();
    } else {
        this.classList.remove('back');
        tilegroup.style.left = 0;
        this.setAttribute('data-label', 'Menu');
        for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); }
    }
});

//user control dropdown
svuserbox.addEventListener('click', function (event) {
    this.classList.toggle('open');
});

//quick link
svQuickLink.addEventListener('click', function () {
    quicklinkbar.classList.toggle('open');
    this.classList.toggle('on');
});

//Close the user control dropdown menu if the user clicks outside of it
document.onclick = function (event) {
    if (!event.target.matches('.sv-welcomeusr')) {
        //console.log(event.target);
        menudropdown.forEach(function (openDropdown) {
            svuserbox.classList.contains('open') && svuserbox.classList.remove('open');
        });
    }
};

//dropdown desktop positions
function tileMenus() {
    for (var i = 0; i < tileItem.length; i++) {
        //var divOffset = tilePos(tileMenu[i]),
        var divOffset = tileItem[i].getBoundingClientRect(),
        divofLeft = divOffset.left, divofTop = divOffset.top, divofWidth = divOffset.width, divofHeight = divOffset.height;
        var childElm = tileItem[i].querySelector('.sv-menu-dropbox');
        childElm.style.left = divofLeft + (childElm.clientWidth / 2) + 'px';
        childElm.style.top = divofTop + 30 + 'px';
        console.log(childElm.clientWidth);
        //tileDrop(divofLeft, divofTop);
    }
    
}
//function tileDrop(divofLeft, divofTop) {
//    console.log('after:'+divofLeft, divofTop);
//    for (var i = 0; i < tiledropdown.length; i++) {
//        tiledropdown[i].style.left = divofLeft + 'px';
//        tiledropdown[i].style.top = divofTop + 'px';
//    }
//}
//Finding Tile Offsets
/*function tilePos(tileMenu) {    
    var rect = tileMenu.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width }    
}*/

//Knowing Events for Mobile and Desktop
var touchevent = '';

//Responsive events
var onResizing = function (event) {
    var winW = window.innerWidth;
    if (winW <= 767) {
        tilegroup.appendChild(svuserbox);
        tilegroup.style.width = winW;
        touchevent = 'click';
    } else {
        svusrctrl.insertBefore(svuserbox, svusrctrl.childNodes[0]);
        touchevent = 'mouseover';
    }
 
    menuevents(touchevent);
}
window.onload = onResizing
window.onresize = onResizing;

function menuevents(touchevent) {
    if (touchevent == "click") {//mobile
        for (var i = 0; i < tileItem.length; i++) {
            tileItem[i].removeEventListener("mouseover mouseout", hideTile);
            tileItem[i].addEventListener("click", slideTile, false);
        }
    } else {
        for (var i = 0; i < tileItem.length; i++) { //desktop
            tileItem[i].removeEventListener("click", hideTile);
            tileItem[i].addEventListener("mouseover", showTile, false);
            tileItem[i].addEventListener("mouseout", hideTile, false);
        }
    }
}

function showTile(e) {    
    this.classList.add("open");
    this.parentElement.style.left = 0;
    var childElm = this.children.length; console.log(childElm);    
}
function slideTile(e) {
    var dataLabel = this.querySelectorAll('[data-label]');   
    this.classList.add("open");
    var winW = window.innerWidth;
    savageclose.classList.add('back');
    savageclose.setAttribute('data-label', dataLabel[0].getAttribute('data-label'));
    this.parentElement.style.left = -window.innerWidth + 'px';
}
function hideTile(e) {    
    this.parentElement.style.left = 0;
    this.classList.remove("open");
}
