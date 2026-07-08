document.addEventListener('DOMContentLoaded', function() {

    // ---------- 1. 汉堡菜单切换 ----------
    // 解释：获取汉堡按钮和导航菜单的元素引用
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.querySelector('.nav-menu');

    // 判断汉堡按钮是否存在（以防万一）
    if (hamburger) {
        // 给汉堡按钮绑定点击事件
        hamburger.addEventListener('click', function() {
            // 切换 nav-menu 的 active 类
            // 解释：classList.toggle 是添加/移除类的最简方法，
            // 如果存在则移除，不存在则添加，实现“展开/收起”效果。
            navMenu.classList.toggle('active');
        });
    }

    // ---------- 2. 导航高亮当前页面 ----------
    // 解释：根据浏览器地址栏中的文件名，自动给对应的导航链接加上 active 类。
    // 例如当前页面是 index.html，则 Home 高亮。
    var currentPage = window.location.pathname.split('/').pop(); 
    // 解释：split('/') 按斜杠切分路径，pop() 取最后一段（即文件名）。
    // 如果当前路径是根目录（如 "http://127.0.0.1/"），则默认设为 index.html
    if (currentPage === '' || currentPage === 'index.html') {
        currentPage = 'index.html';
    }

    // 获取所有导航链接
    var navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        // 获取每个链接的 href 属性值
        var linkHref = link.getAttribute('href');
        // 如果链接的 href 与当前页面文件名匹配，则加上 active 类
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            // 确保其他链接移除 active（防止多个高亮）
            link.classList.remove('active');
        }
    });
    // ---------- 4. 额外小功能：点击页面空白处自动关闭移动端菜单（提升用户体验） ----------
    // 解释：当用户在手机屏幕上点击菜单以外的区域时，自动收起菜单。
    document.addEventListener('click', function(event) {
        // 判断菜单是否处于展开状态，并且点击的目标不是汉堡按钮，也不是菜单本身
        if (navMenu.classList.contains('active')) {
            var isClickInsideMenu = navMenu.contains(event.target);
            var isClickOnHamburger = hamburger.contains(event.target);
            // 如果点击既不在菜单内，也不在汉堡按钮上，则关闭菜单
            if (!isClickInsideMenu && !isClickOnHamburger) {
                navMenu.classList.remove('active');
            }
        }
    });

});