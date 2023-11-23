//tìm ra những phần tử sẽ được sử dụng
'use strick';

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--0');
const current2El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const nameStyle1 = document.querySelector('#name--0');
const nameStyle2 = document.querySelector('#name--1');

//khai báo biến toàn cục
//scores tổng điểm số người chơi
//playing xem có đang trong trò chơi hay k ?
//activePlayer biến quyết định ai là người chơi hiện tại 
// currenscore điểm số của người chơi hiện tại
let scores = [],
    activePlayer,
    currentScore,
    playing;


// hàm khởi tạo 
function init() {
    scores = [0, 0];
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    score1El.textContent = 0;
    score2El.textContent = 0;
    current1El.textContent = 0;
    current2El.textContent = 0;

    diceImg.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');

    player1El.classList.remove('player--active');
    player2El.classList.remove('player--active');

    player1El.classList.add('player--active');
}
init();
// //xử lý khi click vào btnnewgame
btnNew.addEventListener('click', init);

//chuyển đổi người chơi 
function switchPlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // toán tử 3 ngôi 
    activePlayer = activePlayer === 0 ? 1 : 0;
    //toggle add nếu phần tử chưa có và remove khi phần tử đã có 
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
}
//xử lý khi click vào roll
btnRoll.addEventListener('click', function () {
    if (playing) {
       
        const dice = Math.floor(Math.random() * 6 + 1);
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${dice}.png`;
        //khi xúc xắc =1 giá trị trả về 0
        if (dice !== 1) {
            //nếu dice khác 1 thì giá trị curent trả về tổng của dice
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // chuyển người chơi
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {

    if (playing) {
        scores[activePlayer] += currentScore;
    
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceImg.classList.add('hidden');
            // document.querySelector(`#name--${activePlayer}`).textContent = '🎉correct to winer💕🌹';
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});
