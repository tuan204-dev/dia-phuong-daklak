"use strict";
(self.webpackChunkphuyenonline = self.webpackChunkphuyenonline || []).push([
    [524], {
        586: (e, t, n) => {
            n(543);
            const o = "https://pub-58c9d8d1f8f84ab6aa09e49343220dda.r2.dev/assets/images/lazy.png";
            n(754);
            var r = n(236),
                a = n(889),
                i = n(692),
                l = n.n(i),
                s = n(144),
                d = n.n(s),
                c = n(951);
            new (function () {
                function e() {
                    this.loadStickyHeader(), this.loadDropdownMenu(), this.loadSwiper(), this.loadScrollToTop(), this.loadHeaderWrapperMenu();
                    new (d())({
                        callback_error: function (e) {
                            e.setAttribute("src", o)
                        }
                    })
                }
                return e.prototype.loadDropdownMenu = function () {
                    document.addEventListener("DOMContentLoaded", (function (e) {
                        var t = document.getElementsByClassName("nav-item");
                        Array.from(t).forEach((function (e) {
                            var t = e.getElementsByClassName("dropdown-toggle"),
                                n = e.getElementsByClassName("dropdown-menu");
                            1 == t.length && 1 == n.length && (e.addEventListener("mouseenter", (function (o) {
                                t.item(0).setAttribute("aria-expanded", "true"), e.classList.add("show"), n.item(0).classList.add("show")
                            })), e.addEventListener("mouseleave", (function (o) {
                                t.item(0).setAttribute("aria-expanded", "false"), e.classList.remove("show"), n.item(0).classList.remove("show")
                            })), t.item(0).addEventListener("click", (function (e) {
                                var n = t.item(0).getAttribute("href");
                                return location.href = n, !1
                            })))
                        }))
                    }))
                }, e.prototype.loadSwiper = function () {
                    window.addEventListener("load", (function (e) {
                        new r.A("#swiperSlideMenu", {
                            loop: !1,
                            slidesPerView: "auto",
                            modules: [a.Vx],
                            navigation: {
                                prevEl: "#swiperBtnPrevSlideMenu",
                                nextEl: "#swiperBtnNextSlideMenu"
                            }
                        }), new r.A(".swiperHorizontalTags", {
                            loop: !1,
                            slidesPerView: "auto",
                            modules: [a.Vx],
                            navigation: {
                                prevEl: ".swiperBtnPrevHorizontalTag",
                                nextEl: ".swiperBtnNextHorizontalTag"
                            }
                        }), new r.A(".swiperNewPosts", {
                            speed: 800,
                            loop: !0,
                            slidesPerView: 1,
                            effect: "fade",
                            fadeEffect: {
                                crossFade: !0
                            },
                            modules: [a.Vx, a.dK, a.Ij, a._R],
                            autoplay: {
                                delay: 5e3,
                                disableOnInteraction: !1
                            },
                            pagination: {
                                el: ".swiperPaginNewPosts",
                                clickable: !0
                            },
                            navigation: {
                                prevEl: ".swiperBtnPrevNewPosts",
                                nextEl: ".swiperBtnNextNewPosts"
                            }
                        }), new r.A(".swiperCategoryMenu", {
                            loop: !1,
                            slidesPerView: "auto",
                            modules: [a.Vx],
                            navigation: {
                                prevEl: ".swiperCategoryMenuBtnPrev",
                                nextEl: ".swiperCategoryMenuBtnNext"
                            }
                        })
                    }))
                }, e.prototype.loadStickyHeader = function () {
                    var e = this;
                    window.addEventListener("load", (function (t) {
                        e.handleStickyHeader()
                    })), window.addEventListener("scroll", (function (t) {
                        e.handleStickyHeader()
                    }))
                }, e.prototype.handleStickyHeader = function () {
                    var e = document.getElementById("header");
                    if (e) {
                        document.documentElement.scrollHeight, window.innerHeight;
                        var t = window.pageYOffset,
                            n = l()(e).outerHeight();
                        t > (n += 1) && e.classList.add("style-fixed"), t < n && e.classList.remove("style-fixed")
                    }
                }, e.prototype.loadScrollToTop = function () {
                    var e = this;
                    window.addEventListener("load", (function (t) {
                        e.handleScrollToTop()
                    })), window.addEventListener("scroll", (function (t) {
                        e.handleScrollToTop()
                    })), window.onload = function () {
                        var e = document.getElementById("btnScrollTop");
                        e && (e.onclick = function () {
                            l()("html, body").animate({
                                scrollTop: 0
                            }, 800)
                        })
                    }
                }, e.prototype.handleScrollToTop = function () {
                    var e = l()("#header"),
                        t = window.pageYOffset,
                        n = l()("#controlScrollTop");
                    if (e && n) {
                        var o = e.outerHeight();
                        t > o && n.fadeIn(), t < o && n.fadeOut()
                    }
                }, e.prototype.loadHeaderWrapperMenu = function () {
                    var e = this,
                        t = document.getElementsByClassName("btnAllMenu"),
                        n = document.getElementById("asideOverlayMenu"),
                        o = 0;
                    t && n && (Array.from(t).forEach((function (t) {
                        t.addEventListener("click", (function () {
                            var t = n.getAttribute("data-active");
                            return "false" === t && (n.setAttribute("data-active", "true"), document.body.classList.add("no-scroll"), document.body.style.height = "100%", document.body.style.overflow = "hidden", l()(n).fadeIn(300, (function () {
                                n.classList.add("show"), e.loadLogicScrollOverlayMenu()
                            }))), "true" === t && (n.setAttribute("data-active", "false"), document.body.classList.remove("no-scroll"), document.body.style.height = "", document.body.style.overflow = "", l()(n).fadeOut(300, (function () {
                                n.classList.remove("show"), e.resetLogicScrollOverlayMenu()
                            }))), !1
                        }))
                    })), window.addEventListener("load", (function (t) {
                        var n = window.innerWidth;
                        o = n, e.loadShowMoreCategoryOverlayMenu()
                    })), window.addEventListener("resize", (function (t) {
                        var n = window.innerWidth;
                        o != n && (o = n, e.resetLogicScrollOverlayMenu(), e.loadLogicScrollOverlayMenu(), e.loadShowMoreCategoryOverlayMenu())
                    })))
                }, e.prototype.heightAsideWrapperMenu = function () {
                    var e = new c.y,
                        t = document.getElementById("overlayWrapperMenu"),
                        n = document.getElementById("overlayWrapperNav");
                    if (t && n) {
                        var o = window.innerHeight - e.getHeight(n) + "px";
                        t.style.height = o
                    }
                }, e.prototype.loadLogicScrollOverlayMenu = function () {
                    var e = new c.y,
                        t = document.getElementById("overlayWrapperNav"),
                        n = document.getElementById("wrapperMenuHeader");
                    if (t && n) {
                        var o = window.innerWidth,
                            r = window.innerHeight,
                            a = e.getHeight(t),
                            i = e.getHeight(n);
                        if (o >= 768) {
                            var l = r - (a + i + 40),
                                s = document.getElementById("categoryMain");
                            if (!s) return;
                            var d = e.getHeight(s);
                            if (d >= l) {
                                var u = d + "px",
                                    p = l + "px";
                                !1 === s.classList.contains("perfect-scrollbar") && (s.style.height = u, s.style.maxHeight = p, s.classList.add("perfect-scrollbar"), e.overlayScrollbarInstance(s))
                            }
                            var y = document.getElementById("categoryOther");
                            if (!y) return;
                            var h = e.getHeight(y);
                            if (h >= l) {
                                u = h + "px", p = l + "px";
                                !1 === y.classList.contains("perfect-scrollbar") && (y.style.height = u, y.style.maxHeight = p, y.classList.add("perfect-scrollbar"), e.overlayScrollbarInstance(y))
                            }
                            return !0
                        }
                        if (o < 768) {
                            l = r - a;
                            var g = document.getElementById("overlayWrapperMenu");
                            if (!g) return;
                            var v = e.getHeight(g);
                            if (v >= l) {
                                u = v + "px", p = l + "px";
                                !1 === g.classList.contains("perfect-scrollbar") && (g.style.height = u, g.style.maxHeight = p, g.classList.add("perfect-scrollbar"), e.overlayScrollbarInstance(g))
                            }
                            return !0
                        }
                        return !1
                    }
                }, e.prototype.resetLogicScrollOverlayMenu = function () {
                    var e = new c.y,
                        t = document.getElementById("categoryMain"),
                        n = document.getElementById("categoryOther"),
                        o = document.getElementById("overlayWrapperMenu");
                    t && n && o && (e.resetScrollbar(t), e.resetScrollbar(n), e.resetScrollbar(o))
                }, e.prototype.loadShowMoreCategoryOverlayMenu = function () {
                    var e = new c.y,
                        t = 4;
                    window.innerWidth < 768 && (t = 2), e.tagULLIShowMore("ul.ulShowMore", t)
                }, e
            }())
        },
        951: (e, t, n) => {
            n.d(t, {
                y: () => i
            });
            var o = n(692),
                r = n.n(o),
                a = n(591),
                i = function () {
                    function e() { }
                    return e.prototype.resetScrollbar = function (e, t) {
                        return void 0 === t && (t = "perfect-scrollbar"), !0 === e.classList.contains(t) && (e.style.height = "auto", e.style.maxHeight = "100%", e.classList.remove(t), (0, a.ae)(e).destroy(), !0)
                    }, e.prototype.getHeight = function (e) {
                        var t = 0;
                        return e && (t = r()(e).outerHeight(!0), t = Math.ceil(t)), t
                    }, e.prototype.getWidth = function (e) {
                        var t = 0;
                        return e && (t = r()(e).outerWidth(!0), t = Math.ceil(t)), t
                    }, e.prototype.overlayScrollbarInstance = function (e) {
                        return (0, a.ae)({
                            target: e
                        }, {
                            overflow: {
                                x: "hidden"
                            },
                            scrollbars: {
                                autoHide: "leave",
                                autoHideDelay: 800
                            }
                        }).state().destroyed
                    }, e.prototype.tagULLIShowMore = function (e, t) {
                        return void 0 === t && (t = 4), r()(e).each((function () {
                            r()(this).find("li.item-action").remove();
                            var e = r()(this).find("li");
                            e.length > t && r()(this).append('<li class="item-action"><button type="button" class="btn btn-text btnShowMore">Xem...</button></li>'), r().each(e, (function (e, n) {
                                !0 === r()(n).hasClass("toggle") && (r()(n).show(), r()(n).removeClass("toggle")), e < t || (r()(n).addClass("toggle"), r()(n).hide())
                            }))
                        })), r()(e).off("click"), r()(e).on("click", ".btnShowMore", (function () {
                            return r()(this).hasClass("less") ? r()(this).text("Xem...").removeClass("less") : r()(this).text("Ẩn...").addClass("less"), r()(this).parent().siblings("li.toggle").slideToggle(), !1
                        })), !0
                    }, e
                }()
        }
    },
    e => {
        e.O(0, [96], (() => {
            return t = 586, e(e.s = t);
            var t
        }));
        e.O()
    }
]);