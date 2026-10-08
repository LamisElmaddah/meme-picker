import {catsData} from "/data.js";  

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnly = document.getElementById('gifs-only')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

getImageBtn.addEventListener('click', renderCat)

closeBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function renderCat(){
    const catObject = getSingleCat()
    memeModalInner.innerHTML = `
    <img 
    class="cat-img"
    src="./images/${catObject.image}" 
    alt="${catObject.alt}"
    >
    `
memeModal.style.display = 'flex'
}

function getSingleCat(){
        const catArray = getMatchingCat()
        const randomNumber = Math.floor(Math.random() * catArray.length)
        return catArray[randomNumber]
}

function getMatchingCat(){
    if (document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnly.checked
        const matchingCatArray  = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif === true
            }else{
            return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatArray
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
let radios = ``
const emotions = getEmotionsArray(cats)
for (let emotion of emotions){
    radios += `
    <div class="radio">
    <label for="${emotion}">${emotion}</label>
    <input
    type="radio"
    id="${emotion}"
    value="${emotion}"
    name="emotion"
    >
    </div>
    `
}
emotionRadios.innerHTML = radios
}
renderEmotionsRadios(catsData)

