const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
}

// id: 101
// lessonName : "Basic Vocabulary"
// level_no: 1

const displayLesson = (lessons) => {
    // console.log(lessons);
    // step 1
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = "";

    // step 2
    lessons.forEach((lesson) => {
        // console.log(lesson);
        // step 3
        const lessonButton=document.createElement('div')
        lessonButton.innerHTML=`

                    <button class="btn btn-outline btn-primary">
                    <i class="fa-solid fa-book-open"></i>
                    Lesson-${lesson.level_no}
                    </button>

        `;
        // step 4
        lessonContainer.append(lessonButton)
    })

}
loadLesson();




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
