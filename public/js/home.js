document.querySelectorAll(".nav-link").forEach((link) => {
    let path = document.location.pathname;
    if(/^\/dashboard/.test(path)){
        if(/\/dashboard$/.test(link.href)){
            link.classList.add("active");
        }
    }else if(/^\/\d*$/.test(path)){
        if((/\/\d*$/).test(link.href)){
            link.classList.add("active");
        }
    }else if(/\/login$/.test(link.href)){
        link.classList.add("active");
    }
});
