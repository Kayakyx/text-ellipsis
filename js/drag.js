/**
 * https://www.cnblogs.com/qingsui/p/13853346.html
 */

/**
 * 实现拖拽和拉伸
 * @param selector
 */
function initDrag(selector) {
    // var clickBox = document.getElementById('test');
    var clickBox = document.querySelector(selector);
    /**
     *desc:当在当前元素上按下鼠标时，就触发拖动和拉伸操作
     */
    clickBox.onmousedown = (e) => {
        console.log(clickBox)
        var mouseDownX = e.clientX;
        var mouseDownY = e.clientY;
        var clickBoxLeft = clickBox.offsetLeft;
        var clickBoxTop = clickBox.offsetTop;
        var clickBoxWeight = clickBox.offsetWidth;
        var clickBoxHeight = clickBox.offsetHeight;

        var direction = 0;
        if (mouseDownX < clickBoxLeft + 30) {
            direction = 'left';
        } else if (mouseDownX > clickBoxLeft + clickBoxWeight - 30) {
            direction = 'right';
        }

        if (mouseDownY < clickBoxTop + 30) {
            direction = 'top';
        } else if (direction < clickBoxTop + clickBoxHeight - 30) {
            direction = 'bottom';
        }
        if ((clickBoxLeft + clickBoxWeight - 30) < mouseDownX && mouseDownX < (clickBoxLeft + clickBoxWeight) && (clickBoxTop + clickBoxHeight - 30) < mouseDownY && mouseDownY < (clickBoxTop + clickBoxHeight)) {
            direction = 'rightBottomCorner';
        } else if ((clickBoxLeft + 30) < mouseDownX && mouseDownX < (clickBoxLeft + clickBoxWeight - 30) && (clickBoxTop + 30) < mouseDownY && mouseDownY < (clickBoxTop + clickBoxHeight - 30)) {     //如果是在中间位置，则实现拖动功能
            direction = "drag";
        }

        /**
         *desc:当鼠标开始华东的时候，根据鼠标的移动方向去调整他的X，Y坐标和长宽
         */
        document.onmousemove = function (e) {
            e = e || event; //是要是使用原生js给我们提供的e回调参数，这存储了很多有用的信息
            var xx = e.clientX;
            var yy = e.clientY;
            if (direction === 'left') {
                clickBox.style.width = clickBoxWeight + mouseDownX - xx + 'px'
                clickBox.style.left = xx + 'px';
            } else if (direction === 'right') {
                clickBox.style.width = clickBoxWeight + xx - mouseDownX + 'px'
            }

            if (direction === 'top') {
                clickBox.style.height = clickBoxHeight + mouseDownY - yy + 'px';
                clickBox.style.top = yy + 'px';
            } else if (direction === 'bottom') {
                clickBox.style.height = clickBoxHeight + yy - mouseDownY + 'px';
            }
            if (direction === 'rightBottomCorner') {
                clickBox.style.width = clickBoxWeight + xx - mouseDownX + 'px'
                clickBox.style.left = clickBoxLeft + 'px';
                clickBox.style.height = clickBoxHeight + yy - mouseDownY + 'px';
                clickBox.style.top = clickBoxTop + 'px';
            } else if (direction === "drag") {
                clickBox.style.left = xx - mouseDownX + clickBoxLeft + 'px';
                clickBox.style.top = yy - mouseDownY + clickBoxTop + 'px';
            }
            //return false; //这里为了避免抖动
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        if (e.preventDefault) {
            e.preventDefault();
        }
    };
}

// /**
//  *desc:在拉伸的过程中，实现居中状态长存,有时间将其做成一个插件公布出来，供大家使用
//  */




// 给所有 class 为 test 绑定 拖拽和拉伸
// let arr = document.getElementsByClassName('test')
// for (var i = 0; i < arr.length; i++) {
//     let test = arr[i]
//     test.addEventListener('mousedown', e => {
//         var mouseDownX = e.clientX;
//         var mouseDownY = e.clientY;
//         var clickBoxLeft = test.offsetLeft;
//         var clickBoxTop = test.offsetTop;
//         var clickBoxWeight = test.offsetWidth;
//         var clickBoxHeight = test.offsetHeight;
//
//         var direction = 0;
//         if (mouseDownX < clickBoxLeft + 30) {
//             direction = 'left';
//         } else if (mouseDownX > clickBoxLeft + clickBoxWeight - 30) {
//             direction = 'right';
//         }
//
//         if (mouseDownY < clickBoxTop + 30) {
//             direction = 'top';
//         } else if (direction < clickBoxTop + clickBoxHeight - 30) {
//             direction = 'bottom';
//         }
//         if ((clickBoxLeft + clickBoxWeight - 30) < mouseDownX && mouseDownX < (clickBoxLeft + clickBoxWeight) && (clickBoxTop + clickBoxHeight - 30) < mouseDownY && mouseDownY < (clickBoxTop + clickBoxHeight)) {
//             direction = 'rightBottomCorner';
//         } else if ((clickBoxLeft + 30) < mouseDownX && mouseDownX < (clickBoxLeft + clickBoxWeight - 30) && (clickBoxTop + 30) < mouseDownY && mouseDownY < (clickBoxTop + clickBoxHeight - 30)) {     //如果是在中间位置，则实现拖动功能
//             direction = "drag";
//         }
//
//         document.onmousemove = function (e) {
//             var xx = e.clientX;
//             var yy = e.clientY;
//             if (direction === 'left') {
//                 test.style.width = clickBoxWeight + mouseDownX - xx + 'px'
//                 test.style.left = xx + 'px';
//             } else if (direction === 'right') {
//                 test.style.width = clickBoxWeight + xx - mouseDownX + 'px'
//             }
//
//             if (direction === 'top') {
//                 test.style.height = clickBoxHeight + mouseDownY - yy + 'px';
//                 test.style.top = yy + 'px';
//             } else if (direction === 'bottom') {
//                 test.style.height = clickBoxHeight + yy - mouseDownY + 'px';
//             }
//             if (direction === 'rightBottomCorner') {
//                 test.style.width = clickBoxWeight + xx - mouseDownX + 'px'
//                 test.style.left = clickBoxLeft + 'px';
//                 test.style.height = clickBoxHeight + yy - mouseDownY + 'px';
//                 test.style.top = clickBoxTop + 'px';
//             } else if (direction === "drag") {
//                 test.style.left = xx - mouseDownX + clickBoxLeft + 'px';
//                 test.style.top = yy - mouseDownY + clickBoxTop + 'px';
//             }
//             //return false; //这里为了避免抖动
//         };
//         document.onmouseup = function () {
//             document.onmousemove = null;
//             document.onmouseup = null;
//         };
//         if (e.preventDefault) {
//             e.preventDefault();
//         }
//     })
// }

