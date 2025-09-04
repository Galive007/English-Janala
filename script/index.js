const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
}
const loadWords=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(words=>displayLessonWord(words.data))
}
const displayLessonWord=(words)=>{
    // console.log(words);
    const WordsContainer=document.getElementById('Words-container')
    WordsContainer.innerHTML='';
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
            <div class="word-card bg-white py-8 px-7 text-center">
                <h3 class="text-black font-bold text-3xl">${word.word}</h3>
                <p class="text-black font-medium my-4 text-xl">Meaning /Pronounciation</p>
                <h2 class="text-[#18181B] text-3xl font-semibold font-bangla">${word.meaning} / ${word.pronunciation}</h2>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1a91ff1a] hover:bg-[#1a90ff88] p-3 rounded-lg">
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
    
}
loadLesson()

const displayLesson = (lessons) => {
    // console.log(lessons);
    // step 1
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = "";
    /*
    id: 101
    lessonName : "Basic Vocabulary"
    level_no: 1
    step 2
    */ 
    lessons.forEach((lesson) => {
        // console.log(lesson);
        // step 3
        const lessonButton=document.createElement('div')
        lessonButton.innerHTML=`
                    <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary">
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
