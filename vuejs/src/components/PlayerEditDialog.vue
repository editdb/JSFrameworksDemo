<template>
  <md-dialog :md-active.sync="value" :md-close-on-esc="false" :md-click-outside-to-close="false"
    @md-opened="open">
  <md-dialog-content>
    
    <div style="padding-bottom: 20px;">
      <div style="display:inline-block; font-size: 1.5em; margin-top: 0.5em;">
      Edit Player
      </div>
      <span style="float:right;">
        <md-button class="md-raised" :disabled="($v.$invalid || !$v.$anyDirty)" @click="update()">Update</md-button>
        <md-button class="md-raised md-accent" @click="close()">Cancel</md-button>
      </span>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
          <label>Name</label>
          <md-input placeholder="Name" v-model="$v.player.Name.$model" required md-dense />
        </md-field>
        <div class="error" v-if="!$v.player.Name.required">Field is required</div>
        <div class="error" v-if="!$v.player.Name.minLength">Name must have at least {{$v.player.Name.$params.minLength.min}} letters.</div>
      </div>  

      <div class="md-layout-item half-width">  
        <md-field>
          <label>Country</label>
          <md-select placeholder="Country" v-model="$v.player.CountryId.$model" required md-dense >
            <md-option v-for="item in countries" :key="item.Id" :value="item.Id">{{item.Name}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
           <label>Handed</label>
           <md-select placeholder="Handed" v-model="$v.player.Handed.$model">
                <md-option></md-option>
                <md-option value="L">Left</md-option>
                <md-option value="R">Right</md-option>
            </md-select>
        </md-field>
      </div>

      <div class="md-layout-item half-width">
        <md-field>
          <label>Home town</label>
          <md-input placeholder="Home town" v-model="$v.player.HomeTown.$model" md-dense />
        </md-field>
      </div>  
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-datepicker v-model="$v.player.DobDMY.$model" md-immediately md-dense>
        <label>Date of birth</label>
          </md-datepicker>
      </div>  

      <div class="md-layout-item half-width">
        <md-field>
           <label>Gender</label>
           <md-select placeholder="Gender" v-model="$v.player.Gender.$model" required>
                <md-option value=""></md-option>
                <md-option value="F">Female</md-option>
                <md-option value="M">Male</md-option>
            </md-select>
        </md-field>
        <div class="error" v-if="!$v.player.Gender.required">Field is required</div>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item quarter-width">
        <md-field>
          <label>Height feet</label>
          <md-input placeholder="Height feet" v-model.number="$v.player.HeightFeet.$model" type="number" min="4" max="8" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">
        <md-field>
          <label>inches</label>
          <md-input placeholder="inches" v-model.number="$v.player.HeightInches.$model" type="number" min="0" max="11" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">
        <md-field>
          <label>Weight lbs</label>
          <md-input placeholder="Weight lbs" v-model.number="$v.player.Weight.$model" type="number" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">  
        <md-field>
          <label>Turned pro</label>
          <md-select placeholder="Turned pro" v-model="$v.player.TurnedPro.$model" required md-dense >
            <md-option v-for="item in turnedProYears" :key="item" :value="item">{{item}}</md-option>
          </md-select>
        </md-field>
      </div>

    </div>

    <img v-if="$v.player.Photo.$model != null" :src="'data:image/jpeg;base64,' + $v.player.Photo.$model" 
       style="height: 170px;"/>

    <file-upload-dd v-on:fileReceived="fileReceived"></file-upload-dd>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import DataMixin from "../mixins/data-mixin";
import FileUploadDD from "./FileUploadDD";
import { validationMixin } from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'


export default {
  name: 'PlayerEditDialog',
  components: {
    'file-upload-dd': FileUploadDD
  },
  props: {
      value: {
        required: true
      },
      playerId: {
        required: true
      }
  },
  mixins: [DataMixin, validationMixin],
  data() {
    return {
      player: {
        Name: "Bert Ford",
        CountryId: 2
      }
    }
  },
  validations: {
    player: {
      Name: {
        required,
        minLength: minLength(3)
      },
      CountryId: {},
      Handed: {},
      HomeTown: {},
      DobDMY: {},
      Gender: {
        required,
      },
      HeightFeet: {},
      HeightInches: {},
      Weight: {},
      TurnedPro: {
        between: between(1981, 2020)
      },
      Photo: {},
    }
  },
  methods: {
    close() {
      console.log("close()");
      console.log("$v.$anyDirty=" + this.$v.$anyDirty);
      //debugger;
      this.clearForm();
      this.$emit("input", !this.value);
    },
    update() {
      console.log("update()");
      this.updatePlayer(this.playerId, this.player).then(
        res => {
          //this.toastr.info("Record updated");
          res;
          this.clearForm();
          this.$toastr.s("Record updated");
          this.$parent.refreshList();
          this.$emit("input", !this.value);
        },
        err => {
          this.$toastr.e(this.formatError(err.response.data));
        }
      )
    },
    clearForm() {
      console.log("clearForm()");
      this.player.Name = "";
      this.player.CountryId = 0;
      this.player.Handed = "";
      this.player.HomeTown = "";
      this.player.DobDMY = null;
      this.player.Dob = null;
      this.player.Gender = "";
      this.player.HeightFeet = "";
      this.player.HeightInches = "";
      this.player.Weight  = "";
      this.player.TurnedPro = "";
      this.player.Photo = "";
    },
    open() {
      console.log("open(), playerId=" + this.playerId);
      this.getPlayer(this.playerId)
      .then (() => {
        this.$v.$reset();
        console.log("$v.$anyDirty=" + this.$v.$anyDirty);
      });
    },
    fileReceived(evt) {
      console.log("fileReceived()");
      this.$v.player.Photo.$model = evt;
    }
      
  },

  beforeMount() {
    this.getCountries();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* fix for md-dialog appearing off-centre */
.md-dialog /deep/ .md-dialog-container {
  transform: none;
  width: 500px;
  min-height: 560px;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.md-dialog-content {
  margin-top: -10px;
}

.md-button {
  font-weight: bold;
  text-transform: none !important;
}
.half-width {
  max-width: 50%;
  margin-bottom: -15px;
}
.quarter-width {
  max-width: 25%;
}
.error {
  color: #f57f6c;
  font-size: 10px;
  padding: 0;
  margin-top: -25px;
}
</style>
<style>
.md-field.md-focused .md-input,
.md-field.md-focused .md-textarea,
.md-field.md-has-value .md-input,
.md-field.md-has-value .md-textarea,
.md-list-item-container {
  font-size: 14px !important;
}
</style>
