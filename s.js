const { exec } = require("child_process");
const { dialog } = require("electron").remote;


function createOptions(message) {
  return {
    buttons: ["Ok"],
    message,
  };
}

 function convert() {
   let files = dialog.showOpenDialogSync({ properties:["openFile"]})
  if (files[0] === undefined) {
    dialog.showMessageBox(createOptions("Please Select a file to convert"));
  } else {
    
   
    dialog.showMessageBox(createOptions("Starting conversion..."));
    exec(
      `soffice --convert-to pdf ${files[0]}  --headless --outdir ./converted-files`,
      //select folder to save
      (error, stdout, stderr) => {
        if (error) {
          dialog.showMessageBox(createOptions(`error: ${error.message}`));
          return;
        }
        if (stderr) {
          dialog.showMessageBox(createOptions(`stderr: ${stderr}`));
          return;
        }
        if (stdout.includes("Overwriting")) {
          dialog.showMessageBox(
            createOptions("File already exists! Overwriting...")
          );
        } else {
          dialog.showMessageBox(createOptions("Conversion Complete"));
        }
      }
    );
  }
}
