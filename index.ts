/**
 * @description 图片 hover 预览容器
 */

import { defineComponent, h } from 'vue';
import { debounce } from 'lodash'
import './style.less';

let hoverDom: any = null;
let imgDom: any = null;
const SPACE = 8;

// 弹窗宽高
const showW = 220;
const showH = 220;

const createImg = () => document.createElement('img');

const setImgUrl = (dom: any, url: string) => {
    dom.src = url;
};

const createDom = () => {
    const dom = document.createElement('div');
    dom.setAttribute('class', 'img-hover');
    return dom;
};

// 边界范围调整
const judePosition = (dom: any, x: number, y: number) => {
    const { clientWidth } = dom;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const rightX = x + clientWidth + SPACE;
    const leftX = x - showW - SPACE;
    const bottomY = y;
    const topY = y - showH;
    x = rightX + showW < windowW ? rightX : leftX;
    y = bottomY + showH < windowH ? bottomY : topY;
    return { x, y };
};

const showDom = (dom: any, x: number, y: number) => {
    if (!dom) {
        return;
    }
    dom.style.display = 'block';
    dom.style.left = `${x}px`;
    dom.style.top = `${y}px`;
};

const hiddenDom = (dom: any) => {
    if (!dom) {
        return;
    }
    dom.style.display = 'none';
};

export default defineComponent({
    name: 'img-hover',
    props: {
        // 预览图片地址
        url: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            defalut: '',
        },
    },
    setup(props: any, { attrs, slots }) {
        return {
            attrs,
            slots,
        };
    },
    render() {
        const { attrs, slots } = this;
        const children = slots.default ? slots.default() : void 0;

        return h(
            'div',
            {
                ...attrs,
                onMouseenter: debounce(this.onMouseenter),
                onMouseleave: debounce(this.onMouseleave),
            },
            children
        );
    },
    mounted() {
        this.createHoverDome();
    },
    beforeUnmount() {
        this.destoryDom();
    },
    methods: {
        createHoverDome() {
            if (hoverDom) {
                return;
            }
            imgDom = createImg();
            hoverDom = createDom();
            hoverDom.appendChild(imgDom);
            const Body = document.querySelector('body');
            Body?.appendChild(hoverDom);
        },
        onMouseenter(event: any) {
            this.createHoverDome();
            const dom = event.target;
            const { offsetX, offsetY, pageX, pageY } = event;
            const { x, y } = judePosition(
                dom,
                pageX - offsetX,
                pageY - offsetY
            );
            const { url } = this;
            setImgUrl(imgDom, url);
            showDom(hoverDom, x, y);
        },
        onMouseleave() {
            hiddenDom(hoverDom);
        },
        destoryDom() {
            if (!hoverDom) {
                return;
            }
            const Body = document.querySelector('body');
            Body?.removeChild(hoverDom);
            hoverDom = null;
        },
    },
});
