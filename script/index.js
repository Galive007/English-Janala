const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
}
const loadWords=(id)=>{
    // console.log(id);
    manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(words=>{
        removeActive()
        const clickBtn=document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn);
        clickBtn.classList.add('active')
        displayLessonWord(words.data)
    })
}

const removeActive=()=>{
    const lessonButton=document.querySelectorAll('.lesson-btn')
    // console.log(lessonButton);
    lessonButton.forEach(btn=>{
        btn.classList.remove('active')
    })
}

const displayLessonWord=(words)=>{
    // console.log(words);
    const WordsContainer=document.getElementById('Words-container')
    WordsContainer.innerHTML='';
    if(words.length == 0){
        WordsContainer.innerHTML=`
            <div class="text-center col-span-full space-y-3 py-4">
                <img src="./assets/alert-error.png" class="mx-auto" alt="">
                <p class="text-[#79716B] text-[16px] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[#292524] text-3xl font-medium font-bangla">নেক্সট Lesson এ যান।</h2>
            </div>
        `;
        manageSpinner(false)
        return;
    }
    words.forEach(word=>{
        // console.log(word);
        /** 
         * id: 5
                level: 1
                meaning: "আগ্রহী"
                pronunciation: "ইগার"
                word: "Eager"
        */
        const wordDiv=document.createElement('div')
        wordDiv.innerHTML=`
            <div class="word-card h-fit rounded-lg bg-white py-8 px-7 text-center">
                <h3 class="text-black font-bold text-3xl">${word.word?word.word: "শব্দ পাওয়া যায়নি"}</h3>
                <p class="text-black font-medium my-4 text-xl">Meaning /Pronounciation</p>
                <h2 class="text-[#18181B] text-3xl font-semibold font-bangla">${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</h2>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a90ff88] p-3 rounded-lg">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1a91ff1a] hover:bg-[#1a90ff88]  p-3 rounded-lg">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `
        WordsContainer.append(wordDiv)
    })
    manageSpinner(false);
    
}

const manageSpinner=(status)=>{
    if(status ==  true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('Words-container').classList.add('hidden')
    }else{
        document.getElementById('Words-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}


const loadWordDetails=async(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res=await fetch(url)
    const data=await res.json()
    displayWordDetails(data.data);
}

const createElement=(arr)=>{
    const htmlElement=arr.map(el=>`<span class="btn">${el}</span>`)
    return (htmlElement.join(' '));
    
}
const displayWordDetails=(word)=>{
    // console.log(word);
    /**
    *"data": {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1, 
    "partsOfSpeech": "adjective",
    "synonyms": ["enthusiastic","excited","keen"],
    "id": 5
    } 
    */
    const wordDetailsContainer=document.getElementById('details-container')
    wordDetailsContainer.innerHTML=`
                        <h1 class="text-[#000] font-semibold text-3xl font-bangla">${word.pronunciation} (<i class="fa-solid fa-microphone-lines"></i> : ${word.meaning})</h1>
                        <div>
                            <h1 class="text-[#000] font-semibold text-2xl">Meaning</h1>
                            <p class="text-[#000] font-medium text-xl font-bangla">${word.meaning}</p>
                        </div>
                        <div>
                            <h1 class="text-[#000] font-semibold text-2xl">Example</h1>
                            <p class="text-[#000a] font-medium text-xl">${word.sentence}</p>
                        </div>
                        <div>
                            <h1 class="text-[#000] font-semibold text-2xl font-bangla">সমার্থক শব্দ গুলো</h1>
                            <div>
                                ${createElement(word.synonyms)}
                            </div>
                            
                        </div>
    `;
    document.getElementById('word_modal').showModal();
}

const displayLesson = (lessons) => {
    // console.log(lessons);
    // step 1
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = "";
    /*
    id: 101
    lessonName : "Basic Vocabulary"
    level_no: 1
    */ 
    //step 2
    lessons.forEach((lesson) => {
        // console.log(lesson);
        // step 3
        const lessonButton=document.createElement('div')
        lessonButton.innerHTML=`
                    <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i>
                    Lesson-${lesson.level_no}
                    </button>
        `;
        // step 4
        lessonContainer.append(lessonButton)
    })

}
loadLesson()



//...................................................................
    // for (let lesson of lessons) {
    //     // console.log(lesson);
    //     const lessonDiv = document.createElement('div');
    //     lessonDiv.innerHTML = `
                
    //                 <button class="btn btn-outline btn-primary">
    //                 <i class="fa-solid fa-book-open"></i>
    //                 lesson
    //                 </button>
                
    //     `;
    //     lessonContainer.append(lessonDiv);
