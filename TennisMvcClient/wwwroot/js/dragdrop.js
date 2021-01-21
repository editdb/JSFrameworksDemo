function setBlazorBase64Data(base64Data) {
    blazorInterop.dotNetReference.invokeMethodAsync("GetBase64SetMethodName")
        .then(response => {
            let methodName = response;  // e.g "SetPhoto"
            blazorInterop.dotNetReference.invokeMethodAsync(methodName, base64Data);
        });
}

function dragover(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function dragleave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
}

function drop(evt) {
    evt.preventDefault();
    evt.stopPropagation();


    var files = evt.dataTransfer.files; // FileList object.
    var file = files[0];
    console.log("dropped " + file.name);

    // If we use onloadend, we need to check the readyState.
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
            var fc = evt.target.result;
            let fileBase64 = btoa(fc);
            setBlazorBase64Data(fileBase64);
        }
    };

    reader.readAsBinaryString(file);

}
