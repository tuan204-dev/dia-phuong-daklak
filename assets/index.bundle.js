"use strict";
(self.webpackChunkphuyenonline = self.webpackChunkphuyenonline || []).push([
	[57], {
		951: (e, t, i) => {
			i.d(t, {
				y: () => r
			});
			var a = i(692),
				n = i.n(a),
				s = i(591),
				r = function() {
					function e() {}
					return e.prototype.resetScrollbar = function(e, t) {
						return void 0 === t && (t = "perfect-scrollbar"), !0 === e.classList.contains(t) && (e.style.height = "auto", e.style.maxHeight = "100%", e.classList.remove(t), (0, s.ae)(e).destroy(), !0)
					}, e.prototype.getHeight = function(e) {
						var t = 0;
						return e && (t = n()(e).outerHeight(!0), t = Math.ceil(t)), t
					}, e.prototype.getWidth = function(e) {
						var t = 0;
						return e && (t = n()(e).outerWidth(!0), t = Math.ceil(t)), t
					}, e.prototype.overlayScrollbarInstance = function(e) {
						return (0, s.ae)({
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
					}, e.prototype.tagULLIShowMore = function(e, t) {
						return void 0 === t && (t = 4), n()(e).each((function() {
							n()(this).find("li.item-action").remove();
							var e = n()(this).find("li");
							e.length > t && n()(this).append('<li class="item-action"><button type="button" class="btn btn-text btnShowMore">Xem...</button></li>'), n().each(e, (function(e, i) {
								!0 === n()(i).hasClass("toggle") && (n()(i).show(), n()(i).removeClass("toggle")), e < t || (n()(i).addClass("toggle"), n()(i).hide())
							}))
						})), n()(e).off("click"), n()(e).on("click", ".btnShowMore", (function() {
							return n()(this).hasClass("less") ? n()(this).text("Xem...").removeClass("less") : n()(this).text("Ẩn...").addClass("less"), n()(this).parent().siblings("li.toggle").slideToggle(), !1
						})), !0
					}, e
				}()
		},
		493: (e, t, i) => {
			var a = i(692),
				n = i.n(a),
				s = i(951);
			new(function() {
				function e() {
					this.loadScrollMultimedia()
				}
				return e.prototype.loadScrollMultimedia = function() {
					var e = n()('button[data-bs-toggle="tab"]'),
						t = this,
						i = new s.y,
						a = 0;
					n()(window).on("load", (function() {
						var i = window.innerWidth;
						a = i, e.each((function(e) {
							i >= 768 && this.addEventListener("shown.bs.tab", (function(e) {
								var i = e.target,
									a = n()(i).data("bs-target");
								t.handleScrollMultimedia(a)
							})), 0 === e && this.click()
						}))
					})), n()(window).resize((function() {
						var s = window.innerWidth;
						a != s && (a = s, e.each((function(e) {
							var a = n()(this).hasClass("active"),
								r = n()(this).attr("aria-selected");
							if (a && r) {
								var o = n()(this).data("bs-target");
								if (!1 !== n()(o).hasClass("active") && !1 !== n()(o).hasClass("show")) {
									var l = n()(o).find(".boxMultimediaNormal");
									1 == l.length && (i.resetScrollbar(l[0]), s >= 768 && t.handleScrollMultimedia(o))
								}
							}
						})))
					}))
				}, e.prototype.handleScrollMultimedia = function(e) {
					var t = n()(e).find(".boxMultimediaSpecial"),
						i = n()(e).find(".boxMultimediaNormal"),
						a = new s.y;
					if (1 == t.length && 1 == i.length) {
						var r = t.outerHeight();
						r = Math.ceil(r);
						var o = i.outerHeight();
						if ((o = Math.ceil(o)) >= r) {
							var l = r + "px",
								d = o + "px";
							!1 === i.hasClass("perfect-scrollbar") && (i.css({
								height: l
							}), i.css({
								maxHeight: d
							}), i.addClass("perfect-scrollbar"), a.overlayScrollbarInstance(i[0]))
						}
					}
				}, e.prototype.loadScrollMultimediaTypes = function() {
					var e = document.getElementById("wrapperScrollbar"),
						t = document.getElementById("groupMultimediaType"),
						i = new s.y;
					if (e) {
						window.addEventListener("load", (function(a) {
							window.innerWidth;
							if (t.offsetWidth < 600) {
								!1 === e.classList.contains("perfect-scrollbar") && (t.style.width = "600px", e.classList.add("perfect-scrollbar-y"), i.overlayScrollbarInstance(e))
							}
						}))
					}
				}, e
			}())
		},
		376: (e, t, i) => {
			var a = i(236),
				n = i(889),
				s = i(692),
				r = i.n(s),
				o = i(951);
			i(493), new(function() {
				function e() {
					this.loadSwiper(), this.loadQuickView(), this.loadScrollLeadership(), this.loadScrollMoreNew(), this.loadScrollPoliticsNews()
				}
				return e.prototype.loadSwiper = function() {
					window.addEventListener("load", (function(e) {
						new a.A("#swiperOtherNewBanner", {
							speed: 800,
							loop: !1,
							slidesPerView: 1,
							modules: [n.dK],
							pagination: {
								el: "#swiperPaginOtherNewBanner",
								clickable: !0
							}
						}), new a.A("#swiperBreakingNews", {
							speed: 800,
							loop: !1,
							slidesPerView: 1,
							slidesPerGroup: 1,
							spaceBetween: 15,
							modules: [n.dK, n.Ij],
							autoplay: {
								delay: 8e3,
								disableOnInteraction: !1
							},
							pagination: {
								el: "#swiperPaginBreakingNews",
								clickable: !0
							},
							breakpoints: {
								325: {
									slidesPerView: 1.5
								},
								475: {
									slidesPerView: 2
								},
								575: {
									slidesPerView: 2.5
								},
								680: {
									slidesPerView: 3
								},
								860: {
									slidesPerView: 3.5
								},
								992: {
									slidesPerView: 4,
									spaceBetween: 20
								},
								1200: {
									slidesPerView: 3,
									spaceBetween: 20
								}
							}
						}), new a.A("#swiperMagazine", {
							speed: 800,
							loop: !0,
							slidesPerView: 1,
							effect: "fade",
							fadeEffect: {
								crossFade: !0
							},
							modules: [n.dK, n.Ij, n._R],
							autoplay: {
								delay: 1e4,
								disableOnInteraction: !1
							},
							pagination: {
								el: "#swiperPaginationMagazine",
								clickable: !0
							}
						}), new a.A("#swiperCountry", {
							speed: 800,
							loop: !0,
							slidesPerView: 1,
							effect: "fade",
							fadeEffect: {
								crossFade: !0
							},
							modules: [n.dK, n.Ij, n._R],
							autoplay: {
								delay: 1e4,
								disableOnInteraction: !1
							},
							pagination: {
								el: "#swiperPaginationCountry",
								clickable: !0
							}
						}), new a.A("#swiperAds", {
							speed: 800,
							loop: !0,
							slidesPerView: 1,
							spaceBetween: 20,
							modules: [n.dK, n.Ij],
							autoplay: {
								delay: 1e4,
								disableOnInteraction: !1
							},
							pagination: {
								el: "#swiperPaginationAds",
								clickable: !0
							},
							breakpoints: {
								576: {
									slidesPerView: 1
								},
								768: {
									slidesPerView: 2
								},
								992: {
									slidesPerView: 3
								},
								1200: {
									slidesPerView: 4
								}
							}
						})
					}))
				}, e.prototype.loadQuickView = function() {
					var e = r()("#quickViewLeadershipPosts"),
						t = (r()("#leadershipContainer"), this),
						i = 0;
					window.addEventListener("load", (function(a) {
						var n = window.innerWidth;
						n >= 768 && e.prop("checked", !0), n < 768 && e.prop("checked", !1), t.handleGetStatusLeadershipPost(), i = n
					})), window.addEventListener("resize", (function(a) {
						var n = window.innerWidth;
						i != n && (n >= 768 && e.prop("checked", !0), n < 768 && e.prop("checked", !1), t.handleGetStatusLeadershipPost(), i = n)
					})), e.on("change", (function(e) {
						t.handleGetStatusLeadershipPost()
					}))
				}, e.prototype.handleGetStatusLeadershipPost = function() {
					var e = r()("#quickViewLeadershipPosts"),
						t = r()("#leadershipContainer");
					e.is(":checked") ? (t.show(), t.addClass("show")) : (t.hide(), t.removeClass("show"))
				}, e.prototype.loadScrollLeadership = function() {
					var e = new o.y,
						t = document.getElementById("mainNewPosts"),
						i = document.getElementById("leadershipPosts"),
						a = 0;
					if (t && i) {
						var n = function() {
								return e.overlayScrollbarInstance(i)
							},
							s = document.getElementById("leadershipHeader"),
							r = 0;
						window.addEventListener("load", (function(o) {
							var l = window.innerWidth;
							if (!(l < 1200)) {
								var d = e.getHeight(t),
									c = e.getHeight(i);
								if (s && (r = e.getHeight(s)), c + r >= d) {
									var h = d - r + "px",
										p = c - r + "px";
									!1 === i.classList.contains("perfect-scrollbar") && (i.style.height = h, i.style.maxHeight = p, i.classList.add("perfect-scrollbar"), n())
								}
								a = l
							}
						})), window.addEventListener("resize", (function(o) {
							var l = window.innerWidth;
							if (a != l) {
								if (e.resetScrollbar(i), l >= 1200) {
									var d = e.getHeight(t),
										c = e.getHeight(i);
									if (s && (r = e.getHeight(s)), c + r >= d) {
										var h = d - r + "px",
											p = c - r + "px";
										!1 === i.classList.contains("perfect-scrollbar") && (i.style.height = h, i.style.maxHeight = p, i.classList.add("perfect-scrollbar"), n())
									}
								}
								a = l
							}
						}))
					}
				}, e.prototype.loadScrollMoreNew = function() {
					var e = new o.y,
						t = document.getElementById("mainNewPosts"),
						i = document.getElementById("moreNewPosts"),
						a = 0;
					if (t && i) {
						var n = function() {
							return e.overlayScrollbarInstance(i)
						};
						window.addEventListener("load", (function(s) {
							var r = window.innerWidth;
							if (a = r, !(r < 768)) {
								var o = e.getHeight(t),
									l = e.getHeight(i);
								if (l >= o) {
									var d = l + "px",
										c = o + "px";
									!1 === i.classList.contains("perfect-scrollbar") && (i.style.height = d, i.style.maxHeight = c, i.classList.add("perfect-scrollbar"), n())
								}
							}
						})), window.addEventListener("resize", (function(s) {
							var r = window.innerWidth;
							if (a != r && (a = r, e.resetScrollbar(i), r >= 768)) {
								var o = e.getHeight(t),
									l = e.getHeight(i);
								if (l >= o) {
									var d = l + "px",
										c = o + "px";
									!1 === i.classList.contains("perfect-scrollbar") && (i.style.height = d, i.style.maxHeight = c, i.classList.add("perfect-scrollbar"), n())
								}
							}
						}))
					}
				}, e.prototype.loadScrollPoliticsNews = function() {
					var e = new o.y,
						t = document.getElementById("politicsNewsLeft"),
						i = document.getElementById("politicsNewsRight"),
						a = 0;
					if (t && i) {
						var n = function() {
							return e.overlayScrollbarInstance(t)
						};
						window.addEventListener("load", (function(s) {
							var r = window.innerWidth;
							if (a = r, !(r < 768)) {
								var o = e.getHeight(t),
									l = e.getHeight(i);
								if (o >= l) {
									var d = l + "px",
										c = o + "px";
									!1 === t.classList.contains("perfect-scrollbar") && (t.style.height = d, t.style.maxHeight = c, t.classList.add("perfect-scrollbar"), n())
								}
							}
						})), window.addEventListener("resize", (function(s) {
							var r = window.innerWidth;
							if (a != r && (a = r, e.resetScrollbar(t), r >= 768)) {
								var o = e.getHeight(t),
									l = e.getHeight(i);
								if (o >= l) {
									var d = l + "px",
										c = o + "px";
									!1 === t.classList.contains("perfect-scrollbar") && (t.style.height = d, t.style.maxHeight = c, t.classList.add("perfect-scrollbar"), n())
								}
							}
						}))
					}
				}, e
			}())
		}
	},
	e => {
		e.O(0, [96], (() => {
			return t = 376, e(e.s = t);
			var t
		}));
		e.O()
	}
]);
