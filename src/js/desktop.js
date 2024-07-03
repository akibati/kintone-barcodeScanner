const jQuery = require('jquery');
const Kuc = require('kintone-ui-component');
const Quagga = require('@ericblade/quagga2').default;

jQuery.noConflict();
(function ($, PLUGIN_ID) {
  // プラグイン設定情報の取得
  /*
  const config = kintone.plugin.app.getConfig(PLUGIN_ID) || {};
  if (Object.keys(config).length === 0) {
    return;
  }
  */
  /*
  const barcodeButtonId = config.barcodeButton_spaceId;
  const barcodeCanvasId = config.barcodeCanvas_spaceId;
  const barcodeFieldCode = config.barcode_fieldCode;
  */
  const barcodeButtonId = 'spc_button';
  const canvasId = 'spc_canvas';
  const barcodeFieldCode = 'barcode';

  let BarcodeReader = function () {
    let my = this;
    let div = $('<div>').css({
      'box-sizing': 'border-box',
    });
    /* append elements */
    this.cover = div.clone(true).css({
      'background-color': 'rgba(0,0,0,0.5)',
      display: 'none',
      height: '100%',
      left: '0px',
      position: 'fixed',
      top: '0px',
      width: '100%',
      'z-index': '999999',
    });
    this.container = div.clone(true).css({
      'background-color': '#FFFFFF',
      bottom: '0',
      'border-radius': '5px',
      'box-shadow': '0px 0px 3px rgba(0,0,0,0.35)',
      height: '640px',
      left: '0',
      margin: 'auto',
      'max-height': 'calc(100% - 1em)',
      'max-width': 'calc(100% - 1em)',
      padding: '5px 5px 45px 5px',
      position: 'absolute',
      right: '0',
      top: '0',
      width: '600px',
    });
    this.contents = div.clone(true).css({
      height: '100%',
      margin: '0px',
      overflow: 'hidden',
      padding: '0px',
      position: 'relative',
      width: '100%',
      'z-index': '888',
    });
    this.buttons = div.clone(true).css({
      'background-color': '#3498db',
      'border-bottom-left-radius': '5px',
      'border-bottom-right-radius': '5px',
      bottom: '0px',
      left: '0px',
      padding: '5px',
      position: 'absolute',
      'text-align': 'center',
      width: '100%',
      'z-index': '999',
    });
    $('body').append(
      this.cover.append(
        this.container
          .append(
            this.contents.append(
              $('<video muted playsinline>').attr('id', 'barcodevideo').css({
                'box-sizing': 'border-box',
                height: '100%',
                width: '100%',
              }),
            ),
          )
          .append(
            this.buttons.append(
              $('<button>')
                .css({
                  'background-color': 'transparent',
                  border: 'none',
                  'box-sizing': 'border-box',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  'font-size': '13px',
                  height: 'auto',
                  'line-height': '30px',
                  margin: '0px',
                  outline: 'none',
                  padding: '0px 1em',
                  'vertical-align': 'top',
                  width: 'auto',
                })
                .text('キャンセル')
                .on('click', function () {
                  my.hide();
                }),
            ),
          ),
      ),
    );
  };

  BarcodeReader.prototype = {
    /* show reader */
    show: function (callback) {
      let my = this;
      let video = document.getElementById('barcodevideo');
      let getbarcode = function () {
        if (video.autoplay)
          setTimeout(function () {
            let canvas = document.createElement('canvas');
            canvas.height = video.offsetHeight;
            canvas.width = video.offsetWidth;
            canvas
              .getContext('2d')
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            Quagga.decodeSingle(
              {
                locator: {
                  patchSize: 'large',
                  halfSample: false,
                },
                decoder: {
                  readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
                },
                numOfWorker: 1,
                locate: true,
                src: canvas.toDataURL('image/png'),
              },
              function (result) {
                if (result) {
                  if (result.codeResult) {
                    callback(result.codeResult.code);
                    my.hide();
                  } else getbarcode();
                } else getbarcode();
              },
            );
          }, 250);
      };
      let getstream = function () {
        let constraints =
          availableDevice() !== 'other'
            ? { audio: false, video: { facingMode: { exact: 'environment' } } }
            : { audio: false, video: true };
        if (navigator.mediaDevices === undefined) navigator.mediaDevices = {};
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            let getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia)
              return new Promise(function (resolve, reject) {
                reject(
                  Error(
                    '現在利用中のブラウザはストリーミング機能をサポートしておりません。',
                  ),
                );
              });
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        return navigator.mediaDevices.getUserMedia(constraints);
      };
      video.autoplay = true;
      video.setAttribute('playsinline', '');
      getstream()
        .then(function (stream) {
          video.srcObject = stream;
          getbarcode();
          my.cover.show();
        })
        .catch(function (e) {
          alert(e);
        });
    },
    /* hide reader */
    hide: function () {
      let video = document.getElementById('barcodevideo');
      video.autoplay = false;
      this.cover.hide();
    },
  };
  let availableDevice = () => {
    let ua = navigator.userAgent;
    if (
      ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPod') > 0 ||
      (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) ||
      ua.indexOf('Windows Phone') > 0
    )
      return 'sp';
    if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) return 'tab';
    return 'other';
  };

  const barcodeReader = new BarcodeReader();

  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], () => {
    const spButton = kintone.app.record.getSpaceElement(barcodeButtonId);
    const scanButton = new Kuc.Button({
      text: 'スキャン',
    });

    scanButton.addEventListener('click', () => {
      barcodeReader.show((value) => {
        let record = kintone.app.record.get();
        record.record[barcodeFieldCode].value = value;
        kintone.app.record.set(record);
      });
    });

    spButton.appendChild(scanButton);
  });
})(jQuery, kintone.$PLUGIN_ID);
