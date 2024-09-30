let booly=true;
let numclick=[0,0,0,0,0,0,0,0,0];
let btns=document.querySelectorAll(".part")
btns.forEach(x=>{
    x.addEventListener("click",function(){btnClick(btns.indexOf(x))})
})
function btnClick(localSquareNumber){
    if(this.textContent !="")return
    numclick[localSquareNumber]++;
    if(booly)this.textContent='x'
    else this.textContent='o'

    booly=! booly;
    setTimeout(()=>(
        alert(this.textContent+"is win")
    ),100)

}
function reset(){
    let btns=document.querySelectorAll(".part");
    booly=! booly;
    for(let i=0;i<numclick;i++)
    {
        numclick[i]=0;
    }
    btns.forEach(x=>(
        x.textContent=""
    ))
}