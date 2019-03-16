$(document).ready(function () {
    $('#toggle').click(function () {
        $(this).toggleClass('is-active');
        $('#navbarCollapse').toggleClass('is-active');
    });

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(':focus')) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });

    // Show all
    $('.filter-all').on('click', function () {
        var $this = $(this);
        $('.filter').removeClass('active');
        $this.addClass('active');
        $('.all').removeClass('hide');
    });

// Show landscape
    $('.filter-landscape').on('click', function () {
        var $this = $(this);
        $('.filter').removeClass('active');
        $this.addClass('active');
        $('.landscape').removeClass('hide');
        $('.urban, .portrait').addClass('hide');
    });

// Show urban
    $('.filter-urban').on('click', function () {
        var $this = $(this);
        $('.filter').removeClass('active');
        $this.addClass('active');
        $('.urban').removeClass('hide');
        $('.portrait, .landscape').addClass('hide');
    });

// Show portrait
    $('.filter-portrait').on('click', function () {
        var $this = $(this);
        $('.filter').removeClass('active');
        $this.addClass('active');
        $('.portrait').removeClass('hide');
        $('.landscape, .urban').addClass('hide');
    });


});

(function () {
    var httpRequest,
        a = document.createElement('a'),
        userName = 'sonjastrieder';

    var profile = {
        username: 'sonjastrieder',
        avatar: 'https://gravatar.com/avatar/952cd0883570693762d31f8aad3c592a?s=80&d=https://codepen.io/assets/avatars/user-avatar-80x80-bdcd44a3bfb9a5fd01eb8b86f9e033fa1a9897c3a15b33adfc2649a002dab1b6.png',
        nicename: 'Sonja Strieder'
    };

    addFloatingHead(profile);

    // requestMyData(userName);

    function requestMyData(userName) {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            return false;
        }
        httpRequest.onreadystatechange = processData;
        httpRequest.open('GET', 'http://cpv2api.com/profile/' + userName);
        httpRequest.send();
    }

    function processData() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var profile = JSON.parse(httpRequest.responseText).data;
                // console.log(data);
                addFloatingHead(profile);
            } else {
                // console.log('There was a problem with the request.');
            }
        }
    }

    function addFloatingHead(me) {
        document.head.insertAdjacentHTML('beforeend', '<style>.Me { text-decoration: none; position: fixed; z-index: 9999; bottom: 10px; right: 10px; display: block; padding: 6px; border-radius: 50%; opacity: 0; transform-origin: 100% 100%; transition: all 0.2s ease-in-out; } .Me > * { transition: inherit; } .Me-avatar { display: block; width: 26px; height: 26px; border-radius: 50%; } .Me:hover { background: rgba(255,255,255,0.9); opacity: 1; } .Me:hover .Me-avatar { transform: scale(1.25); }</style>');
        a.setAttribute('href', 'https://codepen.io/' + me.username);
        a.setAttribute('target', '_blank');
        a.className = 'Me';
        a.innerHTML = '<img class="Me-avatar" src="' + me.avatar + '" alt="' + me.nicename + '" />';
        a.onclick = function () {
            if (ga) {
                var url = this.getAttribute('href');
                ga('send', 'event', 'Mehead', 'click', url, {
                    'transport': 'beacon',
                    'hitCallback': function () {
                        console.log('callback!');
                        window.open(url);
                    }
                });
                return false;
            }
        };

        document.body.appendChild(a);
    }

})();

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-90324545-1', 'auto');
ga('send', 'pageview');