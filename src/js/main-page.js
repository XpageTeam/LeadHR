import fullpage from "./fullpage.js"
import is from "is_js"
import customEase from "./CustomEase.js"
import {TweenLite} from "gsap/TweenMax"

if (document.querySelector("body").classList.contains("main"))
	require("../css/fullpage.css")

require("./MorphSVGPlugin.min.js")

const myEase = CustomEase.create("custom", "M0,0 C0.126,0.382 0.162,0.822 0.362,0.906 0.586,1 0.818,1 1,1"),
	resolutionsCutch = {
		first: 2.75,
		second: 6.5,
		thrid: 9.4,
		fourth: 7
	},
	pagesCount = document.querySelectorAll(".page").length;

const resizeSceneSvg = _ => {
	const elements = document.querySelectorAll("#scene"),
		main = document.querySelector("#content"),
		sceneContent = document.querySelector("#scene-content");

	if (window.matchMedia("screen and (min-width: 1920px)").matches)
	TweenLite.set(sceneContent, {
		y: -sceneContent.getBoundingClientRect().top - 100
	})

	// for (var element of elements){
		// element.setAttribute("width", main.clientWidth)
		// element.setAttribute("height", main.clientHeight * pagesCount)
	// }
};

window.addEventListener("resize", resizeSceneSvg)
window.addEventListener("load", resizeSceneSvg)


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

				switch (nextScreenIndex){
					case 1:
						let isMorphed = false;

						wayAnimating(planes[0], ways[1], 2, 4, tween => {
							if (tween.progress() >= 0.09 && !isMorphed){
								let planeWings = planes[0].querySelectorAll("path"),
									completeWings = planes[1].querySelectorAll("path");

								for (let i = 0; i < planeWings.length; i++)
									TweenLite.to(planeWings[i], .8, {
										morphSVG: completeWings[i],
										onUpdate(){
											updateTRO(planes[0], resolutionsCutch.second)
										}
									})

								isMorphed = true
							}
						}, myEase)

					break;

					case 2:
						wayAnimating(planes[0], ways[2], 12, 4, tween => {
							if (tween.progress() >= 0.09 && !isMorphed){
								let planeWings = planes[0].querySelectorAll("path"),
									completeWings = planes[2].querySelectorAll("path");

								for (let i = 0; i < planeWings.length; i++)
									TweenLite.to(planeWings[i], .8, {
										morphSVG: completeWings[i],
										onUpdate(){
											updateTRO(planes[0], resolutionsCutch.thrid)
										}
									})

								isMorphed = true
							}
						}, myEase)

					break;

					case 3:
						let lastMorph = false;

						wayAnimating(planes[0], ways[3], 12, .5, tween => {
							if (tween.progress() >= 0.09 && !isMorphed){
								let planeWings = planes[0].querySelectorAll("path"),
									completeWings = planes[2].querySelectorAll("path");

								for (let i = 0; i < planeWings.length; i++)
									TweenLite.to(planeWings[i], .8, {
										morphSVG: completeWings[i],
										onUpdate(){
											updateTRO(planes[0], resolutionsCutch.fourth)
										}
									})

								isMorphed = true
							}

							if (tween.progress() >= .3 && !lastMorph){
								let scaleStarted = false;

								TweenLite.to(planes[0], .5, {
									scale: 0,
									onUpdate(){
										if (!scaleStarted && this.progress() >= .7){

											;(function(){
												const resume = document.querySelector("#resume");

												if (!resume)
													return

												const resumeTitle = resume.querySelector("#resume-title"),
													resumeLines = resume.querySelectorAll("#resume-lines path"),
													resumePaper = resume.querySelector("#resume-paper"),
													resumeDots = {
														left: resume.querySelector("#resume-leftDot"),
														right: resume.querySelector("#resume-rightDot")
													};

												TweenLite.to(resumePaper, .3, {
													scale: 1,
													onComplete(){
														TweenLite.to(resumeTitle, .6, {
															opacity: 1
														})

														let i = 0;

														for (var line of resumeLines){
															TweenLite.to(line, .14, {
																scaleX: 1,
																delay: .1 * i,
																onComplete(){
																	if (i == resumeLines.length){
																		TweenLite.to(resumeDots.left, .3, {
																			scale: 1,
																			ease: Back.easeOut.config(4)
																		})

																		TweenLite.to(resumeDots.right, .3, {
																			scale: 1,
																			delay: .2,
																			ease: Back.easeOut.config(4)
																		})
																	}
																}
															})

															i++
														}
													},
													ease: Back.easeOut.config(1.8)
												})
											})()

											scaleStarted = true
										}
									}
								})

								lastMorph = true
							}
						}, Power1.easeOut)

					break;
				}
			},
			afterRender(){
				updateTRO(planes[0], resolutionsCutch.first)
				
				TweenLite.set(planes[0], {
					scale: 0,
				})

				setTimeout(e => {
					document.body.classList.remove("loading")
					document.body.classList.add("loaded")
				}, 200)

				TweenLite.to(planes[0], 1, {
					scale: 1,
					onUpdate(){
						updateTRO(planes[0], resolutionsCutch.first)
					}
				})

				wayAnimating(planes[0], ways[0], 0, 4, _ => {}, myEase)


				;(function(){
					let main = document.querySelector("#content"),
						sheetsSvg = document.querySelector("#sheets");

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

				;(function(){
					const resume = document.querySelector("#resume");

					if (!resume)
						return

					const resumeTitle = resume.querySelector("#resume-title"),
						resumeLines = resume.querySelectorAll("#resume-lines path"),
						resumePaper = resume.querySelector("#resume-paper"),
						resumeDots = {
							left: resume.querySelector("#resume-leftDot"),
							right: resume.querySelector("#resume-rightDot")
						};

					TweenLite.set(resumeTitle, {
						opacity: 0,
						transformOrigin: "center"
					})

					for (var line of resumeLines)
						TweenLite.set(line, {
							scaleX: 0,
						})

					TweenLite.set(resumeDots.left, {
						scale: 0,
						transformOrigin: "center"
					})

					TweenLite.set(resumeDots.right, {
						scale: 0,
						transformOrigin: "center"
					})

					TweenLite.set(resumePaper, {
						scale: 0,
						transformOrigin: "center"
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

const wayAnimating = (plane, way, rotateFix = 0, time = 4, onUpdate = _ => {}, ease = false) => {
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

		window.currentTween = TweenLite.to(plane, .2, {
			x: path[0].x,
			y: path[0].y,
			onComplete(){
				window.currentTween = TweenLite.to(plane, time, config)
			}
		})

		return
	}

	window.currentTween = TweenLite.to(plane, time, config)
},
getPath = (way, alignItem) => MorphSVGPlugin.pathDataToBezier(way, {
	align: alignItem,
}),
getElementSizes = element => ({
	width: element.getBoundingClientRect().width,
	height: element.getBoundingClientRect().height 
}),
updateTRO = (element, cutch) => {
	let {width, height} = getElementSizes(element);
	element.style.transformOrigin = (width / cutch / window.innerWidth * 100) + "vw " + (height / cutch / window.innerWidth * 100) + "vw"
}