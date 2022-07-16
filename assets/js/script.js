let path = window.location.pathname;
let page = path.substring(path.lastIndexOf('/'));
let query = window.location.search.replace('?name=','');
const xhttp = new XMLHttpRequest();
const agentjson_link = 'https://api.jsonbin.io/v3/b/610c947be1b0604017a77381';
const lineupjson_link = 'https://api.jsonbin.io/v3/b/610c94f6d5667e403a3a20cb';
console.log(page);
switch(page){
    case '/guide.html': 
        guide_page(query);
        break;
    case '/ability.html': 
        ability_page(query);
        break;
    case '/lineup.html': 
        lineup_page(query);
        break;
    case '/agent.html': 
        agent_page(query);
        break;
}



let agent_gallery = document.getElementById('agent-gallery');
if(agent_gallery!=null){
    xhttp.onload = function(){
        image = JSON.parse(this.responseText);
        console.log(image);
        let count = 1
        for(let i of image){
            agent_gallery.innerHTML+= `<div class="agent-border">
                <a href="agent.html?name=${i['name'].replace('/','-').toLowerCase()}">
                <img src="${i['image']}" alt="">
                </a>
            </div>`;
    
        }
    }
    xhttp.open('get',agentjson_link);
    xhttp.send();
    
}
function guide_page(query){
    let back = document.querySelector('.nav > a:first-child');
    back.href = `agent.html?name=${query}`;
    let image_container = document.querySelector('.section-guide .card-header');
    let agent_name = document.querySelector('.card-body h1');
    let default_video = document.querySelector('.video-default');
    xhttp.onload = function(){
        image = JSON.parse(this.responseText);
        for(let i of image){
            if(i['name'].toLowerCase()==query.replace('-','/')){
                agent_name.innerHTML = i['name'];
                image_container.innerHTML= `
                <img src="${i['image']}">`;
            }
        }
    }
    xhttp.open('get',agentjson_link);
    xhttp.send();
    let xhttpguide = new XMLHttpRequest();
    xhttpguide.onload = function(){
        let data = JSON.parse(this.responseText);
        for(let d of data){
            for(let e of d['guide']){
                if(e['name']==query){
                    default_video.innerHTML = `<iframe width="560" height="315" src="${e['url']}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                }
            }
        }
    }
    xhttpguide.open('get',lineupjson_link);
    xhttpguide.send();
}

function agent_page(query){
    let image_container = document.querySelector('#content .card-header');
    let card_container = document.querySelector('.section-agent .card-body');

    xhttp.onload = function(){
        image = JSON.parse(this.responseText);
        for(let i of image){
            let name = i['name'].toLowerCase().replace('/','-')
            if(i['name'].toLowerCase()==query.replace('-','/')){
                image_container.innerHTML= `<img src="${i['image']}">`;
                card_container.innerHTML = 
                `<h1>${i['name']}</h1>
                <p>${i['description']}</p>
                <div>
                    <a href="guide.html?name=${name}">Guide</a>
                    <a href="lineup.html?name=${name}">Lineups</a>
                    <a href="ability.html?name=${name}">Abilities</a>
                </div>`;
            }
    
        }
    }
    xhttp.open('get',agentjson_link);
    xhttp.send();
}
function lineup_page(query){
    let back = document.querySelector('.nav > a:first-child');
    back.href = `agent.html?name=${query}`;
    let image_container = document.querySelector('.section-lineup .card-header');
    let agent_name = document.querySelector('.card-body h1');
    let default_video = document.querySelector('.video-default');
    let maps = document.querySelector('.maps-list');
    xhttp.onload = function(){
        image = JSON.parse(this.responseText);
        for(let i of image){
            if(i['name'].toLowerCase()==query.replace('-','/')){
                agent_name.innerHTML = i['name'];
                image_container.innerHTML= `
                <img src="${i['image']}">`;
            }
    
        }
    }
    xhttp.open('get',agentjson_link);
    xhttp.send();
    let xhttplineup = new XMLHttpRequest();
    let lineup_name = document.getElementById('lineup-name');
    xhttplineup.onload = function(){
        let data = JSON.parse(this.responseText);
        for(let d of data){
            for(let e of d['lineup']){
                if(e['name']==query){
                    default_video.innerHTML = `<iframe width="560" height="315" src="${e['breeze']}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    lineup_name.innerHTML = 'Breeze';
                    for(let f of d['maps']){
                        maps.innerHTML += `<div><img src="${f['url']}"/><p>${f['name']}</p></div>`;
                    }
                    let map_btn = document.querySelectorAll('.maps-list > div');
                    map_btn.forEach((el)=>{
                        el.addEventListener('click', function(){
                            let key_map = this.children[1].innerHTML;
                            lineup_name.innerHTML = key_map; 
                            default_video.innerHTML = `<iframe width="560" height="315" src="${e[key_map]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                        });
                    });
                }
            }
        }
    }
    xhttplineup.open('get',lineupjson_link);
    xhttplineup.send();
}
function ability_page(query){
    // BACK BUTTON CHANGE HREF BASED ON SELECTED AGENT 
    let back = document.querySelector('.nav > a:first-child');
    back.href = `agent.html?name=${query}`;

    let image_container = document.querySelector('.section-ability .card-header');
    let default_video = document.querySelector('.video-default');
    let agent_name = document.querySelector('.card-body h1');
    let ability_icon = document.querySelector('.ability-list');
    let ability_description = document.querySelector('.ability-content p');
    let ability_name = document.querySelector('.ability-content h3');
    xhttp.onload = function(){
        image = JSON.parse(this.responseText);
        
        for(let i of image){
            
            if(i['name'].toLowerCase()==query.replace('-','/')){
                agent_name.innerHTML = i['name'];
                ability_video_default = i['abilities'][0]['ability_video'][0]['video']['file']['url'];
                
                // LOOP ALL ABILITIES 
                for(let j of i['abilities']){
                    let icon = j['ability_icon']['url'];
                    ability_icon.innerHTML += `<p><img src="${icon}"></p>`
                }

                ability_description.innerHTML = i['abilities'][0]['ability_description'];
                ability_name.innerHTML = i['abilities'][0]['ability_name'];
                default_video.innerHTML = `<video playsinline loop autoplay=""><source src="${ability_video_default}"></video>`;
                image_container.innerHTML = `<img src="${i['image']}">`;
                
                console.log(i['abilities']);
                let ability_btn = document.querySelectorAll('.ability-list p');
                ability_btn[0].style.border = "2px solid";
                ability_btn.forEach((el,index)=>{
                    el.addEventListener('click', function(){
                        ability_btn.forEach((el)=>{
                            el.style.border = "none";
                        });
                        this.style.border = "2px solid";
                        let selected_ability_video = i['abilities'][index]['ability_video'][0]['video']['file']['url'];
                        default_video.innerHTML = `<video playsinline loop autoplay=""><source src="${selected_ability_video}"></video>`;
                        ability_name.innerHTML =  i['abilities'][index]['ability_name'];
                        ability_description.innerHTML = i['abilities'][index]['ability_description'];
                    })
                });
            }
    
        }
        
    }
    xhttp.open('get',agentjson_link);
    xhttp.send();
}
