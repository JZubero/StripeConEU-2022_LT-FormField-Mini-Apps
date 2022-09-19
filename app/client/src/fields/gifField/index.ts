import { createApp } from 'vue'
import GifField from './GifField.vue'
import { watchElement } from '../../utils';

const render = (el: HTMLElement) => {
    const payload = JSON.parse(el.dataset.payload as string);

    createApp(GifField, {
        apiKey: payload.apiKey,
        topic: payload.topic
    }).mount(`#${el.id}`);;
}

// needed to make sure app is mounted on dynamic content loaded
watchElement('.gif-field', (el: HTMLElement) => {
    setTimeout(() => render(el));
});
