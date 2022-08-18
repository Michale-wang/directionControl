"ui";
// let toggleRotation = require("toggleRotation.js")

//ui 和 $ui 均可($可省略)
$ui.layout(


    <vertical>
        <appbar>
            <toolbar id="toolbar" title="主界面" />
        </appbar>

        <button id="toggle_rotation" text="切换方向" style="Widget.AppCompat.Button.Colored" w="auto" />


    </vertical>
)

//导航栏
activity.setSupportActionBar($ui.toolbar);

$ui.emitter.on("create_options_menu", (menu) => {
    addItem(menu, 'Exit', $ui.R.drawable.ic_exit_to_app_black_48dp, true);
});
$ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "Exit":
            $ui.finish();
            break;
    }
    e.consumed = true;
});

function addItem(menu, title, icon, showAsAction) {
    let item = menu.add(title);
    item.setIcon(icon);
    if (showAsAction) {
        item.setShowAsActionFlags(android.view.MenuItem.SHOW_AS_ACTION_ALWAYS);
    }
}





// 阻塞问题：不能在ui线程执行阻塞操作, 请在子线程或子脚本执行findOne()或untilFind()

//ui默认16ms会自动刷新，
//ui线程不能用阻塞操作，否则会导致超过16ms对用户体验不好，

//法1: 采用子线程( threads.start(function(){}) )解决
// 1.1: 可以直接再同一个页面中
// 1.2 或采用 node.js 的 module.exports 和 require 导出和引入

//法2: 采用执行子脚本 解决
//采用 $engines.execScriptFile("./toggle.js"); 第二个参数可以传function 内传json的参数
//注意 当子js文件中有 ui组件时仍会产生子组件的阻塞问题
//    当子组件无ui组件时则不会产生问题

//法3: findOne()会阻塞 找不到会一直阻塞 程序会等待
//或者采用findOnce() 不会阻塞
// $ui.toggle_rotation.on("click", toggleRotation.toggleRotation)
//跳转到子页面


$ui.toggle_rotation.on("click", () => {
    $engines.execScriptFile("./toggleRotationView.js")
})



let storage = storages.create("directionControl")
if (!(storage.contains("accessToken") && storage.get("accessToken") === "true")) {
    //自动跳转切换页面
    $engines.execScriptFile("./toggleRotationView.js")
} else {
    //移除token
    storage.remove("accessToken")



    
    //关闭当前页面
    //使用auto.js内部的api的页面跳转用finish()关闭
    // $ui.finish();

    

    //停止所用脚本，单独停会因为时间有bug
    engines.stopAll()

    //点击按扭等系统逻辑用back()模拟返回
    // Back()
}







// $ui.list.on("item_click", (item, i, itemView, listView) => {
//     $engines.execScriptFile("./item_detail.js", {
//         arguments: {
//             item: item
//         }
//     });
// });
