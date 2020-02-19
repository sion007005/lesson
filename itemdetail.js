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
        $item = Item($el.firstElementChild, detailData, detailData.imgList, detailData.profile);
        $item.create();
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

const Item = ($parent, detailData = {}, imgDataList = [], profileData = {}) => {
    let $el;

    const create = () => {
        render(detailData, imgDataList, profileData, innerWidth);
        $el = $parent.firstElementChild;
    }

    const destroy = () => {
        $parent.removeChild($el);
    }

    const render = (data, imgDataList, profileData, width) => {
        const imgs = imgDataList.reduce((html, img) => {
            html += /* html */`
                <li class="_-1_m6" style="opacity: 1; width: ${width}px;">
                    <div class="bsGjF" style="margin-left: 0px; width: ${width}px;">
                        <div class="Igw0E IwRSH eGOV_ _4EzTm" style="width: ${width}px;">
                            <div role="button" tabindex="0" class="ZyFrc">
                                <div class="eLAPa RzuR0">
                                    <div class="KL4Bh" style="padding-bottom: 100%;">
                                        <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${img}" style="object-fit: cover;">
                                    </div>
                                    <div class="_9AhH0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
            return html;
        }, '');

        const navs = imgDataList.reduce((html, img, index) => {
            const on = index === 0 ? 'XCodT' : '';
            html += /* html */`
                <div class="Yi5aA ${on}"></div>
            `;
            return html;
        }, '');

        $parent.insertAdjacentHTML('afterbegin', /* html */`
            <article class="QBXjJ M9sTE h0YNM SgTZ1 Tgarh">
                <header class="Ppjfr UE9AK wdOqh">
                    <div class="RR-M- h5uC0 mrq0Z" role="button" tabindex="0">
                        <canvas class="CfWVH" height="126" width="126" style="position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;"></canvas>
                        <span class="_2dbep" role="link" tabindex="0" style="width: 32px; height: 32px;"><img alt="${profileData.name}님의 프로필 사진" class="_6q-tv" src="${common.IMG_PATH}${profileData.img}"></span>
                    </div>
                    <div class="o-MQd">
                        <div class="e1e1d">
                            <h2 class="BrX75"><a class="FPmhX notranslate nJAzx" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                        </div>
                    </div>
                </header>
                <div class="_97aPb wKWK0">
                    <div class="rQDP3">
                        <div class="pR7Pc">
                            <div class="tR2pe" style="padding-bottom: 100%;"></div>
                            <div class="Igw0E IwRSH eGOV_ _4EzTm O1flK D8xaz fm1AK TxciK yiMZG">
                                <div class="tN4sQ zRsZI">
                                    <div class="NgKI_">
                                        <div class="js-slider MreMs" tabindex="0" style="transition-duration: 0.25s; transform: translateX(0px);">
                                            <div class="qqm6D">
                                                <ul class="YlNGR" style="padding-left: 0px; padding-right: 0px;">
                                                    ${imgs}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="POSa_" tabindex="-1">
                                        <div class="coreSpriteLeftChevron"></div>
                                    </button>
                                    <button class="_6CZji" tabindex="-1">
                                        <div class="coreSpriteRightChevron"></div>
                                    </button>
                                </div>
                            </div>
                            <div class="js-pagebar ijCUd _3eoV- IjCL9 _19dxx">
                                ${navs}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="eo2As">
                    <section class="ltpMr Slqrh">
                        <span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span>
                    </section>
                    <section class="EDfFK ygqzn">
                        <div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk">
                            <div class="Nm9Fw"><a class="zV_Nj" href="javascript:;">좋아요 <span>${data.clipCount}</span>개</a></div>
                        </div>
                    </section>
                    <div class="KlCQn EtaWk">
                        <ul class="k59kT">
                            <div role="button" class="ZyFrc">
                                <li class="gElp9" role="menuitem">
                                    <div class="P9YgZ">
                                        <div class="C7I1f X7jCj">
                                            <div class="C4VMK">
                                                <h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                                                <span>${data.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                            <li class="lnrre">
                                <button class="Z4IfV sqdOP yWX7d y3zKF" type="button">댓글 <span>${data.commentCount}</span>개 모두 보기</button>
                            </li>
                        </ul>
                    </div>
                    <section class="sH9wk _JgwE eJg28">
                        <div class="RxpZH"></div>
                    </section>
                </div>
                <div class="MEAGs">
                    <button class="dCJp8 afkep"><span aria-label="옵션 더 보기" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button>
                </div>
            </article>
        `);
    }

    return { $el, create, destroy }
};

const root = Root('main');
root.create();
// root.destroy();
// root.create();