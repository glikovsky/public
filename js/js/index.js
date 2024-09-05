$(function() {
	
	'use strict';
	
	let defer = $.Deferred();

	let conf = {}
	$.getJSON("./conf.json", (data) => {
		conf = data;
		defer.resolve();
	})

	defer.promise().then(function() {
		// URLからコンテンツを表示
		let c = $(location).attr("search").replace("?c=", "");
		if (c.length === 0) {
			c = "home";
		}
		load_contents($("#" + c));
	});

	/* コンテンツを表示する関数
	item: index.htmlのbody>header>nav>ulタグの中にあるli要素
	*/
	function load_contents(item) {
		const title_const = conf.title;
		let id = $(item).attr("id");
		let title = title_const;
		if (id !== "") {
			title = $(item).html() + " | " + title_const;
		}

		let file = "./contents/home.html";
		if (id !== "") {
			file = "./contents/" + id + ".html";
		}

		$("title").html(title);

		$("main").load(file);
	}

	// モバイルデバイスの場合に表示するバーガーメニューの動作
	$(".nav_toggle").click(function() {
		$("nav").toggleClass("nav_active");
		$(".nav_toggle").children().toggleClass("active");
	})
});
