//jq+js
(function(){
    banner('.qd-area','.content');
    banner('.phb-area','.jx-comm-list');
    function banner(cln1,cln2) {
    console.log(cln1,cln2)

        let qd = cln1;
        let cont =cln2;
        console.log(qd,cont)
            let $qdArea = $(qd)
            let $banner = $qdArea.find(cont);



            // let banner = document.getElementsByClassName('banner')[0];
            let $ul = $banner.children().eq(0);
            let ul = document.querySelector(cln1 + ' ' + cln2).children[0];

            // 初始化
            let index = 0;

            // 无缝滚动关键1：把第一张复制到最后
            $ul.append($ul.children().eq(0).clone(true,true));

            let len = $ul.children().size();

            // 设置ul宽度，实现水平排列效果
            let $width = $banner.css('width').slice(0,-2)*len + 'px'
            let $bwidth = $banner.css('width').slice(0,-2);
            console.log($width);
            // ul.style.width = banner.clientWidth * len + 'px';

            // 添加分页
            let pager = document.createElement('div');
            pager.className = 'pager';
            for(let i=0;i<len-1;i++){
                let a = document.createElement('a');
 
                if(i===index){
                    a.className = 'current';
                }
                a.name = i;

                pager.appendChild(a);
            }
            let $black = $qdArea.find('.black');
            $black.append(pager);

            //找到左右按钮
            let $btnPrev = $qdArea.find('.left-pointer');
            let $btnNext = $qdArea.find('.right-pointer');
            let $pointer = $qdArea.find('.pointer');

            console.log($btnPrev,$btnNext);


            let timer = setInterval(autoPlay,3000);

            



            // 鼠标移入移除
            $banner.hover(function(){
                clearInterval(timer);
                $pointer.css('display','block');
            },function(){
                timer = setInterval(autoPlay,3000);
                $pointer.css('display','none');

            });
            $pointer.hover(function(){
                // clearInterval(timer);
                $pointer.css('display','block');
            },function(){
                // timer = setInterval(autoPlay,3000);
                $pointer.css('display','none');

            });

            $banner.on('click','.pager',function(){
                // 点击分页切换
                // 修改index值为当前分页数字-1
                index = $(this).attr('name');
                
                show();
            });
                

            $banner.on('click','.left-pointer',function(){
                // 上一张，下一张
                index = $(this).parent(cont).find('.pager .current').attr('name');
                index--;
            
                show();
            });
                

            $banner.on('click','.right-pointer',function(){
                index = $(this).parent(cont).find('.pager .current').attr('name');
                index++;
                show();
                
            });


            function autoPlay(){
                index++;
                show();
            }


            function show(){
                if(index>=len){
                    // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
                    ul.style.left = 0;
                    index = 0;
                }else if(index<0){
                    index = len-2;
                }

                startMove(ul,{left:-index*$bwidth});

                for(let i=0;i<len-1;i++){
                    pager.children[i].className = ''
                }

                if(index===len-1){
                    pager.children[0].className = 'current';
                }else{
                    pager.children[index].className = 'current';
                    
                }
            }
}

})();


//js
(function(){

    banner('qd-area','content');
    function banner(cln1,cln2) {
            let qdArea = document.getElementsByClassName('qd-area')[0];
            let banner = qdArea.getElementsByClassName('content')[0];


            // let banner = document.getElementsByClassName('banner')[0];
            let ul = banner.children[0];

            // 初始化
            let index = 0;

            // 无缝滚动关键1：把第一张复制到最后
            ul.appendChild(ul.children[0].cloneNode(true));

            let len = ul.children.length;

            // 设置ul宽度，实现水平排列效果
            ul.style.width = banner.clientWidth * len + 'px';

            // 添加分页
            let pager = document.createElement('div');
            pager.className = 'pager';
            for(let i=0;i<len-1;i++){
                let a = document.createElement('a');
 
                if(i===index){
                    a.className = 'current';
                }
                a.name = i;

                pager.appendChild(a);
            }
            let black = qdArea.getElementsByClassName('black')[0];
            black.appendChild(pager);

            //找到左右按钮
            let btnPrev = qdArea.getElementsByClassName('left-pointer')[0];
            let btnNext = qdArea.getElementsByClassName('right-pointer')[0];
            let pointers = qdArea.getElementsByClassName('pointer');

            console.log(btnPrev,btnNext);


            let timer = setInterval(autoPlay,3000);

            



            // 鼠标移入移除
            banner.onmouseover = ()=>{
                clearInterval(timer);
                btnPrev.style.display = "block";
                btnNext.style.display = "block";
            }

            banner.onmouseout = ()=>{
                timer = setInterval(autoPlay,3000);
                btnPrev.style.display = "none";
                btnNext.style.display = "none";

            }

            banner.onclick = e=>{
                // 点击分页切换
                if(e.target.parentNode.className === 'pager'){
                    // 修改index值为当前分页数字-1
                    index = e.target.name;
                    
                    show();
                }

                // 上一张，下一张
                else if(e.target.className === 'left-pointer'){
                    index = e.target.parentNode.childNodes[3].
                    index--;
                console.log(index)
                    show();
                }else if(e.target.className === 'right-pointer'){
                    index++;
                    show();
                }
                console.log(index)
            }


            function autoPlay(){
                index++;

                show();
            }


            function show(){
                if(index>=len){
                    // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
                    ul.style.left = 0;
                    index = 1;
                }else if(index<0){
                    index = len-2;
                }

                startMove(ul,{left:-index*banner.clientWidth});

                for(let i=0;i<len-1;i++){
                    pager.children[i].className = ''
                }

                if(index===len-1){
                    pager.children[0].className = 'current';
                }else{
                    pager.children[index].className = 'current';
                    
                }
            }
}

})();