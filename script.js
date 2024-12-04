const bird = document.getElementById("bird")
const body = document.getElementById('body')
const bg = document.getElementById("bg")
const bg2 = document.getElementById("bg2")
const globalpipes = document.getElementById("globalpipes")
const gravity = 1
const white = document.getElementById("white")
const H = document.getElementById("H")
const T = document.getElementById("T")
const O = document.getElementById("O")
const mess = document.getElementById("Message")
points = 0
birdposX = 10
birdposY = 500
birdvelocity = 0
GameStarted = false
birdrotation = 0
bgpos = 0
bg2pos = 0
pipetimer = 0
animtimer = 0
animframe = 0
GameOver = false
// a & b are HTMLElements



function play(sound) {
    var audio = new Audio("SoundEfects/"+sound);
    audio.play();
  }



function reset_animation() {
    if(GameOver!=true){
    white.style.animation = 'none';
    white.offsetHeight; /* trigger reflow */
    white.style.animation = null;}
  }
function Restart(){
    GameStarted = false
    points = 0
birdposX = 10
birdposY = 500
birdvelocity = 0
GameStarted = false
birdrotation = 0
bgpos = 0
bg2pos = 0
pipetimer = 0
animtimer = 0
animframe = 0
GameOver = false
mess.style.opacity = 1
allpipes.forEach(allpipes2 => {
Array.from(allpipes2).forEach(pipe => {

        pipe.remove()

});
})
reset_animation()
SetPoint()
}
SetPoint()
function overlaps(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
  }
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function CreatePipe(tops){
    pipes = `
            <div class="twopipes">
            <div style="--top:`+(tops-120)+`vh;--x:50vh" class="TopPipe"></div>
            <div style="--top:`+(tops-120)+`vh;--x:58vh;--point:'false'" class="GivePoint"></div>
            <div style="--top:`+(tops)+`vh;--x:50vh" class="BottomPipe"></div>
    </div>
    `
    globalpipes.innerHTML+=pipes 
}
const BirdAnimation = ["yellowbird-downflap.png","yellowbird-midflap.png","yellowbird-upflap.png"]

CreatePipe(70)

allpipes = []
function SetPoint(){
pointsCH = [...points.toString()]
if(points<1000){
    O.style.backgroundImage = "url(UI/Numbers/"+pointsCH[2]+".png)"
    T.style.backgroundImage = "url(UI/Numbers/"+pointsCH[1]+".png)"
    H.style.backgroundImage = "url(UI/Numbers/"+pointsCH[0]+".png)"
}
if(points<100){
    O.style.backgroundImage = "url(UI/Numbers/"+pointsCH[1]+".png)"
    T.style.backgroundImage = "url(UI/Numbers/"+pointsCH[0]+".png)"
    H.style.backgroundImage = null
}
if(points<10){
    O.style.backgroundImage = "url(UI/Numbers/"+pointsCH[0]+".png)"
    T.style.backgroundImage = null
    H.style.backgroundImage = null
}
if(points<1){
    O.style.backgroundImage = null
    T.style.backgroundImage = null
    H.style.backgroundImage = null
}
}
function Update(){
    
    if(!GameOver && GameStarted == true){
    mess.style.opacity = 0
    allpipes = []
    allpipes.push(document.getElementsByClassName("TopPipe"))
    allpipes.push(document.getElementsByClassName("BottomPipe"))
    allpipes.push(document.getElementsByClassName("GivePoint"))
    allpipes.forEach(allpipes2 => {
        Array.from(allpipes2).forEach(pipe => {
            //console.log(pipe.style.getPropertyValue("--x"))
            x= parseFloat(pipe.style.getPropertyValue("--x"))
            //console.log(x)
            pipe.style.setProperty('--x',  x-0.06+"vh")
            if(!pipe.classList.contains("GivePoint")){
            if(overlaps(pipe,bird)){
                reset_animation()
                play("hit.ogg")
                setTimeout(function(){
                    play("die.ogg")

                },400)
                GameOver = true
                white.style.display = "flex"
            }}
            else{
                if(overlaps(pipe,bird)){
                    if(pipe.style.getPropertyValue("--point") != true){
                        points++
                        SetPoint()
                        play("point.ogg")
                        pipe.remove()

                    }
                }
            }
            if(x<=-10){
                pipe.remove()
            }});
    });

    pipetimer++
    if(pipetimer%400==0){
        CreatePipe(randomIntFromInterval(40,70))
    }
    /*
    animtimer++
    if(animtimer%(50)==0){
        animframe = animframe +1
        if(animframe==3){
            animframe=0
        }
        bird.style.backgroundImage="url(GameObjects/"+BirdAnimation[animframe]+")"
    }*/

    bgpos++
    bg2pos++
    bg.style.backgroundPositionX =  -(bgpos/15)+"vh" 
    bg2.style.backgroundPositionX =  -(bg2pos/1000)+"vw" 

    if(birdvelocity<=-1000){
        birdvelocity=-1000
    }
    if(birdrotation>=90){
        birdrotation = 90
    }
    if(birdrotation<=-30){
        birdrotation = -30
    }
    
}
if(GameStarted){
if(birdposY<=800){
bird.style.rotate = birdrotation+"deg"
birdvelocity = birdvelocity-gravity
birdrotation = birdrotation + 0.6*-(birdvelocity/50)
birdposY = birdposY-(birdvelocity/250)
bird.style.left = birdposX+"vw"
bird.style.top = (birdposY/10)+"vh"
}
else{
    reset_animation()
    if(GameOver!=true){
        play("hit.ogg")
        setTimeout(function(){
            play("die.ogg")

        },400)
    }
                    GameOver = true
                    
}
}
if(GameStarted==false){
bird.style.left = birdposX+"vw"
bird.style.top = (birdposY/10)+"vh"
bird.style.rotate = birdrotation+"deg"

bgpos++
bg2pos++
bg.style.backgroundPositionX =  -(bgpos/15)+"vh" 
bg2.style.backgroundPositionX =  -(bg2pos/1000)+"vw" 

}}
setInterval(
    function(){
        Update()
    },1
)
rotate = 0
body.addEventListener('click', function handleClick() {
    
    GameStarted = true
    birdvelocity = 200
    birdrotation = -30
    if(GameOver){
        Restart()
    }
    else{
        play("wing.ogg")
    }
    /*
    if(rotate!=0){
    clearInterval(rotate)
    }
    if(birdrotation>-30){
        rotate = setInterval(
            function(){
                if(birdrotation<=-30){
                    birdrotation = -30

                    clearInterval(rotate)
                    rotate=0
                }
                console.log(1)
                birdrotation=birdrotation-0.7
    
            },1
        )
    }
    else{
        birdrotation = -30
    }
*/
  });