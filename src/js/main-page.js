import fullpage from "./fullpage.js"
import is from "is_js"
import Span from "snapsvg"
import {TweenLite} from "gsap/TweenMax"

if (document.querySelector("body").classList.contains("main"))
	require("../css/fullpage.css")

require("./MorphSVGPlugin.min.js")

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

document.addEventListener("DOMContentLoaded", e => {
	;(function(){
		// let svg = document.querySelector(".line-svg svg");

		// if (!svg)
		// 	return

		// let s, path, length, circle;

		// s = Snap(svg)

		// path = svg.querySelector("path:first-child")

		// length = path.getTotalLength();

		// circle = s.circle(30,30,15)

		// circle.attr({
		//   fill: "#3f4445",
		//   stroke: "#25292a",
		//   strokeWidth: 3
		// })

		// let pointsArray = new Array();

		// length = Math.round(length)

		// for (let i = length / 2; i < length; i++){
		// 	let movePoint = path.getPointAtLength( i );

		//        pointsArray.push(movePoint)
		// }

		// circle.attr({ cx: pointsArray[0].x, cy: pointsArray[0].y })

		// let counter = 0, interval = setInterval(_ => {
		// 	circle.attr({ cx: pointsArray[counter].x, cy: pointsArray[counter].y })

		// 	if (counter >= length / 2)
		// 		clearInterval(interval)
		// 	else
		// 		counter++
		// }, 10)

		// setTimeout( function() {
		    // Snap.animate(0, length / 2, function( value ) {
		    //    let movePoint = path.getPointAtLength( value );

		    //    circle.attr({
		    //    	cx: movePoint.x,
		    //    	cy: movePoint.y
		    //    })

		    // }, 10000);
		// })

		MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline, #big");

		// TweenLite.to("#smallPlane", 2, {
		// 	morphSVG: "#midPlane"
		// })

	})()
})

class Canvas{
	set id(selector){
		this._id = selector
		this.el = document.querySelector(selector)

		this.updateSizes()
	}
	get id(){
		return this._id
	}

	set sizes(sizes){
		if (!sizes){
			this.error("Неверно переданы размеры")
			return
		}

		if (!sizes.width || !sizes.height){
			this.error("Неверно переданы размеры")
			return
		}

		this._sizes = sizes;

		this.el.setAttribute("width", !isNaN(sizes.width) ? Math.round(sizes.width) + "px" : sizes.width)
		this.el.setAttribute("height", !isNaN(sizes.height) ? Math.round(sizes.height) + "px" : sizes.height)
	}
	get sizes(){
		return this._siezes
	}

	constructor(id, name = "какой-то канвас"){
		this.name = name
		this.id = id

		this.context = this.el.getContext("2d")
	}

	printImage(src = "", pos = {top: 0, left: 0}){
		if (!src){
			this.error("Нет ссылки на картинку")
			return
		}

		let img = new Image(),
			ctx = this.context;

		img.src = src

		img.addEventListener("load", function(){
			

			ctx.drawImage(this, pos.top, pos.left)
		})
	}

	updateSizes(){
		let rect = this.el.closest("div").getBoundingClientRect()

		this.sizes = {
			width: rect.width,
			height: rect.height
		}

		console.log(this.sizes)
	}

	error(message){
		console.group(this.name)
			console.error(message)
		console.groupEnd()
	}
}




class navCanvas extends Canvas{
	printImage(src = "", pos = {top: 0, left: 0}){
		if (!src){
			this.error("Нет ссылки на картинку")
			return
		}

		let img = new Image(),
			ctx = this.context,
			sizes = this.sizes;

		img.src = src

		img.addEventListener("load", function(){
			let top = sizes.height / 2 - this.height / 2

			ctx.drawImage(this, top, pos.left)
		})
	}
}

// window.canvas = new navCanvas("#top-canvas", "Верхний")

// canvas.printImage("img/ico-man.svg")