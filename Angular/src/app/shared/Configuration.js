import { environment } from 'src/environments/environment';

export default class Configuration {
  static get CONFIG () {
    return {
      webapiUrl: '$VUE_APP_WEBAPI_URL',
      databaseType: '$VUE_APP_DATABASE_TYPE'
    }
  }

  static value (name) {
    if (!(name in this.CONFIG)) {
      console.log(`Configuration: There is no key named "${name}"`)
      return
    }

    const value = this.CONFIG[name]

    if (!value) {
      console.log(`Configuration: Value for "${name}" is not defined`)
      return
    }

    if (value.startsWith('$VUE_APP_')) {
      // value was not replaced, it seems we are in development.
      // Get current value from environment
      const envName = value.substr(1)
      const envValue = environment[name]
      //console.log("name=" + name + ", environment[name]=" + environment[name]);
      if (envValue) {
        return envValue
      } else {
        console.log(`Configuration: Environment variable "${envName}" is not defined`)
      }
    } else {
      // value was already replaced, it seems we are in production.
      return value
    }
  }
}
