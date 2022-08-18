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

// shell am start -n com.example.directionControl/com.stardust.autojs.execution.ScriptExecuteActivity

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

    
    //模拟返回键 依赖于无障碍服务
    back()
    
    //关闭当前页面
    $ui.finish();
    //关闭自己 (整个app)
    // shell("am force-stop " + getPackageName("directionControl"), true)
})








