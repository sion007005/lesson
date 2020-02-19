/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
const common = (() => {
    const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
    const fetchApiData = async (url, page = 'info') => {
        const res = await fetch(url + page);
        const data = await res.json();
        return data.data;
    }

    return { IMG_PATH, fetchApiData }
})();

const Root = (selector) => {
    let $el;
    let $page;

    const create = () => {
        $el = document.querySelector(selector);
        $page = ItemDetail($el);
        $page.create();
    }

    const destroy = () => {
        $page && $page.destroy();
    }

    return { $el, create, destroy }
};

const ItemDetail = ($parent) => {
    const URL = 'https://my-json-server.typicode.com/it-crafts/lesson/detail/';
    let $el;
    let $item;
    let $detail;
    
    const data = {};

    const create = async () => {
        render();
        $el = $parent.firstElementChild;
        const detailData = await fetch();
        // $item = Item($el.firstElementChild, detailData, detailData.imgList, detailData.profile);
        // $item.create();
        // $detail = Detail($el.firstElementChild, detailData.detailList);
        // $detail.create();
    }

    const destroy = () => {
        $item && $item.destroy();
        $detail && $detail.destroy();
        $parent.removeChild($el);
    }

    const fetch = async () => {
        const detailData = await common.fetchApiData(URL, 1);
        Object.assign(data, detailData);
        return detailData;
    }

    const render = () => {
        $parent.innerHTML = `
            <div class="Kj7h1">
                <div class="ltEKP">
                </div>
            </div>
        `;
    }

    return { $el, create, destroy }
};

const root = Root('main');
root.create();
// root.destroy();
// root.create();