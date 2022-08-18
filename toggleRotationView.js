"ui";

$ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" />
        </appbar>
    </vertical>
);

// let item = $engines.myEngine().execArgv["item"] || { id: -1 };

$ui.toolbar.setTitle("转换页面");
activity.setSupportActionBar($ui.toolbar);
$ui.toolbar.setNavigationOnClickListener(function () {
    $ui.finish();
});
activity.supportActionBar.setDisplayHomeAsUpEnabled(true);

// 配合scrcpy+anywhere+ 
// 主界面Activity: shell am start -n com.example.directionControl/com.stardust.autojs.inrt.SplashActivity 可用

// 转换界面Activity: shell am start -n com.example.directionControl/com.stardust.autojs.execution.ScriptExecuteActivity 不可用

threads.start(function () {
    //执行方向切换逻辑

    app.launchApp("方向控制")

    let storage = storages.create("directionControl")
    if (!storage.contains("rotation")) {

        id("r1").findOne().click() //默认竖屏 

        storage.put("rotation", "vertical")
    }
    let rotation = storage.get("rotation")
    storage.remove("rotation")

    if (rotation === "vertical") {
        //竖屏

        id("r0").findOne().click() //竖屏下转横屏  

        storage.put("rotation", "horizontal")
    } else {
        //横屏

        id("r1").findOne().click() //横屏下转竖屏

        storage.put("rotation", "vertical")
        
        
    }
    storage.put("accessToken","true")
    
    //模拟返回键 依赖于Root
    Back()
 

    //重新跳转回主页面
    //只有跳转才会重新刷新主页面
    $engines.execScriptFile("./main.js")

    //关闭当前页面
    // $ui.finish();
    

    //关闭自己 (整个app)
    // shell("am force-stop " + getPackageName("directionControl"), true)
})








