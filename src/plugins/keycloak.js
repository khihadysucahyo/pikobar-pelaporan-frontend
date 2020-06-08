import Keycloak from 'keycloak-js'

const keycloakPlugin = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
})

// This is your plugin object. It can be exported to be used anywhere.
const keycloak = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    Vue.prototype.$keycloak = keycloakPlugin
  }
}

export default keycloak
