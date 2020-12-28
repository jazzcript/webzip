const AdmZip = require('adm-zip');

function webzip(url, fileName) {
    let download = function (url) {
        return new Promise(function (resolve, reject) {
            const isSecure = url.substr(0, 5) === 'https';
            const request = require('http' + (isSecure ? 's' : ''));

            request.get(url, {encoding: null}, function (res) {
                let buffer = [];
				res.on('data', (data) => {
					buffer.push(data);
				});
				res.on('end', () => {
					resolve(Buffer.concat(buffer));
				});
            });
        });
    };

    let unzip = function (buffer) {
        return new Promise(function (resolve, reject) {
            let resolved = false;

            let zip = new AdmZip(buffer);
            let zipEntries = zip.getEntries();

            for (zipEntry of zipEntries) {
                if (zipEntry.entryName == fileName) {
                    resolved = true;
                    resolve(zipEntry.getData());
                    break;
                }
            }

            if (!resolved) {
                reject(new Error('No file found in archive: ' + fileName));
            }
        });
    };

    return download(url).then(unzip);
}

module.exports = webzip;