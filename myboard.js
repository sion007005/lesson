//2주차 코드에 더보기까지 구현해본 파일(피드백 받기!)
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
    // FIXME 데드코드
    let p = 1;
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

  const grid = ($parent => {
    let $el;
    let more;
    let loading;

    const create = () => {
      render();
      $el = $parent.lastElementChild;
      loading = $el.children[2].firstElementChild;
      more = $el.children[3].children[0];
    };

    const filter = () => {
      //현재는 각 컴포넌트가 destroy 미지원 -> 그냥 DOM만 비우고, 새로운 gridItem들 생성
      $el.lastElementChild.firstElementChild.innerHTML = '';
      //TODO 검색창 input에 key이벤트 발생시 검색로직 수행
    };

    const sort = () => {
      // 각 컴포넌트가 destroy 미지원 -> 그냥 DOM만 비우고, 새로운 gridItem들 생성
      $el.lastElementChild.firstElementChild.innerHTML = '';
      //TODO 최신순/인기순 클릭시 해당 정렬로직 수행
    };

    const render = () => {
      $parent.insertAdjacentHTML(
        'beforeend',
        `
            <article class="FyNDV">
              <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl JI_ht bkEs3 DhRcB">
                <button class="sqdOP L3NKy y3zKF JI_ht" type="button">최신순</button>
                <button class="sqdOP L3NKy y3zKF JI_ht" type="button">인기순</button>
                <h1 class="K3Sf1">
                  <div class="Igw0E rBNOH eGOV_ ybXk5 _4EzTm">
                    <div class="Igw0E IwRSH eGOV_ vwCYk">
                        <div class="Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <label class="NcCcD">
                                    <input autocapitalize="none" autocomplete="off" class="j_2Hd iwQA6 RO68f M5V28" placeholder="검색" spellcheck="true" type="search" value="" />
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
              <div style="display: none;" class="_4emnV">
                <div class="Igw0E IwRSH YBx95 _4EzTm _9qQ0O ZUqME" style="height: 32px; width: 32px;"><svg aria-label="읽어들이는 중..." class="By4nA" viewBox="0 0 100 100"><rect fill="#555555" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg></div>
              </div>
              <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl" style="margin-right: 8px; display: none;">
                <button class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">더보기</button>
                <button class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">전체보기</button>
              </div>
            </article>
            `
      );
    };
    create();
    return {$el, more, loading};
  })(timelineContent.$el.firstElementChild);

  let p = 1;
  /* FIXME showMoreItems메소드가 상당히 비대합니다, 적절한 역할에 따라 분리해주세요
  divide가 내부에 있을 이유가 없고, API호출, 렌더링 등 로직 분리가 필요해 보입니다
  아무리 크고 복잡한 서비스에서도 단일 메소드에 100줄 가까이 되는 경우는 드뭅니다 */
  const showMoreItems = async () => {
    const {more, loading} = grid;
    const {totalPage, url} = timeline;
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

    loading.parentElement.style.display = '';
    const timelineList = await common.fetchApiData(url, p++);
    loading.parentElement.style.display = 'none';
    const listList = divide(timelineList, 3);

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
                      <div class="KL4Bh">
                        <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${data.img}" style="object-fit: cover;">
                      </div>
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

        // FIXME gridItem 내부에 들어와 있을만한 로직이 아닌 것 같습니다
        if (p === totalPage + 1) {
          more.parentElement.style.display = 'none';
          more.removeEventListener('click', showMoreItems);
        } else {
          more.parentElement.style.display = '';
          return {$el};
        }
      })(grid.$el.children[1].firstElementChild, list);
    });
  };
  /* FIXME 사실, 비즈니스 로직을 담고있는 메소드가 리스너로도 사용되는 것은 바람직하지 않습니다
  리스너는 순수하게 이벤트리스닝에 관련된 역할만 합니다, 역할에 따라 메소드를 분리해주세요 */
  showMoreItems();
  grid.more.addEventListener('click', showMoreItems);
})();
