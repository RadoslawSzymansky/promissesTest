const h2Result = document.querySelector('.result')
const btnRed = document.querySelector('.red')
const btnGreen = document.querySelector('.green')
const b=btnBlue = document.querySelector('.blue')
const btnStart = document.querySelector('.start')
const raceList = document.querySelector('#list')
const raceState = document.querySelector('.raceState')
class Game {
    constructor(btnStart, options = []){
        this.raceIsOn = false;
        this.options = options;
        btnStart.addEventListener('click', this.play.bind(this));
        options.forEach(e=>e.addEventListener('click', this.chooseOption.bind(this,e)))      
    }
    play(){
        if(this.raceIsOn || !this.choice) return
        const race = this.options.map(e=>this.startRace(e.className))
        raceList.innerHTML = ""
        race.forEach(e=>{
            e.then(e=>{
                const li = document.createElement('li')
                li.textContent = e;
                raceList.appendChild(li)
            })
        })
        Promise.race(race)
        .then(res=>{
            this.winner = res;
            h2Result.textContent = `${res} won the race!`
        })
        Promise.all(race)
        .then(()=>{
            raceList.insertAdjacentHTML("beforeEnd", '<p>Wyscig skonczony</p>')
            raceState.textContent = "Wyścig czeka na rozpoczęcie, wybierz zawodnika i kliknij start"
            this.raceIsOn = false;
            this.clearChoice()
        })
    }
    clearChoice(){
        this.options.forEach(e=>e.style.border = "none");
        this.choice = null;
    }
    startRace(name){
        const time = this.drawTime();
        return new Promise ((resolve, reject)=>{
            this.raceIsOn = true;
            raceState.textContent = "Wyścig trwa"
            setTimeout(()=>{
                resolve(name)
            }, time)
        })
    }
    chooseOption(e) {
        this.clearChoice()
        this.choice = e.className;
        e.style.border = " 1px solid red"
    }
    drawTime = () => {
        return  Math.floor(Math.random() * (5000 - 1000 + 1));
    }
}
const game = new Game(btnStart, [btnRed, btnGreen, btnBlue])