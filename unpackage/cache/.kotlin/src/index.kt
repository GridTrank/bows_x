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
import io.dcloud.uniapp.appframe.AppConfig;
import io.dcloud.uniapp.vue.createSSRApp;
import io.dcloud.uniapp.extapi.exit as uni_exit;
import io.dcloud.uniapp.extapi.showToast as uni_showToast;
var firstBackTime: Number = 0;
open class GenApp : BaseApp {
    constructor(instance: ComponentInternalInstance) : super(instance) {
        onLaunch(fun(_: OnLaunchOptions) {
            console.log("App Launch", " at App.uvue:5");
        }
        , instance);
        onAppShow(fun(_: OnShowOptions) {
            console.log("App Show", " at App.uvue:8");
        }
        , instance);
        onHide(fun() {
            console.log("App Hide", " at App.uvue:11");
        }
        , instance);
        onLastPageBackPress(fun() {
            console.log("App LastPageBackPress", " at App.uvue:15");
            if (firstBackTime == 0) {
                uni_showToast(ShowToastOptions(title = "再按一次退出应用", position = "bottom"));
                firstBackTime = Date.now();
                setTimeout(fun(){
                    firstBackTime = 0;
                }, 2000);
            } else if (Date.now() - firstBackTime < 2000) {
                firstBackTime = Date.now();
                uni_exit(null);
            }
        }
        , instance);
        onExit(fun() {
            console.log("App Exit", " at App.uvue:31");
        }
        , instance);
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(
                    styles0
                ));
            }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("uni-row" to utsMapOf("" to utsMapOf("flexDirection" to "row")), "uni-column" to utsMapOf("" to utsMapOf("flexDirection" to "column")));
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(name = "", inheritAttrs = true, props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenApp.styles);
}
, fun(instance): GenApp {
    return GenApp(instance);
}
);
open class Item (
    @JsonNotNull
    open var label: String,
    @JsonNotNull
    open var value: String,
) : UTSObject()
open class ItemReactiveObject : Item, IUTSReactive<Item> {
    override var __v_raw: Item;
    override var __v_isReadonly: Boolean;
    override var __v_isShallow: Boolean;
    constructor(__v_raw: Item, __v_isReadonly: Boolean, __v_isShallow: Boolean) : super(label = __v_raw.label, value = __v_raw.value) {
        this.__v_raw = __v_raw;
        this.__v_isReadonly = __v_isReadonly;
        this.__v_isShallow = __v_isShallow;
    }
    override var label: String
        get() {
            return trackReactiveGet(__v_raw, "label", __v_raw.label);
        }
        set(value) {
            val oldValue = __v_raw.label;
            __v_raw.label = value;
            triggerReactiveSet(__v_raw, "label", oldValue, value);
        }
    override var value: String
        get() {
            return trackReactiveGet(__v_raw, "value", __v_raw.value);
        }
        set(value) {
            val oldValue = __v_raw.value;
            __v_raw.value = value;
            triggerReactiveSet(__v_raw, "value", oldValue, value);
        }
}
val GenPagesAPIGetWindowInfoGetWindowInfoClass = CreateVueComponent(GenPagesAPIGetWindowInfoGetWindowInfo::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(name = "", inheritAttrs = true, props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenPagesAPIGetWindowInfoGetWindowInfo.styles);
}
, fun(instance): GenPagesAPIGetWindowInfoGetWindowInfo {
    return GenPagesAPIGetWindowInfoGetWindowInfo(instance);
}
);
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass);
    return object : UTSJSONObject() {
        var app = app
    };
}
fun main(app: IApp) {
    defineAppConfig();
    definePageRoutes();
    (createApp()["app"] as VueApp).mount(app);
}
open class UniAppConfig : AppConfig {
    override var name: String = "bows_x";
    override var appid: String = "__UNI__4FE4B91";
    override var versionName: String = "1.0.0";
    override var versionCode: String = "100";
    override var uniCompileVersion: String = "3.94";
    constructor(){}
}
fun definePageRoutes() {
    __uniRoutes.push(PageRoute(path = "pages/API/get-window-info/get-window-info", component = GenPagesAPIGetWindowInfoGetWindowInfoClass, meta = PageMeta(isQuit = true), style = utsMapOf("navigationBarTitleText" to "uni-app")));
}
val __uniTabBar: Map<String, Any?>? = null;
val __uniLaunchPage: Map<String, Any?> = utsMapOf("url" to "pages/API/get-window-info/get-window-info", "style" to utsMapOf("navigationBarTitleText" to "uni-app"));
@Suppress("UNCHECKED_CAST")
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/API/get-window-info/get-window-info";
    __uniConfig.globalStyle = utsMapOf("navigationBarTextStyle" to "black", "navigationBarTitleText" to "uni-app", "navigationBarBackgroundColor" to "#F8F8F8", "backgroundColor" to "#F8F8F8");
    __uniConfig.tabBar = __uniTabBar as Map<String, Any>?;
    __uniConfig.conditionUrl = "";
    __uniConfig.uniIdRouter = Map();
}
fun getApp(): GenApp {
    return getBaseApp() as GenApp;
}
