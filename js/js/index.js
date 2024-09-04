'use strict';

$(function() {
	const title_const = $("title").html();

	let c = $(location).attr("search").replace("?c=", "");
	if (c.length === 0) {
		c = "home";
	}
	load_contents($("#" + c));

	function load_contents(item) {
		let id = $(item).attr("id");
		let title = title_const;
		if (id !== "") {
			title = $(item).html() + " | " + title_const;
		}
		$("title").html(title);

		let file = "./contents/home.html";
		if (id !== "") {
			file = "./contents/" + id + ".html";
		}
		$("#main").load(file);

		let url = $(location).attr("pathname");
		if (id !== "" && id !== "home") {
			url = "?c=" + id;
		}
		history.replaceState(file, title, url);
	}

	$("nav .nav_item").click(function(event) {
		load_contents($(event.target));
	});
});
