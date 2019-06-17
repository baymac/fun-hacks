 /**
 * @OnlyCurrentDoc
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 */

function onOpen(e) {
  var menu = DocumentApp.getUi().createAddonMenu();
  Logger.log(e.authMode);
  menu.addItem('Start workflow', 'showBar');
  menu.addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showBar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Publish Over Drive');
  DocumentApp.getUi().showSidebar(ui);
}

function upload() {
  Logger.log("started uploading..")
  var ui = DocumentApp.getUi();
  var blob = generatePdf();
  
  var url = "xxx";
  
  url = publishOverDrive(blob);
  
  return url;
}

function generatePdf() {
  var ui = DocumentApp.getUi();
  var doc = DocumentApp.getActiveDocument();
  
  docblob = DocumentApp.getActiveDocument().getAs('application/pdf');
  docblob.setName(doc.getName() + ".pdf");
  return docblob;
}

function publishOverDrive(docblob) {
  
  var parentFolder = DriveApp.getRootFolder();
  var folder, folders = parentFolder.getFoldersByName('Proposal');
  var file;
  
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = parentFolder.createFolder('Proposal'); 
  }
  
  var existing = folder.getFilesByName(docblob.getName());
  
  
  if (existing.hasNext()) {
  
    file = existing.next(); 
    
    Drive.Files.update({
      title: file.getName(), mimeType: file.getMimeType()
    }, file.getId(), docblob);
    
  } else {
    file = folder.createFile(docblob);
  }
  Logger.log(file.getUrl());
  return file.getUrl();
}
