// получаю в константу элементы ввода (range и number)
const numStor = document.getElementById('input-storage');
const rangStor = document.getElementById('range-storage');
const numTrans = document.getElementById('input-transfer');
const rangTrans = document.getElementById('range-transfer');

// Объявляю пременные в которых будет информация значений storage и transfer
let storValue = 0;
let transValue = 0;

// Связываю инпуты range и number одним значением
numStor.addEventListener('input', (e)=>{
    numbCorrect(e)
    rangStor.value = e.target.value ;
    presentation(e);
});
rangStor.addEventListener('input',(e)=>{
    numStor.value = e.target.value;
    presentation(e);
});

// Связываю инпуты Transfer (range и number) одним значением
numTrans.addEventListener('input', (e)=>{
    numbCorrect(e);
    rangTrans.value = e.target.value ;
    presentation(e);
});
rangTrans.addEventListener('input',(e)=>{
    numTrans.value = e.target.value;
    presentation(e);
});

// костыль который препятсвует ввода данных больше 1000 и меньше 0
function numbCorrect (e){
    if(e.target.value > 1000 || e.target.value < 0){
        e.target.style.background = 'red';
        e.target.value = 0;
        presentation(e);
        setTimeout(() => {
            e.target.style.background = 'white';
        }, 1000);
    };
};

// объявляю переменные в которых input radio для работы с ними
const bunnyChoice = document.getElementById('bunny-choice');
const scalewayChoice = document.getElementById('scaleway-choice');

// навешиваю событие а такаже объявляю перменную для bunny
let bunnyChoiceValue = 0.01; /* значение переменной изначально выбранно значеним input radio который по умолчанию cheked*/
bunnyChoice.addEventListener('click', (e)=>{
    if (e.target.tagName == 'INPUT') {
        // если находит элемент с тегом инпут, то сохраняет его значение в переменную,
        // так как клик отлавливает нажатие по input radio, а значит они имееют атрибут cheked
        bunnyChoiceValue = e.target.value;
        presentation();
        }
    }
);
// навешиваю событие а такаже объявляю перменную для scaleway
let sclwayChoiceValue = 0.06;
scalewayChoice.addEventListener('click', (e)=>{
    if (e.target.tagName == 'INPUT') {
        sclwayChoiceValue = e.target.value;
        presentation();
        }
    }
);




// получаю в константу элемент space который будет расти по мере изменение цены
const backblSpace = document.getElementById('space-backblaze');
const bunnySpace = document.getElementById('space-bunny');
const scalewaySpace = document.getElementById('space-scaleway');
const vultrSpace = document.getElementById('space-vultr');

// получаю в константу элемент count который будет при изменении показывать цену за позицию
const backblCount = document.getElementById('count-backblaze');
const bunnyCount = document.getElementById('count-bunny');
const scalewayCount = document.getElementById('count-scaleway');
const vultrCount = document.getElementById('count-vultr');




// функция которая при изменении данных в ползунках будет трегериться и обновлять данные каждого столбца
function presentation(e = false){
    if (e) {
        // так как по умолчанию аргумент e = false это булевое значение будет пропускаться вызов функции которое в ней нуждается если его не передать
        refreshSlider(e);
    };
    // функция вызвает другие функции для перерасчета данных
    // эти же функция возвращают в переменную значение после операций
    let backblCost = backblaze(storValue,transValue);
    let bunnyCost = bunny(storValue,transValue);
    let sclwayCost = scaleway(storValue,transValue);
    let vultrCost = vultr(storValue,transValue);
    // spaceShow использует эти переменные для определение общей суммы значений и процентой частки каждой переменной
    spaceShow();

    
    function smartRound(numb) {
        // костыль который правильно округляет до сотых но при этом скрывает лишние нули после запятой
        return parseFloat(numb.toFixed(3));
    };

    function refreshSlider(e) {
        // находит совпадение по id и обновляет переменные 
        if(e.target.id == 'range-transfer' || e.target.id == 'input-transfer'){
            transValue = + e.target.value;
        }
        if(e.target.id == 'range-storage' || e.target.id == 'input-storage') {
            storValue = + e.target.value;
        }    
    };
    function backblaze (s,t) { /* s = storCost, t = transCost */
        let backblCost = smartRound((s * 0.005) + (t * 0.01)); /* переменные умножаются на заданный коефициент который был в ТЗ, а потом округляется */
        backblCost >= 7 ? backblCost : backblCost = 7;  /*значение переменной backblCost не опуститься ниже 7*/ 
        backblCount.innerHTML = backblCost + '$';
        return backblCost;
    };

    function bunny (s,t) {
        let bunnyCost = smartRound((s*bunnyChoiceValue)+(t * 0.01));
        bunnyCost <= 10 ? bunnyCost : bunnyCost = 10;  /*значение переменной bunnyCost не поднимется выше 10*/ 
        bunnyCount.innerHTML = bunnyCost + '$';
        return bunnyCost;
    };

    function scaleway (s,t) {
        s = checkFreebie(s);
        t = checkFreebie(t);
        let sclwayCost = smartRound((s*sclwayChoiceValue)+(t * 0.02));
        scalewayCount.innerHTML = sclwayCost + '$';
        function checkFreebie (free) {
            // если аргумент меньше 75 он возвращает ноль
            return free > 75 ? free - 75 : 0;
        };
        return sclwayCost;
        
    };
    function vultr (s,t) {
        let vultrCost = smartRound((s+t)*0.01);
        vultrCost >= 5 ? vultrCost : vultrCost = 5;  /*значение переменной vultrCost не опуститься ниже 5*/ 
        vultrCount.innerHTML = vultrCost + '$';
        return vultrCost;
    };


    function spaceShow() {
        // один процент от общей суммы переменных
        let prochetSpace = (backblCost + bunnyCost + sclwayCost + vultrCost) / 100;
        

        // процентая частка каждого элемента
        let a = prochetSpace * backblCost;
        let b = prochetSpace * bunnyCost;
        let c = prochetSpace * sclwayCost;
        let d = prochetSpace * vultrCost;

        
        let arraySpaceValue = [a,b,c,d]
        arraySpaceValue.map((e)=> e*100) /*костыль чтоб исправить мини баги при подсчете найменшого числа*/

        // каждый элемент имеет свой номер который равен индексу массива процентных часток
        let objectSpaceKey = {
            0 : backblSpace, 
            1 : bunnySpace,
            2 : scalewaySpace, 
            3 : vultrSpace, 
        };
        
        // каждый элемент имеет свой номер который равен цвету лого каждого индекса в массиве
        let objectSpaceColor = {
            0 : 'red', 
            1 : 'orange',
            2 : 'purple', 
            3 : 'blue', 
        };
        // помогает сохранять прогресс space в тех же пропорциях при изменении экрана
        window.addEventListener('resize',()=>{
            let space = document.querySelectorAll('.presentation__space')
            if (window.innerWidth <= 769) {
                space.forEach((e)=>{
                    e.style.width = '20px';
                    grow();

                })
                
            }
            else{
                space.forEach((e)=> e.style.height = '100%')
                grow();
            }
        });

        grow();

        function grow() {
            // изменения высоты блоко в зависимости от их частки
            if(window.innerWidth <= 769){
                backblSpace.style.height = a +"%";
                bunnySpace.style.height = b +"%";
                scalewaySpace.style.height = c +"%";
                vultrSpace.style.height = d +"%";
            }
            else{
            // изменения ширины блоко в зависимости от их частки, плюс 5 процентов для более приятного и динамичного ввида
                backblSpace.style.width = a + 5 +"%";
                bunnySpace.style.width = b + 5 +"%";
                scalewaySpace.style.width = c + 5 +"%";
                vultrSpace.style.width = d + 5 +"%";
            }
        };
        
        // всем элемента устанавливается одинаковый цвет
        for (let i = 0; i < 4; i++) {
            const element = objectSpaceKey[i];
            element.style.background ='rgb(141, 141, 141)';
        }
        
        // подсчет найменшого числа в массиве и возврат его индекса 
        let minSpace = arraySpaceValue.indexOf( Math.min.apply(null, arraySpaceValue));
        
        // установка цвета найменшого элемета
        objectSpaceKey[minSpace].style.background = objectSpaceColor[minSpace];
    };
};








