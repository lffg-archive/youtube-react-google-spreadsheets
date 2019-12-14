/* eslint-disable no-unused-vars, no-var, no-undef */

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(req) {
  var lock = LockService.getDocumentLock();
  var isLocked = lock.tryLock(10 * 1000); // 10s de timeout.

  try {
    if (!isLocked) {
      throw new Error('Error in lock timeout.');
    }

    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('RESULT_LIST');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    var newRow = headers.map(function(header) {
      if (header === 'TIMESTAMP') {
        return new Date().toLocaleString('pt-BR'); // Date.now().toString();
      } else {
        var input = req.parameter[header];
        if (!input) {
          throw new Error('Invalid data. The ' + header + ' param is missing.');
        }
        return input;
      }
    });

    var nextRow = sheet.getLastRow() + 1;

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return sendJSON({
      result: 'success',
      row: nextRow
    });
  } catch (error) {
    return sendJSON({
      result: 'error',
      error: error
    });
  } finally {
    lock.releaseLock();
  }
}

function sendJSON(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}
