/**
* @OnlyCurrentDoc
*/

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
    .addItem('Start workflow', 'showBar')
    .addToUi();
}

function showBar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Publish Over Drive');
  DocumentApp.getUi().showSidebar(ui);
}

function upload() {
  Logger.log("started uploading..")
  var ui = DocumentApp.getUi();
  var blob = generatePdf(ui);
  
  var url = "xxx";
  
  if( blob != -1) {
    url = publishOverDrive(blob);
    ui.alert('Your PDF file is uploaded');
  } else {
    ui.alert('Request has been cancelled.');
  }
  return url;
}

function generatePdf(ui) {
  
  doc = DocumentApp.getActiveDocument();
  
  var result = ui.alert(
      'Save As PDF?',
      'Save current document (Name:'+doc.getName()+'.pdf) as PDF',
      ui.ButtonSet.YES_NO);
  
  if (result == ui.Button.YES) {
    docblob = DocumentApp.getActiveDocument().getAs('application/pdf');
    docblob.setName(doc.getName() + ".pdf");
    return docblob;
  } else { 
    return -1;
  }
  
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
  
  // Does file exist?
  if (existing.hasNext()) {
  
    file = existing.next(); 
    
    // Updates file metadata and/or content with the Drive API
    Drive.Files.update({
      title: file.getName(), mimeType: file.getMimeType()
    }, file.getId(), docblob);
    
  } else {
    file = folder.createFile(docblob);
  }
  Logger.log(file.getUrl());
  return file.getUrl();
}
