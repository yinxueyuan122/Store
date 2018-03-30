package com.groupproject.push.view;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;

import com.groupproject.R;
import com.groupproject.common.activity.BaseActivity;
import com.tencent.rtmp.TXLiveBase;
import com.tencent.rtmp.TXLiveConstants;
import com.tencent.rtmp.TXLivePushConfig;
import com.tencent.rtmp.TXLivePusher;
import com.tencent.rtmp.ui.TXCloudVideoView;


public class LivePushVIew extends RelativeLayout implements View.OnClickListener{


    private TXLivePusher mTXLivePusher;
    private TXLivePushConfig mTXPushConfig = new TXLivePushConfig();
    private TXCloudVideoView mTXCloudVideoView;
    private String mPushUrl = "rtmp://21887.livepush2.myqcloud.com/live/21887_yinxueyuan122?bizid=21887&record_interval=10800&record=flv|hls&txSecret=37489017e07a14ff7394c16296b2c978&txTime=5ab7cd70";

    public LivePushVIew(Context context) {
        super(context);
        initData(context);
        String sdkver = TXLiveBase.getSDKVersionStr();
        Log.d("liteavsdk", "liteav sdk version is : " + sdkver);
    }



    protected int getLayoutId() {
        return R.layout.live_push_main;
    }

    protected void initView() {
        mTXCloudVideoView = obtainView(R.id.video_view);
    }

    public <T extends View> T obtainView(int resId) {
        return (T) findViewById(resId);
    }

    protected void initData(Context context) {
        mTXCloudVideoView = obtainView(R.id.video_view);
        if (mTXCloudVideoView != null) {
            mTXCloudVideoView.disableLog(false);
        }
        //startPublish();
    }

    protected void setListener() {

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_close:
                stopPublish();
                break;

        }

    }

    private void startPublish(Context context) {
        if (mTXLivePusher == null) {
            mTXLivePusher = new TXLivePusher(context);
            mTXPushConfig.setAutoAdjustBitrate(false);
            mTXPushConfig.setVideoResolution(TXLiveConstants.VIDEO_RESOLUTION_TYPE_540_960);
            mTXPushConfig.setVideoBitrate(1000);

        }
        mTXCloudVideoView.setVisibility(View.VISIBLE);
        mTXLivePusher.startCameraPreview(mTXCloudVideoView);
        mTXLivePusher.startPusher(mPushUrl);
    }

    private void stopPublish() {
        if (mTXLivePusher != null) {
            mTXLivePusher.stopCameraPreview(false);
            mTXLivePusher.setPushListener(null);
            mTXLivePusher.stopPusher();
        }
    }
}
