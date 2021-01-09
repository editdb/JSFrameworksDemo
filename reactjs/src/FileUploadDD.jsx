import React from 'react';
import './FileUploadDD.css';

export default function FileUploadDD(props) {

  //const [fileBase64, setFileBase64] = React.useState("");

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
    reader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) { // DONE == 2
        var fc = evt.target.result;
        let fileBase64 = btoa(fc);
        props.onFileReceived(fileBase64);          
      }
    };

    reader.readAsBinaryString(file);

  }

/*
  directives: {
    'my-on': {
        bind(el, binding) {
            let type = binding.arg;
            let myFunction = binding.value;
            el.addEventListener(type, myFunction);
        }
    }
  }
*/

  return (
    <div id="drop_zone" className="drop-zone" 
        onDragOver={(e) => dragover(e)}
        onDragLeave={(e) => dragleave(e)}
        onDrop={(e) => drop(e)}
        >Drop file here
    </div>
  );
}