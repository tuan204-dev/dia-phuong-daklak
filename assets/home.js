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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatPopulation(value) {
    if (value === null || value === undefined || value === '') return '';
    var num = typeof value === 'number'
        ? value
        : parseInt(String(value).replace(/[^\d]/g, ''), 10);
    if (isNaN(num)) return String(value);
    // thousand separator with "." (vi-VN), no Intl dependency
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

let cachedWardDetails = null;

function renderWardDetails(data) {
    var container = document.getElementById('ward-detail-list');
    if (!container) return;
    if (!data || !data.length) {
        container.innerHTML = '';
        return;
    }

    var placeholder = './assets/images/1eedaeffbe46c36841782eac488c1f0710028c55.png';

    var html = data.map(function (item) {
        var rows = [];
        function row(label, value) {
            if (value === null || value === undefined || String(value).trim() === '') return;
            rows.push('<li><strong>' + label + ':</strong> ' + escapeHtml(value) + '</li>');
        }

        row('Diện tích', item.dien_tich_km2 ? item.dien_tich_km2 + ' km²' : '');
        row('Dân số', item.dan_so ? formatPopulation(item.dan_so) + ' người' : '');
        row('Trụ sở UBND', item.tru_so_ubnd);
        row('Trụ sở Đảng ủy', item.tru_so_dang_uy);
        row('Trụ sở HĐND', item.tru_so_hdnd);
        row('Trung tâm Phục vụ hành chính công xã', item.tru_so_trung_tam_hanh_chinh);
        row('Trụ sở Công an xã', item.tru_so_cong_an);

        if (Array.isArray(item.lanh_dao) && item.lanh_dao.length) {
            rows.push(
                '<li><strong>Lãnh đạo xã, phường:</strong>' +
                '<div class="t:pl-4 t:mt-1 t:flex t:flex-col t:gap-y-1">' +
                item.lanh_dao.map(function (leader) {
                    return '<span>' + escapeHtml(leader) + '</span>';
                }).join('') +
                '</div></li>'
            );
        }

        row('Thông tin sáp nhập', item.thong_tin_sap_nhap);

        var img = escapeHtml(item.image_url || placeholder);
        var name = escapeHtml(item.ten_xa_phuong || '');
        var id = escapeHtml(item.id || '');

        return '<div id="' + id + '" class="t:scroll-mt-28 t:flex t:flex-col t:rounded-[12px] t:overflow-hidden t:border t:border-[#A01011]">' +
            '<div class="t:px-4 t:py-2 t:bg-[#A01011] t:text-white t:font-bold">' +
            '<h3 class="t:text-[20px] t:uppercase">' + name + '</h3>' +
            '</div>' +
            '<div class="t:px-4 t:lg:px-4 t:pt-3 t:pb-6 t:flex t:flex-col-reverse t:gap-y-4 t:lg:grid t:lg:grid-cols-5 t:lg:gap-x-6 t:lg:gap-y-0 t:bg-white">' +
            '<div class="t:col-span-3 t:flex t:flex-col t:gap-y-3.5">' +
            '<ul class="t:text-base t:flex t:flex-col t:gap-y-2 t:list-disc t:pl-5">' +
            rows.join('') +
            '</ul>' +
            '<button type="button" class="ward-news-link t:block t:w-fit t:mx-auto t:lg:mx-0 t:px-4 t:py-2 t:rounded-full t:border t:border-[#E11718] t:text-[#E11718] t:bg-transparent t:cursor-pointer">Xem tin tức</button>' +
            '</div>' +
            '<div class="t:col-span-2">' +
            '<img src="' + img + '" alt="' + name + '" class="t:w-full t:rounded-[6px] t:aspect-[16/9] t:object-cover">' +
            '</div>' +
            '</div>' +
            '</div>';
    }).join('');

    container.innerHTML = html;
}

function loadWardDetails() {
    var container = document.getElementById('ward-detail-list');
    if (!container) return;
    if (cachedWardDetails) {
        renderWardDetails(cachedWardDetails);
        return;
    }
    $.ajax({
        url: 'https://pub-767846261d1b4ab5adf906740bb1458e.r2.dev/assets-daklak/xa_phuong/data.json',
        dataType: 'json',
        success: function (data) {
            cachedWardDetails = data;
            renderWardDetails(data);
        },
        error: function (error) {
            console.log('loadWardDetails error: ', error);
        }
    });
}

/* ============================================================
 * Tin tức theo xã/phường (section .news) — render từ API
 * ============================================================ */
var NEWS_PAGE_SIZE = 14;
var NEWS_IMG_BASE = 'https://baodaklak.vn/file';
var NEWS_SITE_FALLBACK = 'fb9e3a03798789de0179a1704dea238e';
var newsState = { cateId: '', first: 0, total: 0, loading: false };

function newsImage(item, query) {
    var path = item && item.avatar
        ? NEWS_IMG_BASE + item.avatar
        : 'https://baodaklak.vn/common/v1/images/logo_share.jpg';
    return path + (query ? '?' + query : '');
}

function newsHref(item) {
    return 'https://baodaklak.vn' + ((item && item.pageUrl) || '');
}

function newsImgTag(item, query) {
    var url = newsImage(item, query);
    var title = escapeHtml((item && item.title) || '');
    return '<img class="img lazy entered loaded" loading="lazy" src="' + url + '" data-src="' + url + '" alt="' + title + '" data-ll-status="loaded">';
}

// Bài nổi bật (cột trái, ảnh lớn 3/2 + mô tả)
function newsFeaturedHtml(item) {
    var href = newsHref(item);
    var title = escapeHtml(item.title || '');
    var lead = escapeHtml(item.lead || '');
    var time = formatPublishDate(item.publishDate);
    return '<div class="vertical-post-box">' +
        '<div class="post-box-image">' +
        '<figure class="figure t:aspect-[3/2] t:rounded-[6px] t:overflow-hidden">' +
        '<a class="url" href="' + href + '" title="' + title + '">' + newsImgTag(item, 'width=600px') + '</a>' +
        '</figure>' +
        '</div>' +
        '<div class="post-box-info">' +
        '<div class="info-name" style="margin-bottom: 2px;"><h2 class="name">' +
        '<a href="' + href + '" title="' + title + '">' + title + '</a></h2></div>' +
        '<div class="info-time"><time class="time">' + time + '</time></div>' +
        (lead ? '<div class="info-description"><p class="description t:line-clamp-3 t:break-words">' + lead + '</p></div>' : '') +
        '</div>' +
        '</div>';
}

// Bài phụ (cột phải, ngang, ảnh nhỏ + tiêu đề + thời gian)
function newsSmallHtml(item) {
    var href = newsHref(item);
    var title = escapeHtml(item.title || '');
    var time = formatPublishDate(item.publishDate);
    return '<div class="horizontal-post-box"><div class="post-box-block">' +
        '<div class="box-block-image"><figure class="figure">' +
        '<a class="url" href="' + href + '" title="' + title + '">' + newsImgTag(item, 'width=300&height=-&type=resize') + '</a>' +
        '</figure></div>' +
        '<div class="box-block-info">' +
        '<div class="info-name" style="margin-bottom: 2px;"><h3 class="name">' +
        '<a href="' + href + '" title="' + title + '">' + title + '</a></h3></div>' +
        '<div class="info-time"><time class="time">' + time + '</time></div>' +
        '</div></div></div>';
}

// Bài trong danh sách "Tin tức xã ..." (ngang, có mô tả) — phần load more
function newsRelatedHtml(item) {
    var href = newsHref(item);
    var title = escapeHtml(item.title || '');
    var lead = escapeHtml(item.lead || '');
    var time = formatPublishDate(item.publishDate);
    return '<div class="category-related-posts"><div class="horizontal-post-box"><div class="post-box-block">' +
        '<div class="box-block-image"><figure class="figure">' +
        '<a class="url" href="' + href + '" title="' + title + '">' + newsImgTag(item, 'width=300&height=-&type=resize') + '</a>' +
        '</figure></div>' +
        '<div class="box-block-info">' +
        '<div class="info-name"><h3 class="name">' +
        '<a href="' + href + '" title="' + title + '">' + title + '</a></h3></div>' +
        '<div class="info-time"><p class="text"><span class="category"></span><time class="time">' + time + '</time></p></div>' +
        (lead ? '<div class="info-description"><p class="description t:line-clamp-3 t:break-words">' + lead + '</p></div>' : '') +
        '</div></div></div></div>';
}

function newsUpdateLoadMore() {
    var btn = document.getElementById('news-load-more');
    var wrap = document.getElementById('news-load-more-wrap');
    if (!btn || !wrap) return;
    btn.disabled = newsState.loading;
    btn.textContent = newsState.loading ? 'Đang tải...' : 'Xem thêm';
    var loadedAll = newsState.total && newsState.first >= newsState.total;
    wrap.style.display = loadedAll ? 'none' : '';
}

function renderNewsInitial(list) {
    var featured = document.getElementById('news-featured');
    var highlights = document.getElementById('news-highlights');
    var related = document.getElementById('news-related-list');

    if (!list.length) {
        if (featured) featured.innerHTML = '';
        if (highlights) highlights.innerHTML = '';
        if (related) related.innerHTML = '<p class="t:text-center t:py-6 t:text-[#667085]">Chưa có bài viết.</p>';
        return;
    }
    if (featured) featured.innerHTML = newsFeaturedHtml(list[0]);
    if (highlights) highlights.innerHTML = list.slice(1, 4).map(newsSmallHtml).join('');
    if (related) related.innerHTML = list.slice(4).map(newsRelatedHtml).join('');
}

function appendNewsRelated(list) {
    var related = document.getElementById('news-related-list');
    if (!related || !list.length) return;
    related.insertAdjacentHTML('beforeend', list.map(newsRelatedHtml).join(''));
}

function fetchCategoryNews(isInitial) {
    if (newsState.loading || !newsState.cateId) return;
    newsState.loading = true;
    newsUpdateLoadMore();

    var scUnitMapId = ($('#site_id').html() || '').trim() || NEWS_SITE_FALLBACK;

    $.ajax({
        url: 'https://baodaklak.vn/sc_service/api/article/list',
        jsonp: 'jsonCallback',
        dataType: 'jsonp',
        data: {
            scUnitMapId: scUnitMapId,
            saArticleCateId: newsState.cateId,
            first: newsState.first,
            pageSize: NEWS_PAGE_SIZE
        },
        success: function (res) {
            var list = (res && res.response) ? res.response : [];
            if (res && typeof res.total === 'number') newsState.total = res.total;
            if (isInitial) {
                renderNewsInitial(list);
            } else {
                appendNewsRelated(list);
            }
            newsState.first += list.length;
            newsState.loading = false;
            newsUpdateLoadMore();
        },
        error: function (error) {
            console.log('fetchCategoryNews error: ', error);
            newsState.loading = false;
            newsUpdateLoadMore();
        }
    });
}

function loadCategoryNews() {
    var related = document.getElementById('news-related-list');
    if (!related) return; // block .news không tồn tại

    var cateEl = document.getElementById('current_cate_id');
    var titleEl = document.getElementById('current_cate_title');
    var cateId = cateEl ? cateEl.textContent.trim() : '';
    var cateTitle = titleEl ? titleEl.textContent.trim() : '';

    var label = document.getElementById('news-cate-title');
    if (label && cateTitle) label.textContent = 'Tin tức ' + cateTitle;

    if (!cateId) return;

    newsState.cateId = cateId;
    newsState.first = 0;
    newsState.total = 0;

    var btn = document.getElementById('news-load-more');
    if (btn) {
        btn.addEventListener('click', function () {
            fetchCategoryNews(false);
        });
    }

    fetchCategoryNews(true);
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
            // các mô tả line-clamp trong block vừa hiện không đo được lúc ẩn -> clamp lại
            scheduleClampText();
        }, 60);
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            activate(tab.getAttribute('data-tab'));
        });
    });

    // "Xem tin tức" buttons are rendered async into the ward list — delegate
    // the click so they open the TIN TỨC tab and scroll back up to the tabs
    document.addEventListener('click', function (event) {
        var trigger = event.target.closest('.ward-news-link');
        if (!trigger) return;
        event.preventDefault();
        activate('news');
        var anchor = document.getElementById('ward-tabs');
        if (anchor) {
            var top = anchor.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
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

    // Đang ẩn (vd tab chưa mở) -> không đo được chiều cao, để dành clamp khi hiện.
    if (el.offsetWidth === 0 && el.offsetHeight === 0) return;

    // Lưu text gốc lần đầu để clamp lại được nhiều lần (re-render / resize)
    // mà không cắt chồng lên phần đã cắt trước đó.
    if (el.dataset.clampSrc === undefined) {
        el.dataset.clampSrc = el.innerText.trim();
    }
    const originalText = el.dataset.clampSrc;
    if (!originalText) return;

    // CSS line-clamp (display:-webkit-box) làm sai phép đo -> tạm về block khi đo & cắt.
    const inline = el.style;
    const saved = {
        display: inline.display,
        webkitLineClamp: inline.webkitLineClamp,
        overflow: inline.overflow,
        whiteSpace: inline.whiteSpace
    };
    inline.display = 'block';
    inline.webkitLineClamp = 'unset';
    inline.overflow = 'visible';

    // Đo chiều cao 1 dòng THẬT bằng hiệu (2 dòng - 1 dòng): loại trừ padding và
    // không phụ thuộc line-height: normal (vốn làm fallback fontSize*1.4 bị hụt).
    inline.whiteSpace = 'pre';
    el.textContent = 'M';
    const h1 = el.clientHeight;
    el.textContent = 'M\nM';
    const h2 = el.clientHeight;
    const lineHeight = (h2 - h1) || h1;
    const maxHeight = h1 + lineHeight * (maxLines - 1) + 1; // +1px chống lỗi làm tròn
    inline.whiteSpace = 'normal';

    const words = originalText.split(/\s+/);

    el.textContent = '';

    let lastValid = '';

    for (let i = 0; i < words.length; i++) {
        el.textContent = lastValid ? lastValid + ' ' + words[i] : words[i];

        if (el.scrollHeight > maxHeight) {
            el.textContent = (lastValid || words[i]) + '…';
            break;
        }

        lastValid = el.textContent;
    }

    // Khôi phục style: text đã vừa <= maxLines nên CSS line-clamp không cắt thêm.
    inline.display = saved.display;
    inline.webkitLineClamp = saved.webkitLineClamp;
    inline.overflow = saved.overflow;
    inline.whiteSpace = saved.whiteSpace;
}


function handleClampText() {
    document.querySelectorAll('[class*="line-clamp-"]').forEach(el => {
        clampByWordsFromTailwind(el);
    });
}

/* Chạy lại handleClampText mỗi khi DOM/text thay đổi (vd: nội dung render từ API).
 * clamp cũng chỉnh sửa text -> sẽ tự sinh mutation, nên phải disconnect observer
 * trong lúc clamp để tránh lặp vô hạn; đồng thời debounce gộp nhiều thay đổi. */
var clampObserver = null;
var clampScheduled = false;
var clampObserverConfig = { childList: true, subtree: true, characterData: true };

function runClampText() {
    if (clampObserver) clampObserver.disconnect();
    handleClampText();
    if (clampObserver) clampObserver.observe(document.body, clampObserverConfig);
}

function scheduleClampText() {
    if (clampScheduled) return;
    clampScheduled = true;
    setTimeout(function () {
        clampScheduled = false;
        runClampText();
    }, 120);
}

function observeClampText() {
    if (!window.MutationObserver || !document.body) return;
    clampObserver = new MutationObserver(scheduleClampText);
    clampObserver.observe(document.body, clampObserverConfig);
}

toggleBroadcastTab();
cateTitleAnimation();
loadWard();
loadWardDetails();
loadCategoryNews();
searchWard();
wardSuggestions();
wardTabs();
getTopView();
renderDateTime();
getWeather();

document.addEventListener('DOMContentLoaded', function () {
    scrollFirstTime();
    handleClampText();
    observeClampText();
});

if ($("#swiperBreakingNews .swiper-wrapper").length > 0) {
    getTopic("#swiperBreakingNews .swiper-wrapper", 0);
}