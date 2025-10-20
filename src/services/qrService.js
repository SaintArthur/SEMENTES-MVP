const QRCode = require('qrcode');
exports.generateDataUrl = async (text) => QRCode.toDataURL(text, { margin: 2 });