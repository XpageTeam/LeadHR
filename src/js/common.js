import $ from "jquery"
// import is from "is_js"

// import "selectize/dist/js/selectize.min.js"

// import "slick-carousel"
import "./standart-page.js"
import "./main-page.js"

import "./forms.js"


window.$ = $;
window.jQuery = $;


// require("slick-carousel/slick/slick.css")


let scrollTimeout;

document.addEventListener("DOMContentLoaded", e => {
	require("./jquery.fancybox.js")
	require("../css/jquery.fancybox.css")
	
	$(".fancybox").fancybox({
		trapFocus: false,
		touch: false,
		buttons: ["fullscreen", "slideShow", "close"],
		beforeClose(instance, slide){

		}
	})

	
})