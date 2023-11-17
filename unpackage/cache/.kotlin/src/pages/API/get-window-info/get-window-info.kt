package uni.UNI4FE4B91;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uniapp.framework.*;
import io.dcloud.uniapp.runtime.*;
import io.dcloud.uniapp.vue.*;
import io.dcloud.uniapp.vue.shared.*;
import io.dcloud.unicloud.*;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo;
open class GenPagesAPIGetWindowInfoGetWindowInfo : BasePage {
    constructor(instance: ComponentInternalInstance) : super(instance) {
        onUnload(fun() {}, instance);
    }
    @Suppress("UNUSED_PARAMETER")
    override fun `$render`(): VNode? {
        val _ctx = this;
        val _component_button = resolveComponent("button");
        return createElementVNode("view", null, utsArrayOf(
            " 12121 ",
            createElementVNode("view", utsMapOf("class" to "uni-common-mt"), utsArrayOf(
                createElementVNode("view", utsMapOf("class" to "uni-list"), utsArrayOf(
                    createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, fun(item, _, _): VNode {
                        return createElementVNode("view", utsMapOf("class" to "uni-list-cell", "style" to "align-items: center;"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "uni-pd"), utsArrayOf(
                                createElementVNode("view", utsMapOf("class" to "uni-label", "style" to "width:180px;"), toDisplayString(item.label), 1)
                            )),
                            createElementVNode("view", utsMapOf("class" to "uni-list-cell-db"), utsArrayOf(
                                createElementVNode("textarea", utsMapOf("auto-height" to true, "disabled" to true, "placeholder" to "未获取", "value" to item.value), null, 8, utsArrayOf(
                                    "value"
                                ))
                            ))
                        ));
                    }
                    ), 256)
                )),
                createElementVNode("view", utsMapOf("class" to "uni-padding-wrap"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "uni-btn-v"), utsArrayOf(
                        createVNode(_component_button, utsMapOf("type" to "primary", "onClick" to _ctx.getWindowInfo), utsMapOf("default" to withCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                "获取窗口信息"
                            );
                        }
                        ), "_" to 1), 8, utsArrayOf(
                            "onClick"
                        ))
                    ))
                ))
            ))
        ));
    }
    open var title: String by `$data`;
    open var items: UTSArray<Item> by `$data`;
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("title" to "getWindowInfo", "items" to utsArrayOf<Item>());
    }
    override fun `$initMethods`() {
        this.getWindowInfo = fun() {
            val res = uni_getWindowInfo();
            this.items = utsArrayOf<Item>();
            for(key in res){
                val value = res[key];
                if (value != null) {
                    val item = Item(label = key, value = "" + (if (UTSAndroid.`typeof`( value) == "object") {
                        JSON.stringify(value);
                    } else {
                        value;
                    }
                    ));
                    this.items.push(item);
                }
            }
        }
        ;
        this.jest_getWindowInfo = fun(): GetWindowInfoResult {
            return uni_getWindowInfo();
        }
        ;
    }
    open lateinit var getWindowInfo: () -> Unit;
    open lateinit var jest_getWindowInfo: () -> GetWindowInfoResult;
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(
                    styles0
                ), utsArrayOf(
                    GenApp.styles
                ));
            }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("uni-pd" to utsMapOf("" to utsMapOf("paddingLeft" to "30rpx")));
            }
    }
}
