(function (PLUGIN_ID) {
  // エスケープ処理
  const escapeHtml = (htmlstr) => {
    return htmlstr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '&#xA;');
  };

  // 設定画面のフォーム情報を取得
  const barcodeButton_spaceId_FormData = document.getElementById(
    'barcodeButton-spaceId',
  );
  const barcode_fieldCode_FormData =
    document.getElementById('barcode-fieldCode');

  // プラグイン設定情報を取得
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);

  // プラグインの設定情報に値があれば初期値として表示
  barcodeButton_spaceId_FormData.value = config.barcodeButton_spaceId || '';
  barcode_fieldCode_FormData.value = config.barcode_fieldCode || '';

  const appId = kintone.app.getId();

  // 保存
  const saveButton = document.getElementById('submit');
  saveButton.addEventListener('click', () => {
    const barcodeButton_spaceId = escapeHtml(
      barcodeButton_spaceId_FormData.value,
    );
    const barcode_fieldCode = escapeHtml(barcode_fieldCode_FormData.value);

    if (barcodeButton_spaceId === '' || barcode_filedCode === '') {
      alert('必須項目が入力されていません');
      return;
    }

    // 設定の保存
    const newConfig = {
      barcodeButton_spaceId,
      barcode_fieldCode,
    };
    kintone.plugin.app.setConfig(newConfig, () => {
      window.location.href = `/k/admin/app/flow?app=${appId}`;
    });
  });

  // キャンセル
  const cancelButton = document.getElementById('cancel');
  cancelButton.addEventListener('click', () => {
    window.location.href = `/k/admin/app/${appId}/plugin/`;
  });
})(kintone.$PLUGIN_ID);
