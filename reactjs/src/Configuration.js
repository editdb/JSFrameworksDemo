import  { environment } from './environments/environment';

export default function Configuration() {
  const CONFIG = () => {
    return {
      webapiUrl: '$VUE_APP_WEBAPI_URL',
      databaseType: '$VUE_APP_DATABASE_TYPE'
    }
  }

  // eslint-disable-next-line
  this.value = name => {
    if (!(name in CONFIG())) {
      console.log(`Configuration: There is no key named "${name}"`)
      return
    }

    const val = CONFIG()[name];

    if (!val) {
      console.log(`Configuration: Value for "${name}" is not defined`)
      return
    }

    if (val.startsWith('$VUE_APP_')) {
      // value was not replaced, it seems we are in development.
      // Get current value from environment
      const envName = val.substr(1)
      const envValue = environment[name]
      console.log("name=" + name + ", environment[name]=" + environment[name]);
      if (envValue) {
        return envValue
      } else {
        console.log(`Configuration: Environment variable "${envName}" is not defined`)
      }
    } else {
      // value was already replaced, it seems we are in production.
      return val
    }
  }
}
