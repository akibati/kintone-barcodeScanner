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

eval("(function (PLUGIN_ID) {\n  // エスケープ処理\n  const escapeHtml = (htmlstr) => {\n    return htmlstr\n      .replace(/&/g, '&amp;')\n      .replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;')\n      .replace(/\"/g, '&quot;')\n      .replace(/'/g, '&#39;')\n      .replace(/\\n/g, '&#xA;');\n  };\n\n  // 設定画面のフォーム情報を取得\n  const barcodeButton_spaceId_FormData = document.getElementById(\n    'barcodeButton-spaceId',\n  );\n  const barcode_fieldCode_FormData =\n    document.getElementById('barcode-fieldCode');\n\n  // プラグイン設定情報を取得\n  var config = kintone.plugin.app.getConfig(PLUGIN_ID);\n\n  // プラグインの設定情報に値があれば初期値として表示\n  barcodeButton_spaceId_FormData.value = config.barcodeButton_spaceId || '';\n  barcode_fieldCode_FormData.value = config.barcode_fieldCode || '';\n\n  const appId = kintone.app.getId();\n\n  // 保存\n  const saveButton = document.getElementById('submit');\n  saveButton.addEventListener('click', () => {\n    const barcodeButton_spaceId = escapeHtml(\n      barcodeButton_spaceId_FormData.value,\n    );\n    const barcode_fieldCode = escapeHtml(barcode_fieldCode_FormData.value);\n\n    if (barcodeButton_spaceId === '' || barcode_fieldCode === '') {\n      alert('必須項目が入力されていません');\n      return;\n    }\n    console.log(barcode_fieldCode);\n    // 設定の保存\n    const newConfig = {\n      barcodeButton_spaceId,\n      barcode_fieldCode,\n    };\n    kintone.plugin.app.setConfig(newConfig, () => {\n      window.location.href = `/k/admin/app/flow?app=${appId}`;\n    });\n  });\n\n  // キャンセル\n  const cancelButton = document.getElementById('cancel');\n  cancelButton.addEventListener('click', () => {\n    window.location.href = `/k/admin/app/${appId}/plugin/`;\n  });\n})(kintone.$PLUGIN_ID);\n\n\n//# sourceURL=webpack://kintone-barcodeScanner/./src/js/config.js?");

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