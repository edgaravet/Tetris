let overley = document.querySelector('.overlay');
let modale = document.querySelector('.modale');
let speed = 0;

modale.addEventListener('click', function  (e) {

    if(e.target.classList.contains('easy')){

        speed = 400;
    }else if (e.target.classList.contains('medium')){
        speed = 300;
    } else if (e.target.classList.contains('hard')){
        speed = 200;
    }


    if(e.target.classList.contains('button')){
        modale.style.display = 'none';
        overley.style.display = 'none';
        startGame();
    }
});

function startGame(){
    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (let i = 1; i < 181; i++){
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }
    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;
    for( let y = 18; y > 0; y--){
        for(let x = 1; x < 11; x++){
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }
    let x = 5,y = 15;
//sargum enq figurner@
let mainArr = [[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[1,-1],[0,0],[-1,1],[-2,2]][[1,-1],[0,0],[-1,1],[-2,2]],],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]][[0,0],[0,0],[0,0],[0,0]],],[[1,0],[0,1],[0,2],[[-1,1],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[-1,-1],][[-1,0],[0,-1],[2,-2],[-1,-1]],][[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]][[-2,0],[1,-1],[0,0],[-1,-1]],]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]],]
let currentFigure = 0;
let figureBody = 0;
let rotate = 1;
//////figurneri random berel@//////////////
function create(){
    function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1));
    }
    rotate = 1;
    currentFigure = getRandom();
debugger;
    figureBody = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
    ];



    //sag figurnerin talis enq class tesnelu hamar
    for(let i = 0; i < figureBody.length; i++){
        figureBody[i].classList.add('figure');
    }
}
create();

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `score:${score}`;



///// figurneri ijnel@@@////////

function move() {
    let moveFlag = true;
    let cordinates =  [
    [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
    [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
    [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
    [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];

    for (let i = 0; i < cordinates.length; i++) {
        if (cordinates[i][1] == 1 || document.querySelector(`[posX = "${cordinates[i][0]}"][posY = "${cordinates[i][1]-1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }
    if (moveFlag) {
        for (let i = 0; i < figureBody.length; i++) {

            figureBody[i].classList.remove('figure');
        }
        figureBody = [
        document.querySelector(`[posX = "${cordinates[0][0]}"][posY = "${cordinates[0][1] - 1}"]`),
        document.querySelector(`[posX = "${cordinates[1][0]}"][posY = "${cordinates[1][1] - 1}"]`),
        document.querySelector(`[posX = "${cordinates[2][0]}"][posY = "${cordinates[2][1] - 1}"]`),
        document.querySelector(`[posX = "${cordinates[3][0]}"][posY = "${cordinates[3][1] - 1}"]`),
        ];

        for (let i = 0; i < figureBody.length; i++) {

            figureBody[i].classList.add('figure');
        }

    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');

            ///// togeri jnjvel@///////
        }
        for(let i = 1; i < 15; i++){
            let count = 0;
            for(let j = 1; j < 11; j++){
                if(document.querySelector(`[posX = "${j}"][posy = "${i}" `).classList.contains('set')){
                    count++;
                    if(count === 10){
                        score += 10;
                        
  
                        input.value = `score:${score}`;
                        for(let m = 1; m < 11; m++){
                            document.querySelector(`[posX = "${m}"][posy = "${i}" `).classList.remove('set')

                        }
                        let set = document.querySelectorAll('.set');
                        let newSet = [];
                        for(let s = 0; s < set.length;s++ ){
                            let setCordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                            if(setCordinates[1] > i){
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX = "${setCordinates[0]}"][posy = "${setCordinates[1] - 1}" `));
                            }
                        }

                        for(let a = 0; a < newSet.length; a++){
                            newSet[a].classList.add('set');
                        }
                        i--
                    }
                }
            }
        }

        for(let n = 1; n < 11; n++){
            if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')){

                clearInterval(interval);
                alert("Game Over   " + `score: ${score}`);
                break;

            }
        }
        create();
    }
}
let interval = setInterval(() =>{
    move();
},speed);

////// figurneri dzax u aj gnal@//////////////

let flag = true;

window.addEventListener('keydown',function (e) {
    let cordinates1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posy')];
    let cordinates2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posy')];
    let cordinates3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posy')];
    let cordinates4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posy')];

    function getNewState(a) {
        flag = true;
        let figureNew = [
        document.querySelector(`[posX = "${+cordinates1[0] + a}"][posY = "${cordinates1[1]}"]`),
        document.querySelector(`[posX = "${+cordinates2[0] + a}"][posY = "${cordinates2[1]}"]`),
        document.querySelector(`[posX = "${+cordinates3[0] + a}"][posY = "${cordinates3[1]}"]`),
        document.querySelector(`[posX = "${+cordinates4[0] + a}"][posY = "${cordinates4[1]}"]`),
        ];
        for(let i = 0; i < figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }
        if(flag === true){

            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.add('figure');
            }
        }
    }
    if(e.keyCode === 100){
        getNewState(-1);
    }else if (e.keyCode === 102){
        getNewState(1);
    } else if (e.keyCode === 98){
        move();
    }else if (e.keyCode === 104){
        flag = true;
        let figureNew = [
        document.querySelector(`[posX = "${+cordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+cordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
        document.querySelector(`[posX = "${+cordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+cordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
        document.querySelector(`[posX = "${+cordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+cordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
        document.querySelector(`[posX = "${+cordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+cordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
        ];
        for(let i = 0; i < figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }
        if(flag === true){

            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.add('figure');
            }

            if(rotate < 4){
                rotate++;
            }else{
                rotate = 1;
            }
        }
    }
});
}