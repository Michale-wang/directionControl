// shell("shell am start -n com.tile.rotation/.MainActivity", true)

let toggleRotation = () => {

    threads.start(function () {
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

}


//导出方法
module.exports = {

    //带两个形参的函数
    toggleRotation: toggleRotation
}