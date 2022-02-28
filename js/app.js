// alert('c')
const imgurl =`/../images/spinnervlll.gif`

const ManImg=`/../images/male.png`
const FemaleImg=`/../images/female.png`

const showPlayerDetailsonRight=document.getElementById('right-side');

// document.getElementById('male').style.display='none';
// document.getElementById('female').style.display='none';
const PlayerSearch=(searchbtn,searchbox)=>{

document.getElementById(searchbtn).addEventListener('click', function(e){
        const searchBox=document.getElementById(searchbox);

        const  searchBoxValue=searchBox.value

        if(isNaN(searchBoxValue)){
                console.log(searchBox.value)

                const url =`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchBoxValue}`

                fetch(url)
                .then(res=>res.json())
                .then(data=>displayPlayer(data))

                searchBox.value=''

        }


        else{
                return false
        }

        showPlayerDetailsonRight.innerHTML='';
      
})

}

const displayPlayer=(players)=>{
console.log(players)
const allPlayers=players.player

const allPlayerRow=document.getElementById('all-player-row');

allPlayerRow.innerHTML=``;

// if(players===null){
//         allPlayerRow.innerHTML=`<h2>not found</h2>`;
// }




// else{

for(const player of allPlayers){
        console.log(player)
       

        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div  class="card">
        <img src="${player.strThumb?player.strThumb:imgurl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name:${player.strPlayer}</h5>
          <p class="card-text"> Sports:${player.strSport}.</p>
          <a onclick="playerdetails(${player.idPlayer})" id="playerdetails" class="btn  btn-primary">see details</a>
         
          
        </div>
      </div>`

      allPlayerRow.appendChild(div)

}
}

// }

const playerdetails=(id)=>{
        console.log(id)
        const url=`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`

        console.log(url);
        fetch(url)
        .then(res=>res.json())
        .then(data=>rightSidePlayerDetails(data.players[0]))
        showPlayerDetailsonRight.style.display='block'


}

const rightSidePlayerDetails=(playerShow)=>{
        // console.log(playerShow)

        const playerDetails=playerShow

        // const [idPlayer,idTeam]=AllP
        const showPlayerDetailsonRight=document.getElementById('right-side');



        showPlayerDetailsonRight.innerHTML=`
        <h2 class="text-center">player details</h2>

        <div class="image-container">
        <img id="female" class="w-75" src="/../images/female.png" alt="">
       <img id="male" class="w-75" src="/../images/male.png" alt="">
        </div>

       
        <div class="card mb-3">
        <div class="card-body">
        <img src="${playerDetails.strThumb?playerDetails.strThumb:imgurl}" class="card-img-top w-50" alt="...">
          <h3 class="text-center">Name:${playerDetails.strPlayer}</h3>
          <h3 class="text-center">Gender:${playerDetails.strGender}</h3>
          <h3 class= "text-center">Country:${playerDetails.strTeam2}</h3>
          <h3 class="text-center">play:${playerDetails.strSport}</h3>
          <p  class="text-center">Details:${playerDetails.strDescriptionEN}</p>
        </div>
        <a id="playerdetails-delete" class="btn  btn-danger">Remove Details</a>

      </div>`


      
      if(playerDetails.strGender==='Male'){
        document.getElementById('male').style.display='block';
        document.getElementById('female').style.display='none';
}

else if(playerDetails.strGender==='Female'){
        document.getElementById('male').style.display='none';
        document.getElementById('female').style.display='block';
}

else{
return false;

}

document.getElementById('playerdetails-delete').addEventListener('click',function(e){
        showPlayerDetailsonRight.style.display='none';

})



        // for(const p of AllP){
        //         console.log(p.idTeam)
        // }

        // console.log(AllP.idPlayer)


}


PlayerSearch('search-btn','search-box')