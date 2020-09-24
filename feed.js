
let score = 0;
function getsadinterval(){
    return Date.now() + 1000;
}
function getgoneinterval(){
    return Date.now() + Math.floor(math.random()*18000)+2000;
}
function gethungryinterval(){
    return Date.now()+math.floor(math.random()*3000 )+2000;
}
function getkingstatus (){
    return math.random() >0.9; 
}
const moles = [
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-0')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-1')
    },
    {
        status: 'sad', 
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-2')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-3')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-4')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-5')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-6')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-7')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-8')
    },
    {
        status: 'sad',
        next: getsadinterval(),
        king: false,
        node: document.getElementById('hole-9')
    }
];

function getnextstatus (mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
        mole.next=getsadinterval();
        mole.status = "leaving";
        if (mole.king){
            mole.node.children[0].src="./king-mole-leaving.png";
        }else {
            mole.node.children[0].src="./mole-leaving.png";
        }
        break;
        case "leaving":
            mole.next = getgoneinterval();
            mole.status = "gone";
            mole.node.children[0].classlist.add("gone");
            break;
        case "gone":
            mole.status = "hungry";
            moles.king = getkingstatus(); 
            mole.next = gethungryinterval();
            mole.node.children[0].classlist.add("hungry");
            mole.node.children[0].classlist.remove("gone");
            if (mole.king){
                mole.node.children[0].src="./king-mole-hungry.png";
            }else{
                mole.node.children[0].src ="./mole-hungry.png";
            }
            break;
        case "hungry":
        mole.status ="sad";
        mole.next = getsadinterval;
        mole.node.children[0].classlist.remove("hungry");
        if (mole.king){
            mole.node.children[0].src="./king-mole-sad.png";
        }else{
            mole.node.children[0].src="./mole-sad.png";
        }
        break;
    }
}   
function feed (event){
    if (event.target.tagname !=="IMG" ||!event.target,classlist.contains("hungry")){
        return;
    }  
    const mole = moles[parseInt(event.target.dataset.index)]
    console.log(mole);
    mole.status = "fed";
    mole.next = getsadinterval();
    if (mole.king){
        score +=2;
        mole.node.children[0].src = "./king-mole-fed.png";

    }else{
        score++;
        mole.node.children[0].src = "./mole-fed.png";
    }
    mole.node.children[0].classlist.remove("hungry");
    score++;
    if (score >= 10) {
        win();
    }
    document.querySelector(".worm-container").style.width = `${10*score%}`;
}
function win() {
    document.querySelector(".bg").classList.add("hide");
    document.querySelector(".win").classList.remove("hide");   
}
 let runagain = Date.now()+100;
function nextframe (){
    const now = Date.now();

    if (runagain <= now){
        for (let i=0; i < moles.length; i++){
            if (moles[i],next <= now){
                getnextstatus(moles[i]);
            }
        }
    runagainat = now + 100;
    }
    requestAnimationFrame(nextframe);
}
document.querySelector(".bg").addEventListener("click",feed);

nextframe();
