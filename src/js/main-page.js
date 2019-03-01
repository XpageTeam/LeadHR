import fullpage from "./fullpage.js"
import is from "is_js"
import customEase from "./CustomEase.js"
import {TweenLite} from "gsap/TweenMax"

if (document.querySelector("body").classList.contains("main"))
	require("../css/fullpage.css")

require("./MorphSVGPlugin.min.js")

const myEase = CustomEase.create("custom", "M0,0 C0.126,0.382 0.162,0.822 0.362,0.906 0.586,1 0.818,1 1,1");
let currentPlaneState = 0;

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

	const planes = document.querySelectorAll("#smallPlane, #midPlane, #botPlane"),
		ways = document.querySelectorAll("#ways path");

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
				const nextScreenIndex = destination.index;

				if (direction != "down" || currentPlaneState >= nextScreenIndex)
					return

				currentPlaneState = nextScreenIndex

				console.log(currentPlaneState)

				switch (nextScreenIndex){
					case 1:
						let isMorphed = false;

						wayAnimating(planes[0], ways[1], 2, tween => {
							if (tween.progress() >= 0.09 && !isMorphed){
								let planeWings = planes[0].querySelectorAll("path"),
									completeWings = planes[1].querySelectorAll("path");

								for (let i = 0; i < planeWings.length; i++)
									TweenLite.to(planeWings[i], .8, {
										morphSVG: completeWings[i],
										onUpdate(){
											let pos = smallPlane.getBoundingClientRect();
											
											planes[0].style.transformOrigin = Math.round(pos.width / 8) + "px " + Math.round(pos.height / 8) + "px"
										}
									})

								isMorphed = true
							}
						}, myEase)

					break;

					case 2:


					break;
				}
			},
			afterRender(){
				let {width, height} = getElementSizes(planes[0]);
				planes[0].style.transformOrigin = Math.round(width / 4) + "px " + Math.round(height / 4) + "px"
				
				TweenLite.set(planes[0], {
					scale: 0,
				})

				setTimeout(e => {
					document.body.classList.remove("loading")
					document.body.classList.add("loaded")
				}, 200)

				TweenLite.to(planes[0], 1, {
					scale: 1
				})

				wayAnimating(planes[0], ways[0], 0, _ => {}, myEase)


				;(function(){
					let main = document.querySelector("#content"),
						sheetsSvg = document.querySelector(".main-decor__sheets");

					if (!main || !sheetsSvg)
						return

					main.addEventListener("mousemove", e => {
						let pos = {};

					    pos.x = (e.pageX - sheetsSvg.clientWidth / 2) * -1 / 55;
					    pos.y = (e.pageY - sheetsSvg.clientHeight / 2) * -1 / 55;

					    TweenLite.to(sheetsSvg, 3, {
					    	x: pos.x,
					    	y: pos.y
					    })
					})
				})()
			},
			afterResize: function(width, height){},
			afterResponsive: function(isResponsive){},
		})
	else{
		document.body.classList.remove("loading")
		document.body.classList.add("loaded")
	}
})

document.addEventListener("DOMContentLoaded", e => {
	;(function(){

		// MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline, #big");


		const planes = document.querySelectorAll("#smallPlane, #midPlane, #botPlane"),
			ways = document.querySelectorAll("#ways path")

		let pos = smallPlane.getBoundingClientRect();
		
		planes[0].style.transformOrigin = Math.round(pos.width / 2) + "px " + Math.round(pos.height / 2) + "px"

		let path = MorphSVGPlugin.pathDataToBezier(ways[0], {
			align: planes[0],
		});
		
		TweenLite.set(planes[0], {
			scale: 0,
		})

		TweenLite.to(planes[0], 1, {
			scale: 1
		})


		TweenLite.to(planes[0], 4,{
			bezier: {
				values: path,
				type: "cubic",
				autoRotate: 0
			},
			onComplete(){
				path = MorphSVGPlugin.pathDataToBezier(ways[1], {
					align: planes[0],
				})

				let isMorphed = false;

				let tween = TweenLite.to(planes[0], 3, {
					bezier: {
						values: path,
						type: "cubic",
						autoRotate: 0
					},
					onUpdate: function(){
						if (this.progress() >= 0.25 && !isMorphed){
							let planeWings = planes[0].querySelectorAll("path"),
								completeWings = planes[1].querySelectorAll("path");

							for (let i = 0; i < planeWings.length; i++)
								TweenLite.to(planeWings[i], 1, {
									morphSVG: completeWings[i],
									onUpdate(){
										let pos = smallPlane.getBoundingClientRect();
										
										planes[0].style.transformOrigin = Math.round(pos.width / 8) + "px " + Math.round(pos.height / 8) + "px"
									}
								})

							isMorphed = true
						}
					},
				})
			},
			ease: myEase
		})
	})
})

const wayAnimating = (plane, way, rotateFix = 0, onUpdate = _ => {}, ease = false) => {
	let path = getPath(way, plane);

	let config = {
		bezier: {
			values: path,
			type: "cubic",
			autoRotate: rotateFix
		},
		onUpdate(){
			onUpdate(this)
		},
		onComplete(){
			window.currentTween = false
		}
	};

	if (ease)
		config.ease = ease

	if (window.currentTween){
		window.currentTween.kill()

		window.currentTween = TweenLite.to(plane, .1, {
			x: path[0].x,
			y: path[0].y,
			onComplete(){
				window.currentTween = TweenLite.to(plane, 4, config)
			}
		})

		return
	}

	window.currentTween = TweenLite.to(plane, 4, config)
},
getPath = (way, alignItem) => MorphSVGPlugin.pathDataToBezier(way, {
	align: alignItem,
}),
getElementSizes = element => ({
	width: element.getBoundingClientRect().width,
	height: element.getBoundingClientRect().height 
})