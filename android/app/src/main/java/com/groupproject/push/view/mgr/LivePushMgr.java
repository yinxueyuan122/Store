package com.groupproject.push.view.mgr;


import android.support.annotation.Nullable;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.groupproject.push.view.LivePushVIew;
import com.tencent.rtmp.TXLivePlayer;

/**
 * Created by YiBing on 2017/4/28.
 */
public class LivePushMgr extends SimpleViewManager<LivePushVIew>
{
    ThemedReactContext context;

    public static final String REACT_CLASS = "RCTCustomView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected LivePushVIew createViewInstance(ThemedReactContext reactContext) {
        this.context = reactContext;
        LivePushVIew livePushVIew = new LivePushVIew(reactContext);
        return livePushVIew;
    }


}