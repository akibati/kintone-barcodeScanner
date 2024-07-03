/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/***/ (() => {

eval("(function (PLUGIN_ID) {\n  const formEl = document.querySelector('.js-submit-settings');\n  const cancelButtonEl = document.querySelector('.js-cancel-button');\n  const messageEl = document.querySelector('.js-text-message');\n  if (!(formEl && cancelButtonEl && messageEl)) {\n    throw new Error('Required elements do not exist.');\n  }\n\n  const config = kintone.plugin.app.getConfig(PLUGIN_ID);\n  if (config.message) {\n    messageEl.value = config.message;\n  }\n\n  formEl.addEventListener('submit', (e) => {\n    e.preventDefault();\n    kintone.plugin.app.setConfig({ message: messageEl.value }, () => {\n      alert('The plug-in settings have been saved. Please update the app!');\n      window.location.href = '../../flow?app=' + kintone.app.getId();\n    });\n  });\n\n  cancelButtonEl.addEventListener('click', () => {\n    window.location.href = '../../' + kintone.app.getId() + '/plugin/';\n  });\n})(kintone.$PLUGIN_ID);\n\n\n//# sourceURL=webpack://kintone-barcodeScanner/./src/js/config.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/config.js"]();
/******/ 	
/******/ })()
;