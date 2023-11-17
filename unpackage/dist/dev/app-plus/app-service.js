if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$6 = {
    name: "topNav",
    data() {
      return {
        safeTop: ""
      };
    },
    mounted() {
      let res = uni.getSystemInfoSync();
      this.safeTop = res.safeArea.top;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "nav_bar",
        style: vue.normalizeStyle("height:" + $data.safeTop + "px")
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-7b6e994b"], ["__file", "D:/工作/dows/components/topNav/topNav.vue"]]);
  const tranClass = {
    enter: "zb-fade-zoom-enter zb-fade-zoom-enter-active",
    "enter-to": "zb-fade-zoom-enter-to zb-fade-zoom-enter-active",
    leave: "zb-fade-zoom-leave zb-fade-zoom-leave-active",
    "leave-to": "zb-fade-zoom-leave-to zb-fade-zoom-leave-active"
  };
  const _sfc_main$5 = {
    props: {
      options: {
        type: Array,
        default: () => []
      },
      placement: {
        type: String,
        default: "bottom-start"
      },
      bgColor: {
        type: String
      },
      // light dark
      theme: {
        type: String,
        default: "light"
      },
      // horizontal vertical
      actionsDirection: {
        type: String,
        default: "vertical"
      }
    },
    name: "Popover",
    watch: {
      show: {
        handler(newVal) {
          newVal ? this.vueEnter() : this.vueLeave();
        },
        // 表示同时监听初始化时的props的show的意思
        immediate: true
      }
    },
    data() {
      return {
        show: false,
        inited: false,
        // 是否显示/隐藏组件
        classes: "",
        // 应用的类名
        display: false,
        // 组件是否展示
        duration: 100,
        popoverStyle: {},
        arrowOldStyle: {}
      };
    },
    computed: {
      bgStyleColor() {
        if (this.bgColor) {
          return this.bgColor;
        }
        if (this.theme === "light") {
          return "white";
        }
        if (this.theme === "dark") {
          return "#4a4a4a";
        }
      },
      mergeStyle() {
        return {
          transitionDuration: `${this.duration}ms`,
          transitionTimingFunction: `ease-out`,
          ...this.popoverStyle
        };
      },
      arrowStyle() {
        return {
          ...this.arrowOldStyle
        };
      }
    },
    mounted() {
    },
    methods: {
      handleClick() {
        if (this.show) {
          this.show = false;
        } else {
          this.show = true;
        }
        this.$emit("handleClick", this.show);
      },
      close() {
        this.show = false;
      },
      actionAction(item) {
        this.$emit("select", item);
        this.show = false;
      },
      sleep(value) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, value);
        });
      },
      vueEnter() {
        this.inited = true;
        this.getPosition();
        this.classes = tranClass.enter;
        this.$nextTick(async () => {
          await this.sleep(30);
          this.classes = tranClass["enter-to"];
        });
      },
      vueLeave() {
        this.classes = tranClass.leave;
        this.$nextTick(async () => {
          this.classes = tranClass["leave-to"];
          await this.sleep(120);
          this.inited = false;
        });
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      getPosition() {
        return new Promise((resolve) => {
          this.$nextTick(() => {
            let selectorQuery = uni.createSelectorQuery().in(this).selectAll(".zb-button-popover,.zb-popover");
            selectorQuery.boundingClientRect(async (data) => {
              let { left, bottom, right, top, width, height } = data[0];
              let popoverClientRect = data[1];
              let popoverStyle = {};
              let arrowOldStyle = {};
              switch (this.placement) {
                case "top":
                  if (popoverClientRect.width > width) {
                    popoverStyle.left = `-${(popoverClientRect.width - width) / 2}px`;
                  } else {
                    popoverStyle.left = `${Math.abs(popoverClientRect.width - width) / 2}px`;
                  }
                  popoverStyle.bottom = `${height + 8}px`;
                  arrowOldStyle.left = popoverClientRect.width / 2 - 6 + "px";
                  break;
                case "top-start":
                  popoverStyle.left = `0px`;
                  popoverStyle.bottom = `${height + 8}px`;
                  arrowOldStyle.left = "16px";
                  break;
                case "top-end":
                  popoverStyle.right = `0px`;
                  popoverStyle.bottom = `${height + 8}px`;
                  arrowOldStyle.right = "16px";
                  break;
                case "bottom":
                  if (popoverClientRect.width > width) {
                    popoverStyle.left = `-${(popoverClientRect.width - width) / 2}px`;
                  } else {
                    popoverStyle.left = `${Math.abs(popoverClientRect.width - width) / 2}px`;
                  }
                  popoverStyle.top = `${height + 8}px`;
                  arrowOldStyle.left = popoverClientRect.width / 2 - 6 + "px";
                  break;
                case "bottom-start":
                  popoverStyle.top = `${height + 8}px`;
                  popoverStyle.left = `0px`;
                  arrowOldStyle.left = "16px";
                  break;
                case "bottom-end":
                  popoverStyle.top = `${height + 8}px`;
                  popoverStyle.right = `0px`;
                  arrowOldStyle.right = "16px";
                  break;
                case "right":
                  popoverStyle.left = `${width + 8}px`;
                  if (popoverClientRect.height > height) {
                    popoverStyle.top = `-${(popoverClientRect.height - height) / 2}px`;
                  } else {
                    popoverStyle.top = `${Math.abs((popoverClientRect.height - height) / 2)}px`;
                  }
                  arrowOldStyle.top = `${popoverClientRect.height / 2 - 6}px`;
                  break;
                case "right-start":
                  popoverStyle.left = `${width + 8}px`;
                  popoverStyle.top = `0px`;
                  arrowOldStyle.top = `8px`;
                  break;
                case "right-end":
                  popoverStyle.left = `${width + 8}px`;
                  popoverStyle.bottom = `0px`;
                  arrowOldStyle.bottom = `8px`;
                  break;
                case "left":
                  popoverStyle.right = `${width + 8}px`;
                  if (popoverClientRect.height > height) {
                    popoverStyle.top = `-${(popoverClientRect.height - height) / 2}px`;
                  } else {
                    popoverStyle.top = `${Math.abs((popoverClientRect.height - height) / 2)}px`;
                  }
                  arrowOldStyle.top = `${popoverClientRect.height / 2 - 6}px`;
                  break;
                case "left-start":
                  popoverStyle.right = `${width + 8}px`;
                  popoverStyle.top = `0px`;
                  arrowOldStyle.top = `8px`;
                  break;
                case "left-end":
                  popoverStyle.right = `${width + 8}px`;
                  popoverStyle.bottom = `0px`;
                  arrowOldStyle.bottom = `8px`;
                  break;
              }
              this.popoverStyle = popoverStyle;
              this.arrowOldStyle = arrowOldStyle;
              resolve();
            }).exec();
          });
        });
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "zbPopover",
        style: vue.normalizeStyle({
          "--theme-bg-color": $options.bgStyleColor
        })
      },
      [
        vue.createElementVNode("view", {
          onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.handleClick && $options.handleClick(...args), ["stop"])),
          class: "zb-button-popover"
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["zb-popover", [$data.classes, `zb-popover-${$props.placement}`]]),
            ref: "zb-transition",
            style: vue.normalizeStyle([$options.mergeStyle]),
            onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.noop && $options.noop(...args))
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["zb-popover-arrow", [{
                  "zb_popper__up": $props.placement.indexOf("bottom") === 0,
                  "zb_popper__arrow": $props.placement.indexOf("top") === 0,
                  "zb_popper__right": $props.placement.indexOf("right") === 0,
                  "zb_popper__left": $props.placement.indexOf("left") === 0
                }]]),
                style: vue.normalizeStyle([$options.arrowStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            vue.renderSlot(_ctx.$slots, "content", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass([{
                    "horizontal__action": $props.actionsDirection === "horizontal"
                  }])
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($props.options, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        onClick: vue.withModifiers(($event) => $options.actionAction(item), ["stop"]),
                        class: vue.normalizeClass(["zb-popover__action", [{
                          "dark__action": $props.theme === "dark"
                        }]]),
                        key: index
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "zb-popover__action-text" },
                          vue.toDisplayString(item.text),
                          1
                          /* TEXT */
                        )
                      ], 10, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )
            ], true)
          ],
          38
          /* CLASS, STYLE, HYDRATE_EVENTS */
        ), [
          [vue.vShow, $data.inited]
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-64de54a6"], ["__file", "D:/工作/dows/uni_modules/zb-popover/components/zb-popover/zb-popover.vue"]]);
  const request = (url, data, method, cacheName, time) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        data,
        header: {
          "token": uni.getStorageSync("token") || ""
          // 'content-type':'application/x-www-form-urlencoded'
        },
        method: method || "GET",
        success: (res) => {
          formatAppLog("log", "at utils/http.js:18", 111, res);
          uni.hideLoading();
          if (Number(res.data.code) == 200) {
            resolve(res.data);
          } else if (Number(res.data.code) === 10021 || Number(res.data.code) === 10020) {
            uni.showToast({
              title: "登录过期，请重新登录",
              icon: "none"
            });
            uni.clearStorageSync();
            reject(res.data);
          } else {
            uni.showToast({
              title: res.data.msg || "请求失败",
              icon: "none"
            });
            reject(res.data);
          }
        },
        fail: function(err) {
          uni.hideLoading();
          reject(err);
        }
      });
    });
  };
  const _sfc_main$4 = {
    components: {
      zbPopover: __easycom_1
    },
    data() {
      return {
        title: "Hello",
        safeTop: "",
        isAmex: true,
        MerchantVal: "111",
        actions: [
          { text: "Laynch Survey", val: 1 },
          { text: "View Merchant", val: 2 }
        ],
        account_id: "",
        key: "f39eb57fdcde5a4daa9c077dae08b933fe4370c7",
        nric: "",
        package_amount: "",
        payment_amount: "",
        merchant_id: "",
        is_double_chance: ""
        //1,0
      };
    },
    onLoad() {
      let res = uni.getSystemInfoSync();
      this.safeTop = res.safeArea.top;
      this.getList();
    },
    methods: {
      getList() {
        let url = "http://ec2-52-76-78-186.ap-southeast-1.compute.amazonaws.com/api/1.2/web/module_event_bows/getmerchantlist.php";
        request(url, { key: "f39eb57fdcde5a4daa9c077dae08b933fe4370c7" }).then((res) => {
          uni.setStorageSync("merchantList", JSON.stringify(res.message));
        });
      },
      toMerchant() {
        uni.navigateTo({
          url: "../../pages/merchants/merchants"
        });
      },
      scan() {
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/index/index.vue:124", res);
            this.account_id = res.result;
          }
        });
      },
      selectActive(e) {
        formatAppLog("log", "at pages/index/index.vue:130", 1212, e);
        if (e.val == 1) {
          uni.navigateTo({
            url: "../../pages/launch/launch"
          });
        } else {
          this.toMerchant();
        }
      },
      submit() {
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_topNav = resolveEasycom(vue.resolveDynamicComponent("topNav"), __easycom_0);
    const _component_zb_popover = resolveEasycom(vue.resolveDynamicComponent("zb-popover"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_topNav),
      vue.createElementVNode("view", { class: "head_wrap" }, [
        vue.createTextVNode(" Record Purchase "),
        vue.createVNode(_component_zb_popover, {
          placement: "bottom-end",
          options: $data.actions,
          ref: "Popover1",
          onSelect: $options.selectActive,
          class: "item-popover"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("image", {
              src: "/static/more.png",
              mode: "widthFix",
              class: "more"
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["options", "onSelect"])
      ]),
      vue.createElementVNode("view", { class: "wrap" }, [
        vue.createElementVNode("view", { class: "title mt20" }, " Account ID "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.account_id = $event),
              type: "text",
              placeholder: "Account ID"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.account_id]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "btn_wrap mt20",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.scan && $options.scan(...args))
        }, " SCAN QR CODE "),
        vue.createElementVNode("view", { class: "title mt50" }, " NRIC(Last 4 digits & letter) "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.nric = $event),
              type: "text",
              placeholder: "NRIC(Last 4 digits & letter)"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.nric]
          ])
        ]),
        vue.createElementVNode("view", { class: "title mt50" }, " Deposit Paid "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.payment_amount = $event),
              type: "text",
              placeholder: "Deposit Paid"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.payment_amount]
          ])
        ]),
        vue.createElementVNode("view", { class: "title mt50" }, " Package Amount "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.package_amount = $event),
              type: "text",
              placeholder: "Package Amount"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.package_amount]
          ])
        ]),
        vue.createElementVNode("view", { class: "title mt50" }, " Merchant "),
        vue.createElementVNode("view", {
          class: "input_wrap mt20 row",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.toMerchant && $options.toMerchant(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.MerchantVal),
            1
            /* TEXT */
          ),
          vue.createElementVNode("image", {
            src: "/static/right.png",
            class: "right",
            mode: "widthFix"
          })
        ]),
        vue.createElementVNode("view", { class: "radio_wrap" }, [
          vue.createElementVNode("view", { class: "radio_item" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["left", { "active": $data.isAmex }]),
                onClick: _cache[6] || (_cache[6] = ($event) => $data.isAmex = true)
              },
              [
                vue.createElementVNode("view", { class: "dark" })
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "" }, "No AMEX")
          ]),
          vue.createElementVNode("view", { class: "radio_item mt20" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["left", { "active": !$data.isAmex }]),
                onClick: _cache[7] || (_cache[7] = ($event) => $data.isAmex = false)
              },
              [
                vue.createElementVNode("view", { class: "dark" })
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "" }, "AMEX")
          ])
        ]),
        vue.createElementVNode("view", { class: "btn_wrap record" }, " RECORD OAYMENT ")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/工作/dows/pages/index/index.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        title: "Hello",
        safeTop: "",
        account: "121212",
        password: "121212"
      };
    },
    onLoad() {
      let res = uni.getSystemInfoSync();
      formatAppLog("log", "at pages/login/login.vue:43", res);
      this.safeTop = res.safeArea.top;
    },
    methods: {
      login() {
        uni.reLaunch({
          url: "../../pages/index/index"
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode(
        "view",
        {
          class: "nav_bar",
          style: vue.normalizeStyle("height:" + $data.safeTop + "px")
        },
        null,
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "head_wrap" }, " Login "),
      vue.createElementVNode("view", { class: "wrap" }, [
        vue.createElementVNode("view", { class: "title mt20" }, " Account ID "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              placeholder: "Account ID",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.account = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.account]
          ])
        ]),
        vue.createElementVNode("view", { class: "title mt50" }, " Password "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              placeholder: "Password",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.password]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "btn_wrap record",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args))
        }, " LOGIN ")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/工作/dows/pages/login/login.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        safeTop: "",
        list: []
      };
    },
    onLoad() {
      let res = uni.getSystemInfoSync();
      this.safeTop = res.safeArea.top;
      formatAppLog("log", "at pages/merchants/merchants.vue:32", this.safeTop);
      this.list = JSON.parse(uni.getStorageSync("merchantList"));
      formatAppLog("log", "at pages/merchants/merchants.vue:34", 1231231, this.list);
    },
    methods: {
      getList() {
        let url = "http://ec2-52-76-78-186.ap-southeast-1.compute.amazonaws.com/api/1.2/web/module_event_bows/getmerchantlist.php";
        request(url, { key: "f39eb57fdcde5a4daa9c077dae08b933fe4370c7" }).then((res) => {
        });
      },
      back() {
        uni.navigateBack();
      },
      selectItem(item) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 2];
        page.$vm.MerchantVal = item.merchant_name;
        this.back();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
      vue.createCommentVNode(" <topNav></topNav> "),
      vue.createElementVNode(
        "view",
        {
          class: "head_wrap",
          style: vue.normalizeStyle("padding-top:" + $data.safeTop + "px")
        },
        [
          vue.createElementVNode("image", {
            src: "/static/back.png",
            mode: "widthFix",
            class: "back",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.back && $options.back(...args))
          }),
          vue.createElementVNode("text", { class: "tit" }, "Merchants"),
          vue.createElementVNode("text", { class: "refresh" }, "Refresh")
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode(
        "view",
        {
          class: "",
          style: vue.normalizeStyle("height:" + ($data.safeTop + 44) + "px")
        },
        null,
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "list_wrap" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: index,
              onClick: ($event) => $options.selectItem(item)
            }, vue.toDisplayString(item.merchant_name), 9, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesMerchantsMerchants = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-2a5e6e8c"], ["__file", "D:/工作/dows/pages/merchants/merchants.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {
      back() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_topNav = resolveEasycom(vue.resolveDynamicComponent("topNav"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_topNav),
      vue.createElementVNode("view", { class: "head_wrap" }, [
        vue.createElementVNode("image", {
          src: "/static/back.png",
          mode: "widthFix",
          class: "back",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.back && $options.back(...args))
        }),
        vue.createElementVNode("text", { class: "tit" }, "Laynch Survey")
      ]),
      vue.createElementVNode("view", { class: "wrap" }, [
        vue.createElementVNode("view", { class: "title" }, " Account ID "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.createElementVNode("input", {
            class: "input",
            type: "text",
            placeholder: "Account ID"
          })
        ]),
        vue.createElementVNode("view", { class: "btn_wrap mt20" }, " SCAN QR CODE "),
        vue.createElementVNode("view", { class: "title mt60" }, " Bride's Name "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.createElementVNode("input", {
            class: "input",
            type: "text",
            placeholder: "Bride's Name"
          })
        ]),
        vue.createElementVNode("view", { class: "title mt60" }, " Groom's Name "),
        vue.createElementVNode("view", { class: "input_wrap mt20" }, [
          vue.createElementVNode("input", {
            class: "input",
            type: "text",
            placeholder: "Groom's Name"
          })
        ]),
        vue.createElementVNode("view", { class: "btn_wrap record" }, " LAUNCH SURVEY ")
      ])
    ]);
  }
  const PagesLaunchLaunch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-82d34b09"], ["__file", "D:/工作/dows/pages/launch/launch.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/merchants/merchants", PagesMerchantsMerchants);
  __definePage("pages/launch/launch", PagesLaunchLaunch);
  let firstBackTime = 0;
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    },
    onLastPageBackPress: function() {
      formatAppLog("log", "at App.vue:14", "App LastPageBackPress");
      if (firstBackTime == 0) {
        uni.showToast({
          title: "Press the exit program again",
          position: "bottom"
        });
        firstBackTime = Date.now();
        setTimeout(() => {
          firstBackTime = 0;
        }, 2e3);
      } else if (Date.now() - firstBackTime < 2e3) {
        firstBackTime = Date.now();
        uni.exit();
      }
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/工作/dows/App.vue"]]);
  let main = plus.android.runtimeMainActivity();
  plus.runtime.quit = function() {
    main.moveTaskToBack(false);
  };
  plus.nativeUI.toast = function(str) {
    if (str == "再按一次退出应用") {
      main.moveTaskToBack(false);
      return false;
    } else {
      uni.showToast({
        title: "Press the exit program again",
        position: "bottom",
        icon: "none"
      });
    }
  };
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
