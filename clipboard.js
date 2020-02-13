/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
(async () => {
  const common = (() => {
    const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
    const fetchApiData = async (url, page = 'info') => {
      const res = await fetch(url + page);
      const data = await res.json();
      return data.data;
    };

    return {IMG_PATH, fetchApiData};
  })();

  const root = (() => {
    let $el;

    const create = () => {
      $el = document.querySelector('main');
    };

    create();
    return {$el};
  })();

  const timeline = await (async $parent => {
    let $el;
    const url =
      'https://my-json-server.typicode.com/it-crafts/lesson/timeline/';
    const infoData = await common.fetchApiData(url);
    const totalPage = infoData.totalPage * 1;
    const profileData = infoData.profile;

    const create = () => {
      render();
      $el = $parent.firstElementChild;
    };

    const render = () => {
      $parent.innerHTML = `
              <div class="v9tJq">
                  <div class="fx7hk">
                      <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__grey_5 u-__7"></span></a>
                      <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__grey_5 u-__7"></span></a>
                      <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__blue_5 u-__7"></span></a>
                  </div>
              </div>
          `;
    };

    create();
    return {$el, totalPage, profileData, url};
  })(root.$el);

  const timelineProfile = (($parent, profileData) => {
    let $el;

    const create = () => {
      render(profileData);
      $el = $parent.firstElementChild;
    };

    const scaleDown = numstring => {
      const num = numstring.replace(/,/g, '');
      if (num >= 1000000) {
        return Math.floor(num / 100000) / 10 + '백만';
      }
      if (num >= 1000) {
        return Math.floor(num / 100) / 10 + '천';
      }
      return num;
    };

    const render = data => {
      $parent.insertAdjacentHTML(
        'afterbegin',
        `
              <div>
                  <header class="HVbuG">
                      <div class="XjzKX">
                          <div class="RR-M- h5uC0" role="button" tabindex="0">
                              <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                              <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="${
                                data.name
                              }님의 프로필 사진" class="_6q-tv" src="${
          common.IMG_PATH
        }${data.img}"></span>
                          </div>
                      </div>
                      <section class="zwlfE">
                          <div class="nZSzR">
                              <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">${
                                data.name
                              }</h1>
                              <span class="mrEK_ Szr5J coreSpriteVerifiedBadge" title="인증됨">인증됨</span>
                              <div class="AFWDX"><button class="dCJp8 afkep"><span aria-label="옵션" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div>
                          </div>
                          <div class="Y2E37">
                              <div class="Igw0E IwRSH eGOV_ vwCYk">
                                  <span class="ffKix bqE32">
                                      <span class="vBF20 _1OSdk"><button class="_5f5mN jIbKX _6VtSN yZn4P">팔로우</button></span>
                                      <span class="mLCHD _1OSdk"><button class="_5f5mN jIbKX KUBKM yZn4P"><div class="OfoBO"><div class="_5fEvj coreSpriteDropdownArrowWhite"></div></div></button></span>
                                  </span>
                              </div>
                          </div>
                      </section>
                  </header>
                  <div class="-vDIg">
                      <h1 class="rhpdm">${data.title}</h1><br><span>${
          data.text
        }</span>
                  </div>
                  <ul class="_3dEHb">
                      <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">${
                        data.post
                      }</span></span></li>
                      <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="${
                        data.follower
                      }">${scaleDown(data.follower)}</span></a></li>
                      <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">${
                        data.follow
                      }</span></a></li>
                  </ul>
              </div>
          `
      );
    };

    create();
    return {$el};
  })(timeline.$el, timeline.profileData);

  const timelineContent = ($parent => {
    let $el;

    const create = () => {
      render();
      $el = $parent.lastElementChild;
    };

    const render = () => {
      $parent.insertAdjacentHTML(
        'beforeend',
        `
              <div class="_2z6nI">
                  <div style="flex-direction: column;">
                  </div>
              </div>
          `
      );
    };

    create();
    return {$el};
  })(timeline.$el);

  const grid = await (async ($parent, url) => {
    let $el;

    let page = 1;
    const ITEM_PER_ROW = 3;
    const timelineList = await common.fetchApiData(url, page++);

    const create = () => {
      render();
      $el = $parent.lastElementChild;
    };

    const divide = (list, size) => {
      const copy = [...list];
      const cnt = Math.ceil(copy.length / size);

      const listList = [];
      for (let i = 0; i < cnt; i++) {
        listList.push(copy.splice(0, size));
      }

      const lastlist = listList[listList.length - 1];
      for (let i = lastlist.length; i < size; i++) {
        lastlist[i] = {};
      }

      return listList;
    };
    const listList = divide(timelineList, ITEM_PER_ROW);
    /* FIXME 검색 후 정렬버튼 누를 시, 검색결과 안에서만 정렬할 수 있도록 해주세요
    이후 검색창 비웠을 때는 검색 중에 정렬한 순서 유지 해주세요 */

    // FIXME 검색창 비웠을 때 모든사진 나오도록 확장해주세요 (수정완료)
    const filter = e => {
      $el.lastElementChild.firstElementChild.innerHTML = '';
      const searchText = e.target.value;
      /* BUG text만 검색되고 name은 검색되지 않고 있습니다 (수정완료) */
      const resultList = timelineList.filter(x => x.text.includes(searchText) || x.name.includes(searchText));

      divide(resultList, ITEM_PER_ROW).forEach(list => {
        let html = '';
        // COMMENT 왜 reduce 걷어내고 인덱스로 for문을 돌리신건가요?
        for (let i = 0; i < list.length; i++) {
          const img =
            // BUG 변수값을 접근하는데 템플릿리터럴로 감싸서 부른 특별한 이유가 있을까요? (수정완료)
            (list[i].img || '') &&
            `
            <a href="javascript:;">
              <div class="eLAPa">
                <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${list[i].img}" style="object-fit: cover;"></div>
              </div>
            </a>
        `;
          html += `
              <div class="v1Nh3 kIKUG _bz0w">
              ${img}
              </div>
      `;
        }
        const parent = grid.$el.lastElementChild.firstElementChild;
        parent.insertAdjacentHTML(
          'beforeend',
          `
          <div class="Nnq7C weEfm">
          ${html}
          </div>
      `
        );
      });
    };

    const sort = e => {
      $el.lastElementChild.firstElementChild.innerHTML = '';
      /* FIXME 불필요한 장대한 분기문입니다, 읽기도 힘들고 수정하기도 힘듭니다
      분기문은 예외적인 일부로직을 처리하는 데만 제한적으로 구조를 잡아주시고
      메인로직 자체를 분기문으로 감싸는 로직은 지양해주세요
      여기서는 sort 안에 들어가는 콜백 정도만 분기해도 충분할 것 같습니다 (수정완료) */
      let comparator;
      if (e.target.id === 'newButton') {
        comparator = (x, y) => {
            const a = x.timestamp.replace(/\s|\/|:/gi, '');
            const b = y.timestamp.replace(/\s|\/|:/gi, '');
            return b - a;
          }
      } else if (e.target.id === 'hotButton') {
        comparator = (x, y) => {
            const a = x.clipCount * 1 + x.commentCount * 2;
            const b = y.clipCount * 1 + y.commentCount * 2;
            return b - a;
          }
      }
        
        timelineList.sort(comparator);
        const listList = divide(timelineList, ITEM_PER_ROW);
        listList.forEach(list => {
          const gridItem = (($parent, list) => {
            let $el;

            const create = () => {
              render(list);
              $el = $parent.lastElementChild;
            };

            const render = list => {
              const html = list.reduce((html, data) => {
                const img =
                  (data.img || '') &&
                  `
                <a href="javascript:;">
                <div class="eLAPa">
                    <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${data.img}" style="object-fit: cover;"></div>
                </div>
            </a>
                `;
                html += `
              <div class="v1Nh3 kIKUG _bz0w">
                ${img}
              </div>
              `;
                return html;
              }, '');

              $parent.insertAdjacentHTML(
                'beforeend',
                `
                      <div class="Nnq7C weEfm">
                      ${html}
                      </div>
                  `
              );
            };
            create();
            return {$el};
          })(grid.$el.lastElementChild.firstElementChild, list);
        });
    };

    const render = () => {
      $parent.insertAdjacentHTML(
        'beforeend',
        `
              <article class="FyNDV">
                  <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl JI_ht bkEs3 DhRcB">
                      <button id="newButton" class="sqdOP L3NKy y3zKF JI_ht" type="button">최신순</button>
                      <button id="hotButton" class="sqdOP L3NKy y3zKF JI_ht" type="button">인기순</button>
                      <h1 class="K3Sf1">
                          <div class="Igw0E rBNOH eGOV_ ybXk5 _4EzTm">
                              <div class="Igw0E IwRSH eGOV_ vwCYk">
                                  <div class="Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                                      <div class="Igw0E IwRSH eGOV_ vwCYk">
                                          <label class="NcCcD">
                                              <input id="searchbar" autocapitalize="none" autocomplete="off" class="j_2Hd iwQA6 RO68f M5V28" placeholder="검색" spellcheck="true" type="search" value="" />
                                              <div class="DWAFP">
                                                  <div class="Igw0E IwRSH eGOV_ _4EzTm">
                                                      <span aria-label="검색" class="glyphsSpriteSearch u-__7"></span>
                                                  </div>
                                                  <span class="rwQu7">검색</span>
                                              </div>
                                              <div class="Igw0E rBNOH YBx95 _4EzTm ItkAi O1flK fm1AK TxciK yiMZG"></div>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </h1>
                  </div>
                  <div>
                      <div style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                      </div>
                  </div>
              </article>
          `
      );
    };

    create();

    /* FIXME 컴포넌트 안에서 컴포넌트 밖까지 DOM 룩업하지 마세요
    동일ID를 가진 엘리먼트가 컴포넌트 밖에 없다는 보장이 없습니다
    영향범위를 예측할 수 없는 견고하지 못한 코드입니다
    컴포넌트 안에서는 뭐든 컴포넌트 안에서만 해주세요 ($el 내부만 룩업) */
    const searchBar = document.getElementById('searchbar');
    searchBar.addEventListener('keyup', filter);

    // TODO 같은 리스너를 쓸거면 두 버튼에 각각 등록하는 것이 아니라, 부모 엘리먼트에 리스너를 등록 해주세요
    const newestOrderButton = document.getElementById('newButton');
    newestOrderButton.addEventListener('click', sort);

    const hotButton = document.getElementById('hotButton');
    hotButton.addEventListener('click', sort);

    return {$el, listList};
  })(timelineContent.$el.firstElementChild, timeline.url);

  grid.listList.forEach(list => {
    const gridItem = (($parent, list) => {
      let $el;

      const create = () => {
        render(list);
        $el = $parent.lastElementChild;
      };

      const render = list => {
        const html = list.reduce((html, data) => {
          const img =
            (data.img || '') &&
            `
                      <a href="javascript:;">
                          <div class="eLAPa">
                              <div class="KL4Bh">
                                  <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${data.img}" style="object-fit: cover;">
                              </div>
                          </div>
                      </a>
                  `;
          html += `
                      <div class="v1Nh3 kIKUG _bz0w">${img}</div>
                  `;
          return html;
        }, '');

        $parent.insertAdjacentHTML(
          'beforeend',
          `
                  <div class="Nnq7C weEfm">
                      ${html}
                  </div>
              `
        );
      };

      create();
      return {$el};
    })(grid.$el.lastElementChild.firstElementChild, list);
  });
})();
