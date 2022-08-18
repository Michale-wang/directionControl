"ui";

ui.layout(
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

    //关闭自己
    shell("am force-stop " + getPackageName("directionControl"), true)


})






