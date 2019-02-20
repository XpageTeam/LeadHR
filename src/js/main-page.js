import fullpage from "./fullpage.js"
import is from "is_js"
import {TweenLite} from "gsap/TweenMax"

if (document.querySelector("body").classList.contains("main"))
	require("../css/fullpage.css")

document.addEventListener("DOMContentLoaded", e => {
	if (!document.body.classList.contains("main"))
		return

	let anchors = [],
		anchItems = document.querySelectorAll("[data-anchor]"),
		isFirstLaunch = true;

	if (!anchItems.length)
		return

	for (var anch of anchItems)
		anchors.push(anch.getAttribute("data-anchor"))

	if (!is.mobile())
		window.fullpage = new fullpage("#content", {
			// licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
			//Навигация
			menu: '.navigation',
			lockAnchors: false,
			anchors: anchors,
			navigation: true,
			navigationPosition: 'right',
			// navigationTooltips: ['firstSlide', 'secondSlide'],
			showActiveTooltip: false,
			slidesNavigation: false,
			slidesNavPosition: 'bottom',

			//Скроллинг
			css3: true,
			scrollingSpeed: 800,
			autoScrolling: true,
			fitToSection: true,
			fitToSectionDelay: 1000,
			scrollBar: false,
			easing: 'easeInOutCubic',
			easingcss3: 'ease',
			loopBottom: false,
			loopTop: false,
			loopHorizontal: true,
			continuousVertical: false,
			continuousHorizontal: false,
			scrollHorizontally: false,
			interlockedSlides: false,
			dragAndMove: false,
			offsetSections: false,
			resetSliders: false,
			fadingEffect: false,
			// normalScrollElements: '#element1, .element2',
			scrollOverflow: false,
			scrollOverflowReset: false,
			scrollOverflowOptions: null,
			touchSensitivity: 15,
			normalScrollElementTouchThreshold: 5,
			bigSectionsDestination: null,

			//Доступ
			keyboardScrolling: true,
			animateAnchor: true,
			recordHistory: true,

			//Дизайн
			controlArrows: true,
			verticalCentered: true,
			// sectionsColor : ['#ccc', '#fff'],
			paddingTop: $(".head").outerHeight() + "px",
			paddingBottom: '0',
			fixedElements: '#navigation',
			responsiveWidth: 300,
			responsiveHeight: 0,
			responsiveSlides: false,
			parallax: false,
			parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

			//Настроить селекторы
			sectionSelector: '.page',
			slideSelector: '.slidesdfsdfdsf',

			lazyLoading: true,

			//события
			onLeave: function(origin, destination, direction){
			},
			afterLoad: function(origin, destination, direction){
				document.body.classList.remove("loading")
				document.body.classList.add("loaded")

				;(function(){
					let main = document.querySelector("#content"),
						sheetsSvg = document.querySelector(".main-decor__sheets");

					if (!main || !sheetsSvg)
						return

					main.addEventListener("mousemove", e => {
						let pos = {
					      x: 0,
					      y: 0,
					    };

					    pos.x = (e.pageX - sheetsSvg.clientWidth / 2) * -1 / 55;
					    pos.y = (e.pageY - sheetsSvg.clientHeight / 2) * -1 / 55;

					    sheetsSvg.style.transform = "translate3d("+pos.x+"px, "+pos.y+"px, 0)"
					})
				})()

			},
			afterRender: function(){},
			afterResize: function(width, height){},
			afterResponsive: function(isResponsive){},
			afterSlideLoad: function(section, origin, destination, direction){},
			onSlideLeave: function(section, origin, destination, direction){
				
			}
		})
	else{
		document.body.classList.remove("loading")
		document.body.classList.add("loaded")
	}
})