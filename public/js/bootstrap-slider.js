/* =======================================================
                      VERSION  6.0.10              
========================================================= */
"use strict";function _typeof(a){return a&&typeof Symbol!=="undefined"&&a.constructor===Symbol?"symbol":typeof a}
/* =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&module.exports){var c;try{c=require("jquery")}catch(b){c=null}module.exports=a(c)}else{if(window){window.Slider=a(window.jQuery)}}}})(function(b){var a;(function(e){var f=Array.prototype.slice;function d(){}function c(h){if(!h){return}function j(k){if(k.prototype.option){return}k.prototype.option=function(l){if(!h.isPlainObject(l)){return}this.options=h.extend(true,this.options,l)}}var g=typeof console==="undefined"?d:function(k){console.error(k)};function i(k,l){h.fn[k]=function(p){if(typeof p==="string"){var o=f.call(arguments,1);for(var q=0,n=this.length;q<n;q++){var s=this[q];var m=h.data(s,k);if(!m){g("cannot call methods on "+k+" prior to initialization; attempted to call '"+p+"'");continue}if(!h.isFunction(m[p])||p.charAt(0)==="_"){g("no such method '"+p+"' for "+k+" instance");continue}var r=m[p].apply(m,o);if(r!==undefined&&r!==m){return r}}return this}else{var t=this.map(function(){var u=h.data(this,k);if(u){u.option(p);u._init()}else{u=new l(this,p);h.data(this,k,u)}return h(this)});if(!t||t.length>1){return t}else{return t[0]}}}}h.bridget=function(k,l){j(l);i(k,l)};return h.bridget}c(e)})(b);(function(M){var t={formatInvalidInputErrorMsg:function q(al){return"Invalid input value '"+al+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"};var S={linear:{toValue:function m(av){var ao=av/100*(this.options.max-this.options.min);var aq=true;if(this.options.ticks_positions.length>0){var aw,ar,am,al=0;for(var ap=1;ap<this.options.ticks_positions.length;ap++){if(av<=this.options.ticks_positions[ap]){aw=this.options.ticks[ap-1];am=this.options.ticks_positions[ap-1];ar=this.options.ticks[ap];al=this.options.ticks_positions[ap];break}}var an=(av-am)/(al-am);ao=aw+an*(ar-aw);aq=false}var au=aq?this.options.min:0;var at=au+Math.round(ao/this.options.step)*this.options.step;if(at<this.options.min){return this.options.min}else{if(at>this.options.max){return this.options.max}else{return at}}},toPercentage:function F(ap){if(this.options.max===this.options.min){return 0}if(this.options.ticks_positions.length>0){var am,al,aq,ao=0;for(var an=0;an<this.options.ticks.length;an++){if(ap<=this.options.ticks[an]){am=an>0?this.options.ticks[an-1]:0;aq=an>0?this.options.ticks_positions[an-1]:0;al=this.options.ticks[an];ao=this.options.ticks_positions[an];break}}if(an>0){var ar=(ap-am)/(al-am);return aq+ar*(ao-aq)}}return 100*(ap-this.options.min)/(this.options.max-this.options.min)}},logarithmic:{toValue:function m(am){var an=this.options.min===0?0:Math.log(this.options.min);var al=Math.log(this.options.max);var ao=Math.exp(an+(al-an)*am/100);ao=this.options.min+Math.round((ao-this.options.min)/this.options.step)*this.options.step;if(ao<this.options.min){return this.options.min}else{if(ao>this.options.max){return this.options.max}else{return ao}}},toPercentage:function F(ao){if(this.options.max===this.options.min){return 0}else{var al=Math.log(this.options.max);var an=this.options.min===0?0:Math.log(this.options.min);var am=ao===0?0:Math.log(ao);return 100*(am-an)/(al-an)}}}};a=function(am,al){C.call(this,am,al);return this};function C(ap,at){this._state={value:null,enabled:null,offset:null,size:null,percentage:null,inDrag:false,over:false};if(typeof ap==="string"){this.element=document.querySelector(ap)}else{if(ap instanceof HTMLElement){this.element=ap}}at=at?at:{};var aC=Object.keys(this.defaultOptions);for(var aH=0;aH<aC.length;aH++){var az=aC[aH];var aM=at[az];aM=typeof aM!=="undefined"?aM:aL(this.element,az);aM=aM!==null?aM:this.defaultOptions[az];if(!this.options){this.options={}}this.options[az]=aM}if(this.options.orientation==="vertical"&&(this.options.tooltip_position==="top"||this.options.tooltip_position==="bottom")){this.options.tooltip_position="right"}else{if(this.options.orientation==="horizontal"&&(this.options.tooltip_position==="left"||this.options.tooltip_position==="right")){this.options.tooltip_position="top"}}function aL(aP,aR){var aO="data-slider-"+aR.replace(/_/g,"-");var aN=aP.getAttribute(aO);try{return JSON.parse(aN)}catch(aQ){return aN}}var aE=this.element.style.width;var ao=false;var aB=this.element.parentNode;var av;var am,au;var an;var aD;if(this.sliderElem){ao=true}else{this.sliderElem=document.createElement("div");this.sliderElem.className="slider";var al=document.createElement("div");al.className="slider-track";am=document.createElement("div");am.className="slider-track-low";av=document.createElement("div");av.className="slider-selection";au=document.createElement("div");au.className="slider-track-high";an=document.createElement("div");an.className="slider-handle min-slider-handle";an.setAttribute("role","slider");an.setAttribute("aria-valuemin",this.options.min);an.setAttribute("aria-valuemax",this.options.max);aD=document.createElement("div");aD.className="slider-handle max-slider-handle";aD.setAttribute("role","slider");aD.setAttribute("aria-valuemin",this.options.min);aD.setAttribute("aria-valuemax",this.options.max);al.appendChild(am);al.appendChild(av);al.appendChild(au);var aA=Array.isArray(this.options.labelledby);if(aA&&this.options.labelledby[0]){an.setAttribute("aria-labelledby",this.options.labelledby[0])}if(aA&&this.options.labelledby[1]){aD.setAttribute("aria-labelledby",this.options.labelledby[1])}if(!aA&&this.options.labelledby){an.setAttribute("aria-labelledby",this.options.labelledby);aD.setAttribute("aria-labelledby",this.options.labelledby)}this.ticks=[];if(Array.isArray(this.options.ticks)&&this.options.ticks.length>0){for(aH=0;aH<this.options.ticks.length;aH++){var aI=document.createElement("div");aI.className="slider-tick";this.ticks.push(aI);al.appendChild(aI)}av.className+=" tick-slider-selection"}al.appendChild(an);al.appendChild(aD);this.tickLabels=[];if(Array.isArray(this.options.ticks_labels)&&this.options.ticks_labels.length>0){this.tickLabelContainer=document.createElement("div");this.tickLabelContainer.className="slider-tick-label-container";for(aH=0;aH<this.options.ticks_labels.length;aH++){var ay=document.createElement("div");var aF=this.options.ticks_positions.length===0;var aK=this.options.reversed&&aF?this.options.ticks_labels.length-(aH+1):aH;ay.className="slider-tick-label";ay.innerHTML=this.options.ticks_labels[aK];this.tickLabels.push(ay);this.tickLabelContainer.appendChild(ay)}}var aw=function aw(aO){var aP=document.createElement("div");aP.className="tooltip-arrow";var aN=document.createElement("div");aN.className="tooltip-inner";aO.appendChild(aP);aO.appendChild(aN)};var ax=document.createElement("div");ax.className="tooltip tooltip-main";ax.setAttribute("role","presentation");aw(ax);var aq=document.createElement("div");aq.className="tooltip tooltip-min";aq.setAttribute("role","presentation");aw(aq);var ar=document.createElement("div");ar.className="tooltip tooltip-max";ar.setAttribute("role","presentation");aw(ar);this.sliderElem.appendChild(al);this.sliderElem.appendChild(ax);this.sliderElem.appendChild(aq);this.sliderElem.appendChild(ar);if(this.tickLabelContainer){this.sliderElem.appendChild(this.tickLabelContainer)}aB.insertBefore(this.sliderElem,this.element);this.element.style.display="none"}if(M){this.$element=M(this.element);this.$sliderElem=M(this.sliderElem)}this.eventToCallbackMap={};this.sliderElem.id=this.options.id;this.touchCapable="ontouchstart" in window||window.DocumentTouch&&document instanceof window.DocumentTouch;this.tooltip=this.sliderElem.querySelector(".tooltip-main");this.tooltipInner=this.tooltip.querySelector(".tooltip-inner");this.tooltip_min=this.sliderElem.querySelector(".tooltip-min");this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner");this.tooltip_max=this.sliderElem.querySelector(".tooltip-max");this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner");if(S[this.options.scale]){this.options.scale=S[this.options.scale]}if(ao===true){this._removeClass(this.sliderElem,"slider-horizontal");this._removeClass(this.sliderElem,"slider-vertical");this._removeClass(this.tooltip,"hide");this._removeClass(this.tooltip_min,"hide");this._removeClass(this.tooltip_max,"hide");["left","top","width","height"].forEach(function(aN){this._removeProperty(this.trackLow,aN);this._removeProperty(this.trackSelection,aN);this._removeProperty(this.trackHigh,aN)},this);[this.handle1,this.handle2].forEach(function(aN){this._removeProperty(aN,"left");this._removeProperty(aN,"top")},this);[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(aN){this._removeProperty(aN,"left");this._removeProperty(aN,"top");this._removeProperty(aN,"margin-left");this._removeProperty(aN,"margin-top");this._removeClass(aN,"right");this._removeClass(aN,"top")},this)}if(this.options.orientation==="vertical"){this._addClass(this.sliderElem,"slider-vertical");this.stylePos="top";this.mousePos="pageY";this.sizePos="offsetHeight"}else{this._addClass(this.sliderElem,"slider-horizontal");this.sliderElem.style.width=aE;this.options.orientation="horizontal";this.stylePos="left";this.mousePos="pageX";this.sizePos="offsetWidth"}this._setTooltipPosition();if(Array.isArray(this.options.ticks)&&this.options.ticks.length>0){this.options.max=Math.max.apply(Math,this.options.ticks);this.options.min=Math.min.apply(Math,this.options.ticks)}if(Array.isArray(this.options.value)){this.options.range=true;this._state.value=this.options.value}else{if(this.options.range){this._state.value=[this.options.value,this.options.max]}else{this._state.value=this.options.value}}this.trackLow=am||this.trackLow;this.trackSelection=av||this.trackSelection;this.trackHigh=au||this.trackHigh;if(this.options.selection==="none"){this._addClass(this.trackLow,"hide");this._addClass(this.trackSelection,"hide");this._addClass(this.trackHigh,"hide")}this.handle1=an||this.handle1;this.handle2=aD||this.handle2;if(ao===true){this._removeClass(this.handle1,"round triangle");this._removeClass(this.handle2,"round triangle hide");for(aH=0;aH<this.ticks.length;aH++){this._removeClass(this.ticks[aH],"round triangle hide")}}var aJ=["round","triangle","custom"];var aG=aJ.indexOf(this.options.handle)!==-1;if(aG){this._addClass(this.handle1,this.options.handle);this._addClass(this.handle2,this.options.handle);for(aH=0;aH<this.ticks.length;aH++){this._addClass(this.ticks[aH],this.options.handle)}}this._state.offset=this._offset(this.sliderElem);this._state.size=this.sliderElem[this.sizePos];this.setValue(this._state.value);this.handle1Keydown=this._keydown.bind(this,0);this.handle1.addEventListener("keydown",this.handle1Keydown,false);this.handle2Keydown=this._keydown.bind(this,1);this.handle2.addEventListener("keydown",this.handle2Keydown,false);this.mousedown=this._mousedown.bind(this);if(this.touchCapable){this.sliderElem.addEventListener("touchstart",this.mousedown,false)}this.sliderElem.addEventListener("mousedown",this.mousedown,false);this.resize=this._resize.bind(this);window.addEventListener("resize",this.resize,false);if(this.options.tooltip==="hide"){this._addClass(this.tooltip,"hide");this._addClass(this.tooltip_min,"hide");this._addClass(this.tooltip_max,"hide")}else{if(this.options.tooltip==="always"){this._showTooltip();this._alwaysShowTooltip=true}else{this.showTooltip=this._showTooltip.bind(this);this.hideTooltip=this._hideTooltip.bind(this);this.sliderElem.addEventListener("mouseenter",this.showTooltip,false);this.sliderElem.addEventListener("mouseleave",this.hideTooltip,false);this.handle1.addEventListener("focus",this.showTooltip,false);this.handle1.addEventListener("blur",this.hideTooltip,false);this.handle2.addEventListener("focus",this.showTooltip,false);this.handle2.addEventListener("blur",this.hideTooltip,false)}}if(this.options.enabled){this.enable()}else{this.disable()}}a.prototype={_init:function ad(){},constructor:a,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:false,selection:"before",tooltip:"show",tooltip_split:false,handle:"round",reversed:false,enabled:true,formatter:function r(al){if(Array.isArray(al)){return al[0]+" : "+al[1]}else{return al}},natural_arrow_keys:false,ticks:[],ticks_positions:[],ticks_labels:[],ticks_snap_bounds:0,scale:"linear",focus:false,tooltip_position:null,labelledby:null},getElement:function Q(){return this.sliderElem},getValue:function R(){if(this.options.range){return this._state.value}else{return this._state.value[0]}},setValue:function P(aq,ao,an){if(!aq){aq=0}var am=this.getValue();this._state.value=this._validateInputValue(aq);var al=this._applyPrecision.bind(this);if(this.options.range){this._state.value[0]=al(this._state.value[0]);this._state.value[1]=al(this._state.value[1]);this._state.value[0]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[0]));this._state.value[1]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[1]))}else{this._state.value=al(this._state.value);this._state.value=[Math.max(this.options.min,Math.min(this.options.max,this._state.value))];this._addClass(this.handle2,"hide");if(this.options.selection==="after"){this._state.value[1]=this.options.max}else{this._state.value[1]=this.options.min}}if(this.options.max>this.options.min){this._state.percentage=[this._toPercentage(this._state.value[0]),this._toPercentage(this._state.value[1]),this.options.step*100/(this.options.max-this.options.min)]}else{this._state.percentage=[0,0,100]}this._layout();var ap=this.options.range?this._state.value:this._state.value[0];this._setDataVal(ap);if(ao===true){this._trigger("slide",ap)}if(am!==ap&&an===true){this._trigger("change",{oldValue:am,newValue:ap})}return this},destroy:function aa(){this._removeSliderEventHandlers();this.sliderElem.parentNode.removeChild(this.sliderElem);this.element.style.display="";this._cleanUpEventCallbacksMap();this.element.removeAttribute("data");if(M){this._unbindJQueryEventHandlers();this.$element.removeData("slider")}},disable:function p(){this._state.enabled=false;this.handle1.removeAttribute("tabindex");this.handle2.removeAttribute("tabindex");this._addClass(this.sliderElem,"slider-disabled");this._trigger("slideDisabled");return this},enable:function u(){this._state.enabled=true;this.handle1.setAttribute("tabindex",0);this.handle2.setAttribute("tabindex",0);this._removeClass(this.sliderElem,"slider-disabled");this._trigger("slideEnabled");return this},toggle:function H(){if(this._state.enabled){this.disable()}else{this.enable()}return this},isEnabled:function ab(){return this._state.enabled},on:function L(al,am){this._bindNonQueryEventHandler(al,am);return this},off:function X(al,am){if(M){this.$element.off(al,am);this.$sliderElem.off(al,am)}else{this._unbindNonQueryEventHandler(al,am)}},getAttribute:function N(al){if(al){return this.options[al]}else{return this.options}},setAttribute:function h(al,am){this.options[al]=am;return this},refresh:function ai(){this._removeSliderEventHandlers();C.call(this,this.element,this.options);if(M){M.data(this.element,"slider",this)}return this},relayout:function W(){this._layout();return this},_removeSliderEventHandlers:function i(){this.handle1.removeEventListener("keydown",this.handle1Keydown,false);this.handle2.removeEventListener("keydown",this.handle2Keydown,false);if(this.showTooltip){this.handle1.removeEventListener("focus",this.showTooltip,false);this.handle2.removeEventListener("focus",this.showTooltip,false)}if(this.hideTooltip){this.handle1.removeEventListener("blur",this.hideTooltip,false);this.handle2.removeEventListener("blur",this.hideTooltip,false)}if(this.showTooltip){this.sliderElem.removeEventListener("mouseenter",this.showTooltip,false)}if(this.hideTooltip){this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,false)}this.sliderElem.removeEventListener("touchstart",this.mousedown,false);this.sliderElem.removeEventListener("mousedown",this.mousedown,false);window.removeEventListener("resize",this.resize,false)},_bindNonQueryEventHandler:function A(al,am){if(this.eventToCallbackMap[al]===undefined){this.eventToCallbackMap[al]=[]}this.eventToCallbackMap[al].push(am)},_unbindNonQueryEventHandler:function T(al,ao){var an=this.eventToCallbackMap[al];if(an!==undefined){for(var am=0;am<an.length;am++){if(an[am]===ao){an.splice(am,1);break}}}},_cleanUpEventCallbacksMap:function Y(){var an=Object.keys(this.eventToCallbackMap);for(var am=0;am<an.length;am++){var al=an[am];this.eventToCallbackMap[al]=null}},_showTooltip:function v(){if(this.options.tooltip_split===false){this._addClass(this.tooltip,"in");this.tooltip_min.style.display="none";this.tooltip_max.style.display="none"}else{this._addClass(this.tooltip_min,"in");this._addClass(this.tooltip_max,"in");this.tooltip.style.display="none"}this._state.over=true},_hideTooltip:function D(){if(this._state.inDrag===false&&this.alwaysShowTooltip!==true){this._removeClass(this.tooltip,"in");this._removeClass(this.tooltip_min,"in");this._removeClass(this.tooltip_max,"in")}this._state.over=false},_layout:function ac(){var aw;if(this.options.reversed){aw=[100-this._state.percentage[0],this.options.range?100-this._state.percentage[1]:this._state.percentage[1]]}else{aw=[this._state.percentage[0],this._state.percentage[1]]}this.handle1.style[this.stylePos]=aw[0]+"%";this.handle1.setAttribute("aria-valuenow",this._state.value[0]);this.handle2.style[this.stylePos]=aw[1]+"%";this.handle2.setAttribute("aria-valuenow",this._state.value[1]);if(Array.isArray(this.options.ticks)&&this.options.ticks.length>0){var al=this.options.orientation==="vertical"?"height":"width";var au=this.options.orientation==="vertical"?"marginTop":"marginLeft";var an=this._state.size/(this.options.ticks.length-1);if(this.tickLabelContainer){var at=0;if(this.options.ticks_positions.length===0){if(this.options.orientation!=="vertical"){this.tickLabelContainer.style[au]=-an/2+"px"}at=this.tickLabelContainer.offsetHeight}else{for(ap=0;ap<this.tickLabelContainer.childNodes.length;ap++){if(this.tickLabelContainer.childNodes[ap].offsetHeight>at){at=this.tickLabelContainer.childNodes[ap].offsetHeight}}}if(this.options.orientation==="horizontal"){this.sliderElem.style.marginBottom=at+"px"}}for(var ap=0;ap<this.options.ticks.length;ap++){var ax=this.options.ticks_positions[ap]||this._toPercentage(this.options.ticks[ap]);if(this.options.reversed){ax=100-ax}this.ticks[ap].style[this.stylePos]=ax+"%";this._removeClass(this.ticks[ap],"in-selection");if(!this.options.range){if(this.options.selection==="after"&&ax>=aw[0]){this._addClass(this.ticks[ap],"in-selection")}else{if(this.options.selection==="before"&&ax<=aw[0]){this._addClass(this.ticks[ap],"in-selection")}}}else{if(ax>=aw[0]&&ax<=aw[1]){this._addClass(this.ticks[ap],"in-selection")}}if(this.tickLabels[ap]){this.tickLabels[ap].style[al]=an+"px";if(this.options.orientation!=="vertical"&&this.options.ticks_positions[ap]!==undefined){this.tickLabels[ap].style.position="absolute";this.tickLabels[ap].style[this.stylePos]=ax+"%";this.tickLabels[ap].style[au]=-an/2+"px"}else{if(this.options.orientation==="vertical"){this.tickLabels[ap].style.marginLeft=this.sliderElem.offsetWidth+"px";this.tickLabelContainer.style.marginTop=this.sliderElem.offsetWidth/2*-1+"px"}}}}}var ao;if(this.options.range){ao=this.options.formatter(this._state.value);this._setText(this.tooltipInner,ao);this.tooltip.style[this.stylePos]=(aw[1]+aw[0])/2+"%";if(this.options.orientation==="vertical"){this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px")}else{this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px")}if(this.options.orientation==="vertical"){this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px")}else{this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px")}var av=this.options.formatter(this._state.value[0]);this._setText(this.tooltipInner_min,av);var aq=this.options.formatter(this._state.value[1]);this._setText(this.tooltipInner_max,aq);this.tooltip_min.style[this.stylePos]=aw[0]+"%";if(this.options.orientation==="vertical"){this._css(this.tooltip_min,"margin-top",-this.tooltip_min.offsetHeight/2+"px")}else{this._css(this.tooltip_min,"margin-left",-this.tooltip_min.offsetWidth/2+"px")}this.tooltip_max.style[this.stylePos]=aw[1]+"%";if(this.options.orientation==="vertical"){this._css(this.tooltip_max,"margin-top",-this.tooltip_max.offsetHeight/2+"px")}else{this._css(this.tooltip_max,"margin-left",-this.tooltip_max.offsetWidth/2+"px")}}else{ao=this.options.formatter(this._state.value[0]);this._setText(this.tooltipInner,ao);this.tooltip.style[this.stylePos]=aw[0]+"%";if(this.options.orientation==="vertical"){this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px")}else{this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px")}}if(this.options.orientation==="vertical"){this.trackLow.style.top="0";this.trackLow.style.height=Math.min(aw[0],aw[1])+"%";this.trackSelection.style.top=Math.min(aw[0],aw[1])+"%";this.trackSelection.style.height=Math.abs(aw[0]-aw[1])+"%";this.trackHigh.style.bottom="0";this.trackHigh.style.height=100-Math.min(aw[0],aw[1])-Math.abs(aw[0]-aw[1])+"%"}else{this.trackLow.style.left="0";this.trackLow.style.width=Math.min(aw[0],aw[1])+"%";this.trackSelection.style.left=Math.min(aw[0],aw[1])+"%";this.trackSelection.style.width=Math.abs(aw[0]-aw[1])+"%";this.trackHigh.style.right="0";this.trackHigh.style.width=100-Math.min(aw[0],aw[1])-Math.abs(aw[0]-aw[1])+"%";var am=this.tooltip_min.getBoundingClientRect();var ar=this.tooltip_max.getBoundingClientRect();if(this.options.tooltip_position==="bottom"){if(am.right>ar.left){this._removeClass(this.tooltip_max,"bottom");this._addClass(this.tooltip_max,"top");this.tooltip_max.style.top="";this.tooltip_max.style.bottom=22+"px"}else{this._removeClass(this.tooltip_max,"top");this._addClass(this.tooltip_max,"bottom");this.tooltip_max.style.top=this.tooltip_min.style.top;this.tooltip_max.style.bottom=""}}else{if(am.right>ar.left){this._removeClass(this.tooltip_max,"top");this._addClass(this.tooltip_max,"bottom");this.tooltip_max.style.top=18+"px"}else{this._removeClass(this.tooltip_max,"bottom");this._addClass(this.tooltip_max,"top");this.tooltip_max.style.top=this.tooltip_min.style.top}}}},_resize:function K(al){this._state.offset=this._offset(this.sliderElem);this._state.size=this.sliderElem[this.sizePos];this._layout()},_removeProperty:function l(al,am){if(al.style.removeProperty){al.style.removeProperty(am)}else{al.style.removeAttribute(am)}},_mousedown:function g(am){if(!this._state.enabled){return false}this._state.offset=this._offset(this.sliderElem);this._state.size=this.sliderElem[this.sizePos];var al=this._getPercentage(am);if(this.options.range){var ap=Math.abs(this._state.percentage[0]-al);var ao=Math.abs(this._state.percentage[1]-al);this._state.dragged=ap<ao?0:1}else{this._state.dragged=0}this._state.percentage[this._state.dragged]=al;this._layout();if(this.touchCapable){document.removeEventListener("touchmove",this.mousemove,false);document.removeEventListener("touchend",this.mouseup,false)}if(this.mousemove){document.removeEventListener("mousemove",this.mousemove,false)}if(this.mouseup){document.removeEventListener("mouseup",this.mouseup,false)}this.mousemove=this._mousemove.bind(this);this.mouseup=this._mouseup.bind(this);if(this.touchCapable){document.addEventListener("touchmove",this.mousemove,false);document.addEventListener("touchend",this.mouseup,false)}document.addEventListener("mousemove",this.mousemove,false);document.addEventListener("mouseup",this.mouseup,false);this._state.inDrag=true;var an=this._calculateValue();this._trigger("slideStart",an);this._setDataVal(an);this.setValue(an,false,true);this._pauseEvent(am);if(this.options.focus){this._triggerFocusOnHandle(this._state.dragged)}return true},_triggerFocusOnHandle:function aj(al){if(al===0){this.handle1.focus()}if(al===1){this.handle2.focus()}},_keydown:function ae(ap,ao){if(!this._state.enabled){return false}var an;switch(ao.keyCode){case 37:case 40:an=-1;break;case 39:case 38:an=1;break}if(!an){return}if(this.options.natural_arrow_keys){var al=this.options.orientation==="vertical"&&!this.options.reversed;var am=this.options.orientation==="horizontal"&&this.options.reversed;if(al||am){an=-an}}var aq=this._state.value[ap]+an*this.options.step;if(this.options.range){aq=[!ap?aq:this._state.value[0],ap?aq:this._state.value[1]]}this._trigger("slideStart",aq);this._setDataVal(aq);this.setValue(aq,true,true);this._setDataVal(aq);this._trigger("slideStop",aq);this._layout();this._pauseEvent(ao);return false},_pauseEvent:function z(al){if(al.stopPropagation){al.stopPropagation()}if(al.preventDefault){al.preventDefault()}al.cancelBubble=true;al.returnValue=false},_mousemove:function s(am){if(!this._state.enabled){return false}var al=this._getPercentage(am);this._adjustPercentageForRangeSliders(al);this._state.percentage[this._state.dragged]=al;this._layout();var an=this._calculateValue(true);this.setValue(an,true,true);return false},_adjustPercentageForRangeSliders:function w(an){if(this.options.range){var am=this._getNumDigitsAfterDecimalPlace(an);am=am?am-1:0;var al=this._applyToFixedAndParseFloat(an,am);if(this._state.dragged===0&&this._applyToFixedAndParseFloat(this._state.percentage[1],am)<al){this._state.percentage[0]=this._state.percentage[1];this._state.dragged=1}else{if(this._state.dragged===1&&this._applyToFixedAndParseFloat(this._state.percentage[0],am)>al){this._state.percentage[1]=this._state.percentage[0];this._state.dragged=0}}}},_mouseup:function o(){if(!this._state.enabled){return false}if(this.touchCapable){document.removeEventListener("touchmove",this.mousemove,false);document.removeEventListener("touchend",this.mouseup,false)}document.removeEventListener("mousemove",this.mousemove,false);document.removeEventListener("mouseup",this.mouseup,false);this._state.inDrag=false;if(this._state.over===false){this._hideTooltip()}var al=this._calculateValue(true);this._layout();this._setDataVal(al);this._trigger("slideStop",al);return false},_calculateValue:function J(al){var ap;if(this.options.range){ap=[this.options.min,this.options.max];if(this._state.percentage[0]!==0){ap[0]=this._toValue(this._state.percentage[0]);ap[0]=this._applyPrecision(ap[0])}if(this._state.percentage[1]!==100){ap[1]=this._toValue(this._state.percentage[1]);ap[1]=this._applyPrecision(ap[1])}}else{ap=this._toValue(this._state.percentage[0]);ap=parseFloat(ap);ap=this._applyPrecision(ap)}if(al){var an=[ap,Infinity];for(var am=0;am<this.options.ticks.length;am++){var ao=Math.abs(this.options.ticks[am]-ap);if(ao<=an[1]){an=[this.options.ticks[am],ao]}}if(an[1]<=this.options.ticks_snap_bounds){return an[0]}}return ap},_applyPrecision:function x(am){var al=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.options.step);return this._applyToFixedAndParseFloat(am,al)},_getNumDigitsAfterDecimalPlace:function f(am){var al=(""+am).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);if(!al){return 0}return Math.max(0,(al[1]?al[1].length:0)-(al[2]?+al[2]:0))},_applyToFixedAndParseFloat:function af(am,al){var an=am.toFixed(al);return parseFloat(an)},_getPercentage:function n(an){if(this.touchCapable&&(an.type==="touchstart"||an.type==="touchmove")){an=an.touches[0]}var am=an[this.mousePos];var ap=this._state.offset[this.stylePos];var ao=am-ap;var al=ao/this._state.size*100;al=Math.round(al/this._state.percentage[2])*this._state.percentage[2];if(this.options.reversed){al=100-al}return Math.max(0,Math.min(100,al))},_validateInputValue:function ak(al){if(typeof al==="number"){return al}else{if(Array.isArray(al)){this._validateArray(al);return al}else{throw new Error(t.formatInvalidInputErrorMsg(al))}}},_validateArray:function U(an){for(var am=0;am<an.length;am++){var al=an[am];if(typeof al!=="number"){throw new Error(t.formatInvalidInputErrorMsg(al))}}},_setDataVal:function e(al){this.element.setAttribute("data-value",al);this.element.setAttribute("value",al);this.element.value=al},_trigger:function d(al,ap){ap=ap||ap===0?ap:undefined;var ao=this.eventToCallbackMap[al];if(ao&&ao.length){for(var an=0;an<ao.length;an++){var am=ao[an];am(ap)}}if(M){this._triggerJQueryEvent(al,ap)}},_triggerJQueryEvent:function j(al,an){var am={type:al,value:an};this.$element.trigger(am);this.$sliderElem.trigger(am)},_unbindJQueryEventHandlers:function y(){this.$element.off();this.$sliderElem.off()},_setText:function G(al,am){if(typeof al.innerText!=="undefined"){al.innerText=am}else{if(typeof al.textContent!=="undefined"){al.textContent=am}}},_removeClass:function E(an,ap){var am=ap.split(" ");var ar=an.className;for(var al=0;al<am.length;al++){var aq=am[al];var ao=new RegExp("(?:\\s|^)"+aq+"(?:\\s|$)");ar=ar.replace(ao," ")}an.className=ar.trim()},_addClass:function ag(an,ap){var am=ap.split(" ");var at=an.className;for(var al=0;al<am.length;al++){var ar=am[al];var ao=new RegExp("(?:\\s|^)"+ar+"(?:\\s|$)");var aq=ao.test(at);if(!aq){at+=" "+ar}}an.className=at.trim()},_offsetLeft:function O(al){return al.getBoundingClientRect().left},_offsetTop:function B(am){var al=am.offsetTop;while((am=am.offsetParent)&&!isNaN(am.offsetTop)){al+=am.offsetTop}return al},_offset:function ah(al){return{left:this._offsetLeft(al),top:this._offsetTop(al)}},_css:function Z(ao,al,an){if(M){M.style(ao,al,an)}else{var am=al.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(ap,aq){return aq.toUpperCase()});ao.style[am]=an}},_toValue:function I(al){return this.options.scale.toValue.apply(this,[al])},_toPercentage:function k(al){return this.options.scale.toPercentage.apply(this,[al])},_setTooltipPosition:function c(){var al=[this.tooltip,this.tooltip_min,this.tooltip_max];if(this.options.orientation==="vertical"){var am=this.options.tooltip_position||"right";var an=am==="left"?"right":"left";al.forEach((function(ao){this._addClass(ao,am);ao.style[an]="100%"}).bind(this))}else{if(this.options.tooltip_position==="bottom"){al.forEach((function(ao){this._addClass(ao,"bottom");ao.style.top=22+"px"}).bind(this))}else{al.forEach((function(ao){this._addClass(ao,"top");ao.style.top=-this.tooltip.outerHeight-14+"px"}).bind(this))}}}};if(M){var V=M.fn.slider?"bootstrapSlider":"slider";M.bridget(V,a)}})(b);return a});