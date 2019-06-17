 /**
 * @OnlyCurrentDoc
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 */

function onOpen(e) {
  var menu = SlidesApp.getUi().createAddonMenu();
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
  SlidesApp.getUi().showSidebar(ui);
}

function upload() {
  Logger.log("started uploading..")
  var blob = generatePdf();
  
  var url = "xxx";
  
  url = publishOverDrive(blob);
  
  return url;
}

function generatePdf() {
  var id = SlidesApp.getActivePresentation().getId();
  var slideblob = DriveApp.getFileById(id).getAs('application/pdf');
  var name = SlidesApp.getActivePresentation().getName();
  Logger.log(slideblob)
  slideblob.setName(name + ".pdf");
  return slideblob;
}

function publishOverDrive(slideblob) {
  
  var parentFolder = DriveApp.getRootFolder();
  var folder, folders = parentFolder.getFoldersByName('slides'); // TODO: change the folder name
  var file;
  
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = parentFolder.createFolder('slides'); // TODO: change the folder name
  }
  
  var existing = folder.getFilesByName(slideblob.getName());
  
  if (existing.hasNext()) {
  
    file = existing.next(); 
    
    Drive.Files.update({
      title: file.getName(), mimeType: file.getMimeType()
    }, file.getId(), slideblob);
    
  } else {
    file = folder.createFile(slideblob);
  }
  Logger.log(file.getUrl());
  return file.getUrl();
}
