import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "../src/assets/myStyle.css"
import SortedTablePlugin from "vue-sorted-table";

//leaflet map stuff
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

// font awesome stuff
import {library} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, fas, faR} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import L from "leaflet";

// font awesome stuff
library.add(faUserSecret, fas, faR, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false



Vue.use(SortedTablePlugin);

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')

