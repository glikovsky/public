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
		let c = $(location).attr("search");
		load_contents($("a.nav_item[href='./" + c + "']"));
	});

	/* コンテンツを表示する関数
	item: index.htmlのbody>header>nav>ulタグの中にあるli要素
	*/
	function load_contents(item) {
		const title_const = conf.title;
		let id = $(item).attr("href").replace("./", "").replace("?c=", "");
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
	$("#nav_toggle").click(function() {
		$(this).toggleClass("open");
		$("#global_nav").slideToggle();
	})
});
