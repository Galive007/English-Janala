const createElement=(arr)=>{
    const htmlElement=arr.map(el=>`<span class="btn">${el}</span>`)
    console.log(htmlElement.join(' '));
    
}

const greeting=["Hi","Hello","Welcome"]
const synonyms=createElement(greeting)

