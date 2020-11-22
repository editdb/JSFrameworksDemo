<template>
    <div id="drop_zone" class="drop-zone" 
        v-my-on:dragover="dragover"
        v-my-on:dragleave="dragleave"
        v-my-on:drop="drop"
        >Drop file here
    </div>
</template>

<script>
export default {
  name: 'FileUploadDD',
  props: {
  },
  data() {
    return {
        fileBase64: ''
    }
  },
  methods: {
      dragover(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      },
      dragleave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      },
      drop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

  
        var files = evt.dataTransfer.files; // FileList object.
        var file = files[0];
        console.log("dropped " + file.name);

        // If we use onloadend, we need to check the readyState.
        var reader = new FileReader();
        var _this = this;
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                var fc = evt.target.result;

                _this.fileBase64 = btoa(fc);
                _this.$emit('fileReceived', _this.fileBase64);
                
            }
        };

        reader.readAsBinaryString(file);

      }
  },
  directives: {
    'my-on': {
        bind(el, binding) {
            let type = binding.arg;
            let myFunction = binding.value;
            el.addEventListener(type, myFunction);
        }
    }
  }
}

</script>

<style scoped>
.drop-zone {
    margin-top: 5px;
    border: 2px dashed #bbb;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    font: 20pt;
    color: #bbb;
}
</style>