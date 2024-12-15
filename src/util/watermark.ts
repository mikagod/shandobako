import store from "../store/index.js";
import localStorageObject from "../store/localStorageObject.js";


export const getmark = () => {
    
    const watermark = (type:any,target:any,level:any) => {

        // const id = "1.23452384164.123412416";
        const tempUN = localStorageObject.getUserName().split('').join(' ');
        const tempP = localStorageObject.getPhone().split('').join(' ');
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const second = now.getSeconds().toString().padStart(2, '0');
        const currentDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

        // if (document.getElementById(id) !== null) {document.body.removeChild(document.getElementById(id)!);}

        //创建一个画布

        const can = document.createElement("canvas");

        //设置画布的长宽

        can.width = 300;

        can.height = 220;

        const cans = can.getContext("2d")!;

        //旋转角度

        cans.rotate((-15 * Math.PI) / 180);

        cans.font = "11px Vedana";

        //设置填充绘画的颜色、渐变或者模式

        cans.fillStyle = "rgba(200, 200, 200, 0.40)";

        //设置文本内容的当前对齐方式

        cans.textAlign = "left";

        //设置在绘制文本时使用的当前文本基线

        // cans.textBaseline = "Middle";

        //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）

        cans.fillText(tempUN, 20, 100);
        cans.fillText(tempP, 20, 120);
        cans.fillText(type, 20, 140);
        cans.fillText("版 权 归 时 空 坐 标 所 有", 20, 160);
        cans.fillText(currentDate, 20, 180);
        const div = document.createElement(target);

        // div.id = id;

        div.className = "watermark";

        div.style.pointerEvents = "none";

        div.style.position = "absolute";

        div.style.display= "flex";

        // div.style.overflow = "aotu";

        div.style.top = "10px";

        div.style.left = "0px";

        div.style.margin = "0 auto"

        // div.style.position = "fixed";

        div.style.zIndex = level;

        div.style.width =  "100%";

        div.style.height = "100%";

        div.hidden = store.state.watermark;

        div.style.background =

        "url(" + can.toDataURL("image/png") + ") left top repeat";

        document.getElementById(target)?.appendChild(div);


    };




    // 该方法只允许调用一次

    // const watermark = (userName: string,phone:string,time:string,type:string) => {

    //     setWatermark(userName,phone,time,type);

    //     // setInterval(() => {
    //     //     id = setWatermark(userName,phone,time);
    //     // }, 500);

    //     // window.onresize = () => {

    //     //     setWatermark(userName,phone,time);

    //     // };

    // };

    return { watermark };

};