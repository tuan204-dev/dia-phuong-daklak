var rootUrl = '/sc_service';
const isEnglish = window.location.href.toLowerCase().includes("daklak-news") || window.location.host.includes('en.');

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy;
};

Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy;
};
Date.prototype.ddmm = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]);
};
Date.prototype.yyyymm = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]);
};

const DATE_LANG_TEXT = {
    vi: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

Date.prototype.format = function (config) {
    const lang = (config && config.lang && DATE_LANG_TEXT[config.lang]) ? config.lang : 'vi';
    const dayName = DATE_LANG_TEXT[lang][this.getDay()];

    return config.format
        .replace(/DAY/, dayName)
        .replace(/DD/, ("0" + this.getDate()).slice(-2))
        .replace(/MM/, ("0" + (this.getMonth() + 1)).slice(-2))
        .replace(/YYYY/, this.getFullYear())
        .replace(/HH/, ("0" + this.getHours()).slice(-2))
        .replace(/MI/, this.getMinutes())
        .replace(/SS/, this.getSeconds());
};

function formatPublishDate(input) {
    if (!input) return '';

    const normalized = String(input)
        .trim()
        .replace(/\.\d+$/, '')
        .replace(' ', 'T');

    const date = new Date(normalized);
    if (isNaN(date.getTime())) return String(input);

    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);
    const dd = ("0" + date.getDate()).slice(-2);
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const yyyy = date.getFullYear();

    return `${hh}:${mm}, ${dd}/${MM}/${yyyy}`;
}

function toggleBroadcastTab() {
    const truyenHinhUrl = "https://cdn.drt.vn/live/285a27750861b964c27af22091662a74f2f/playlist.m3u8";
    const phatThanhUrl = "https://cdn.drt.vn/live/285054c4567dea54b3fb14bfd60d61230b5/playlist.m3u8";

    const videoElement = document.getElementById('broadcast-player');
    const audioContainer = document.getElementById('audio-player-container');
    const $truyenHinhLink = $('.truyen-hinh-link');
    const $phatThanhLink = $('.phat-thanh-link');
    const $tabItems = $('.broadcast-tab-item');

    let player = null;

    if (!$('#audio-mode-style').length) {
        $('<style id="audio-mode-style">.vjs-audio-only-mode .vjs-poster { display: block !important; z-index: 1; } .vjs-audio-only-mode .vjs-tech { opacity: 0; } .vjs-audio-only-mode .vjs-control-bar, .vjs-audio-only-mode .vjs-big-play-button { z-index: 10 !important; }</style>').appendTo('head');
    }

    if (videoElement) {
        videoElement.classList.add('video-js', 'vjs-default-skin', 'vjs-big-play-centered');
        player = videojs('broadcast-player', {
            controls: true,
            autoplay: false,
            preload: 'auto',
            fluid: true,
            html5: {
                hls: {
                    overrideNative: true
                }
            }
        });
    }

    if (audioContainer) {
        $(audioContainer).addClass('t:hidden');
    }

    function loadSource(url, isAudio) {
        if (player) {
            player.src({ type: 'application/x-mpegURL', src: url });

            player.poster("https://baodaklak.vn/file//fb9e3a03798789de0179a1704dea238e/072025/lgo_20250708111100.jpg");

            if (isAudio) {
                player.addClass('vjs-audio-only-mode');
            } else {
                player.removeClass('vjs-audio-only-mode');
            }

            setTimeout(function () {
                const promise = player.play();
                if (promise !== undefined) {
                    promise.catch(function (error) {
                        console.log("Auto-play prevented: " + error);
                    });
                }
            }, 100);
        }
    }

    if (player) {
        player.src({ type: 'application/x-mpegURL', src: truyenHinhUrl });
    }

    if ($('.tab-truyen-hinh').hasClass('active')) {
        $phatThanhLink.hide();
    } else {
        $truyenHinhLink.hide();
    }

    $tabItems.on('click', function () {
        $tabItems.removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('tab-truyen-hinh')) {
            $truyenHinhLink.show();
            $phatThanhLink.hide();
            loadSource(truyenHinhUrl, false);
        } else if ($(this).hasClass('tab-phat-thanh')) {
            $phatThanhLink.show();
            $truyenHinhLink.hide();
            loadSource(phatThanhUrl, true);
        }
    });
}

function cateTitleAnimation() {
    const $cateLabelBgs = $('.cate-label .cate-label-bg');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('side-in-right');
                observer.unobserve(entry.target);
            }
        });
    });

    $cateLabelBgs.each(function () {
        observer.observe(this);
    });
}

let cachedWardData = null;

function renderWardSlides(data) {
    const wardSlider = $('#ward-section .swiper-wrapper');
    if (!data || !data.length) {
        wardSlider.empty();
        return;
    }

    const slideHtml = data.map(function (item) {
        return '<div class="swiper-slide swiper-slide-active">' +
            '<div class="slide-tag">' +
            '<a class="tag inter" href="/thong-tin-102-xa-phuong-tinh-dak-lak/#' + item.id + '" title="' + item.name + '">' + item.name + '</a>' +
            '</div>' +
            '</div>';
    }).join('');

    wardSlider.html(slideHtml);
}

function loadWard() {
    if (cachedWardData) {
        renderWardSlides(cachedWardData);
        return;
    }
    $.ajax({
        url: 'https://pub-58c9d8d1f8f84ab6aa09e49343220dda.r2.dev/xa-phuong.json',
        dataType: 'json',
        success: function (data) {
            cachedWardData = data;
            renderWardSlides(data);
        },
        error: function (error) {
            console.log('loadWard error: ', error);
        }
    });
}

function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}

function searchWard() {
    const searchForm = $('#form-ward-search');

    searchForm.on('submit', function (event) {
        event.preventDefault();
        const query = searchForm.find('input').val().toLowerCase().trim();
        const normalizedQuery = removeVietnameseTones(query);

        const processData = function (data) {
            if (!query) {
                renderWardSlides(data);
                return;
            }
            const result = data.filter(function (item) {
                const normalizedName = removeVietnameseTones(item.name.toLowerCase());
                return normalizedName.includes(normalizedQuery);
            });
            renderWardSlides(result);
        };

        if (cachedWardData) {
            processData(cachedWardData);
        } else {
            $.ajax({
                url: 'https://pub-58c9d8d1f8f84ab6aa09e49343220dda.r2.dev/xa-phuong.json',
                dataType: 'json',
                success: function (data) {
                    cachedWardData = data;
                    processData(data);
                },
                error: function (error) {
                    console.log('searchWard error: ', error);
                }
            });
        }
        return false;
    });
}

function wardTabs() {
    const tabs = document.querySelectorAll('#ward-tabs .ward-tab');
    const panels = document.querySelectorAll('.ward-tab-panel');
    const blocks = {
        info: document.querySelector('.info'),
        news: document.querySelector('.news')
    };
    if (!tabs.length) return;

    function activate(target) {
        tabs.forEach(function (t) {
            t.classList.toggle('is-active', t.getAttribute('data-tab') === target);
        });
        panels.forEach(function (panel) {
            panel.classList.toggle('t:hidden', panel.getAttribute('data-panel') !== target);
        });
        // show the content block for this tab, hide the other
        Object.keys(blocks).forEach(function (key) {
            if (blocks[key]) {
                blocks[key].classList.toggle('t:hidden', key !== target);
            }
        });
        // swipers sized themselves while their block was hidden (0 width) —
        // a resize event makes Swiper recalculate now that it's visible
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 60);
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            activate(tab.getAttribute('data-tab'));
        });
    });
}

function wardSuggestions() {
    const wrapper = document.getElementById('ward-search-wrapper');
    if (!wrapper) return;

    const input = wrapper.querySelector('input');
    const list = document.getElementById('ward-suggestions');
    if (!input || !list) return;

    function render(items) {
        if (!items || !items.length) {
            list.innerHTML = '';
            list.classList.add('t:hidden');
            return;
        }
        list.innerHTML = items.map(function (item) {
            return '<li>' +
                '<button type="button" class="ward-suggestion-item" data-id="' + item.id + '">' +
                item.name +
                '</button>' +
                '</li>';
        }).join('');
        list.classList.remove('t:hidden');
    }

    function filterAndRender() {
        const data = cachedWardData || [];
        const query = removeVietnameseTones(input.value.toLowerCase().trim());
        const result = query
            ? data.filter(function (item) {
                return removeVietnameseTones(item.name.toLowerCase()).includes(query);
            })
            : data;
        render(result);
    }

    function showSuggestions() {
        if (cachedWardData) {
            filterAndRender();
        } else {
            $.ajax({
                url: 'https://pub-58c9d8d1f8f84ab6aa09e49343220dda.r2.dev/xa-phuong.json',
                dataType: 'json',
                success: function (data) {
                    cachedWardData = data;
                    filterAndRender();
                },
                error: function (error) {
                    console.log('wardSuggestions error: ', error);
                }
            });
        }
    }

    input.addEventListener('focus', showSuggestions);
    input.addEventListener('input', showSuggestions);

    list.addEventListener('click', function (event) {
        const btn = event.target.closest('.ward-suggestion-item');
        if (!btn) return;
        input.value = btn.textContent.trim();
        list.classList.add('t:hidden');
        $('#form-ward-search').trigger('submit');
    });

    document.addEventListener('click', function (event) {
        if (!wrapper.contains(event.target)) {
            list.classList.add('t:hidden');
        }
    });
}

function getTopView() {
    const baseUrl = ""

    const url = isEnglish ? `/sc_service/api/article/getTopView?saArticleCateId=${$("#cate_id").html()}` : '/sc_service/api/article/getTopView';

    const quantity = isEnglish ? 5 : 6

    const $mostRead = $("#mostRead");
    if ($mostRead.length > 0) {
        $.ajax({
            url: `${baseUrl}${url}`,
            jsonp: "jsonCallback",
            dataType: 'jsonp',
            data: {
                scUnitMapId: $("#site_id").html(),
                day: 4
            },
            success: function (object) {
                const obj = object.response;
                if (obj && obj.length > 0) {
                    const strHtml = obj.slice(0, quantity).map(function (item) {
                        let avatar = item.avatar ? '/file' + item.avatar : "/common/v1/images/logo_share.jpg";
                        if (baseUrl) {
                            avatar = baseUrl + avatar;
                        }
                        return '<div class="horizontal-post-box">' +
                            '<div class="t:flow-root t:pr-4">' +
                            '<div class="t:float-left img-thumb-block horizontal-post ssm-size t:mr-4">' +
                            '<figure class="figure">' +
                            '<a class="url" href="' + item.pageUrl + '" title="' + item.title + '">' +
                            '<img loading="lazy" class="img lazy" src="' + avatar + '?width=700&height=-&type=resize" data-src="' + avatar + '?width=700&height=-&type=resize" alt="' + item.title + '">' +
                            '</a>' +
                            '</figure>' +
                            '</div>' +
                            '<h3 class="title l2" title="' + item.title + '">' +
                            '<a href="' + item.pageUrl + '">' +
                            item.title +
                            '</a>' +
                            '</h3>' +
                                '<time datetime="' + item.publishDate + '" class="time">' + formatPublishDate(item.publishDate) + '</time>' +
                            '</div>' +
                            '</div>';
                    }).join('');

                    $mostRead.html(strHtml);
                }
            },
            error: function () {

            }
        });
    }
}

function renderDateTime() {
    const now1 = new Date().format({
        lang: isEnglish ? 'en' : 'vi',
        format: '<b>DAY</b>, DD/MM/YYYY'
    });


    $(".today-date").html(now1);
}

function getWeather() {
    const API_URL = 'https://weather.waether-bao.workers.dev/?p=daklak';
    $.ajax({
        url: API_URL,
        dataType: 'json',
        success: function (data) {
            const $weatherElement = $('#header .weather');

            if ($weatherElement.length) {
                const locationName = isEnglish ? 'Dak Lak' : 'Đắk Lắk';
                const tempText = `<b>${locationName}</b> ${data.temp_c}ºC/${data.mintemp_c}-${data.maxtemp_c}ºC`;
                const $pElement = $weatherElement.find('p');
                if ($pElement.length) {
                    $pElement.html(tempText);
                }

                const $iconElement = $weatherElement.find('i');
                if ($iconElement.length && data.icon) {
                    const $img = $('<img>', {
                        src: 'https:' + data.icon,
                        alt: 'Weather icon',
                        css: {
                            verticalAlign: 'middle',
                            width: '24px',
                            height: '24px'
                        }
                    });
                    $iconElement.replaceWith($img);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching weather data:', errorThrown);
        }
    });
}

function getTopic(a, start) {
    $(".search_by_date").hide();
    $.ajax({
        url: rootUrl + '/api/topic/list',
        jsonp: "jsonCallback",
        dataType: 'jsonp',
        data: {
            scUnitMapId: $("#site_id").html(),
            first: start,
            pageSize: 14
        },
        success: function (object) {
            var strHtml = '';
            var obj = object.response;
            if (obj.length > 0) {
                for (var i = 0; i < obj.length; i++) {
                    var avatar = obj[i].urlImage != "" ? "/file/topicAvatar/" + obj[i].urlImage + '?width=500&height=-&type=resize' : "/file/default.jpg";
                    var url = $(".cateTitle").length > 0 ? $(".cateTitle").attr("href") : "/su-kien";
                    if (i < 8) {
                        strHtml += ` <div class="swiper-slide">
                                <div class="vertical-post-box" style="max-width: 300px; margin-left: auto; margin-right: auto;">
                                    <div class="post-box-image">
                                        <figure class="figure">
                                            <a class="url" href="${url}/?topicId=${obj[i].id}&title=${obj[i].title}" title="${obj[i].title}">
                                                <img class="img" src="${avatar}"
                                                    alt="${obj[i].title}">
                                            </a>
                                        </figure>
                                        <div class="image-background">
                                            <h3 class="name">
                                                <a href="${url}/?topicId=${obj[i].id}&title=${obj[i].title}" title="${obj[i].title}">${obj[i].title}</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    }
                }
            } else {
                $(".event_loadmore").hide();
            }
            if (a) $(a).append(strHtml);
        },
        error: function () {

        }
    });
}

function scrollFirstTime() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(function () {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - 100;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

function clampByWordsFromTailwind(el) {
    // Lấy số dòng từ class line-clamp-*
    const clampClass = [...el.classList].find(c =>
        c.includes('line-clamp-')
    );
    if (!clampClass) return;

    const maxLines = parseInt(clampClass.split('line-clamp-')[1], 10);
    if (!maxLines) return;

    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);

    // fallback nếu line-height = normal
    const computedLineHeight = isNaN(lineHeight)
        ? parseFloat(style.fontSize) * 1.4
        : lineHeight;

    const maxHeight = computedLineHeight * maxLines;

    const originalText = el.innerText.trim();
    const words = originalText.split(/\s+/);

    el.innerText = '';

    let lastValid = '';

    for (let i = 0; i < words.length; i++) {
        el.innerText += (i ? ' ' : '') + words[i];

        if (el.scrollHeight > maxHeight) {
            el.innerText = lastValid + '…';
            break;
        }

        lastValid = el.innerText;
    }
}


function handleClampText() {
    document.querySelectorAll('[class*="line-clamp-"]').forEach(el => {
    clampByWordsFromTailwind(el);
    });
}

toggleBroadcastTab();
cateTitleAnimation();
loadWard();
searchWard();
wardSuggestions();
wardTabs();
getTopView();
renderDateTime();
getWeather();

document.addEventListener('DOMContentLoaded', function () {
    scrollFirstTime();
    handleClampText();
});

if ($("#swiperBreakingNews .swiper-wrapper").length > 0) {
    getTopic("#swiperBreakingNews .swiper-wrapper", 0);
}