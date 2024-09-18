import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiPencil, BiTrash3, BiX, BiCheck2, BiPlusSquareDotted, FaCar, FaBan} from "oh-vue-icons/icons";

addIcons(BiPencil, BiTrash3, BiX, BiCheck2, BiPlusSquareDotted, FaCar, FaBan);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("v-icon", OhVueIcon);

app.mount('#app');
