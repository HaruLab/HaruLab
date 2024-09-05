fetch("header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);

fetch("works_grit.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#works_grit").innerHTML = data);

    fetch("head.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#head").innerHTML = data);


// サイドメニューを開く
document.getElementById("menu-toggle").addEventListener("click", function() {
    var sidebarMenu = document.getElementById("sidebar-menu");
    sidebarMenu.style.left = "0";
    sidebarMenu.classList.add('open');

    // アイテムに遅延を付けて表示
    var items = sidebarMenu.querySelectorAll('.nav-items li, .social-items li, .info-items li');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 40); // 40msごとに遅延
    });
});

// サイドメニューを閉じる
document.getElementById("close-menu").addEventListener("click", function() {
    var sidebarMenu = document.getElementById("sidebar-menu");
    sidebarMenu.style.left = "-100%";
    sidebarMenu.classList.remove('open');

    // アイテムのアニメーションをリセット
    var items = sidebarMenu.querySelectorAll('.nav-items li, .social-items li, .info-items li');
    items.forEach((item) => {
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
    });
});

document.getElementById("arrow-container").addEventListener("click", function() {
    var sidebarMenu = document.getElementById("sidebar-menu");
    sidebarMenu.style.left = "-100%";
    sidebarMenu.classList.remove('open');

    // アイテムのアニメーションをリセット
    var items = sidebarMenu.querySelectorAll('.nav-items li, .social-items li, .info-items li');
    items.forEach((item) => {
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
    });
});


// メニューのトグル表示
function toggleMenu() {
    var menuLinks = document.getElementById('menuLinks');
    if (menuLinks.style.maxHeight) {
        menuLinks.style.maxHeight = null;
        var items = document.getElementsByClassName('menu-item');
        for (var i = 0; i < items.length; i++) {
            items[i].style.opacity = 0;
            items[i].style.transform = 'translateY(-30%)';
        }
    } else {
        menuLinks.style.maxHeight = menuLinks.scrollHeight + "px";
        var items = document.getElementsByClassName('menu-item');
        for (var i = 0; i < items.length; i++) {
            (function(index) {
                setTimeout(function() {
                    items[index].style.opacity = 1;
                    items[index].style.transform = 'translateX(0)';
                }, 40 * index);
            })(i);
        }
    }
}

// カードのフィルタリング
function filterCards(category) {
    var cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        if (category === 'all' || cards[i].classList.contains(category)) {
            cards[i].style.display = 'block';
            cards[i].style.opacity = 1;
        } else {
            cards[i].style.display = 'none';
            cards[i].style.opacity = 0;
        }
    }
}

// モーダルを開く
function openModal(videoSrc, details) {
    document.getElementById('modalVideo').src = videoSrc;
    document.getElementById('videoDetails').innerText = details;
    document.getElementById('myModal').style.display = 'block';
}

// モーダルを閉じる
function closeModal() {
    document.getElementById('modalVideo').src = '';
    document.getElementById('myModal').style.display = 'none';
}

// 初期状態で全てのカードを表示
filterCards('all');

// メニューの固定
var menu = document.querySelector('.menu');
var menuOffset = menu.offsetTop;

window.addEventListener('scroll', function() {
    if (window.pageYOffset > menuOffset) {
        menu.style.position = 'fixed';
        menu.style.zIndex = '100'; // 他の要素より手前に表示するための設定
    } else {
        menu.style.position = 'relative'; // スクロール位置がメニューの元の位置より上に戻ったら元の位置に戻す
    }
});



function calculateBudget() {
    const plan = document.getElementById('plan').value;
    let basePrice = 0;

    if (plan === 'basic') {
        basePrice = 4000;
    } else if (plan === 'normal') {
        basePrice = 10000;
    } else if (plan === 'premium') {
        basePrice = 20000;
    }

    const deadline = parseInt(document.getElementById('deadline').value);
    let deadlinePrice = 0;

    if (deadline === 1) {
        deadlinePrice = 1000;
    } else if (deadline === 2) {
        deadlinePrice = 500;
    }

    const illustration = parseInt(document.getElementById('illustration').value);
    let illustrationPrice = 0;

    if (!isNaN(illustration)) {
        illustrationPrice = illustration * 500;
    }

    const background = document.getElementById('background').value;
    let backgroundPrice = 0;

    if (background === 'yes') {
        backgroundPrice = -1000;
    }

    const totalBudget = basePrice + deadlinePrice + illustrationPrice + backgroundPrice;
    document.getElementById('result').textContent = `予想金額：${totalBudget}円`;
}

