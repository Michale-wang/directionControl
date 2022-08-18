"ui";
let toggleRotation = require("toggleRotation.js")

//ui 和 $ui 均可($可省略)
$ui.layout(


    <vertical>
        <appbar>
            <toolbar id="toolbar" title="Basic UI" />
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






//ui默认16ms会自动刷新，
//ui线程不能用阻塞操作，否则会导致超过16ms对用户体验不好，采用子线程( threads.start(function(){}) )解决

//findOne()会阻塞 找不到会一直阻塞 程序会等待
//或者采用findOnce() 不会阻塞
$ui.toggle_rotation.on("click", toggleRotation.toggleRotation)

// $ui.list.on("item_click", (item, i, itemView, listView) => {
//     $engines.execScriptFile("./item_detail.js", {
//         arguments: {
//             item: item
//         }
//     });
// });
