export function openWikiContainer(research,section){
    return new Promise(async (resolve, reject) => {
        let allBtn = document.querySelectorAll('button');
        allBtn.forEach(btn => {
            btn.disabled = true;
        });
        let container = document.createElement('div');
        container.classList.add("wiki-card")
        let closeBtn = document.createElement('button');
        let hmtlContent = await fetch( `https://en.wikipedia.org/api/rest_v1/page/summary/${research}`)
        const data = await hmtlContent.json();
        closeBtn.addEventListener('click',()=>{
            container.remove();
            allBtn.forEach(btn => {
                btn.disabled = false;
            });
            resolve();
        })
        container.innerHTML =`<h1>${data.title}</h1>
        ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}">` : ''}
                <p>${data.extract_html}</p> `;
                container.appendChild(closeBtn);
                closeBtn.innerText = "ContinueQuizz";
                section.appendChild(container);
            })
}

export async function wikiBtn(research){
    return new Promise((resolve, reject) => {
        const wikiBtn = document.createElement('button');
        wikiBtn.id = "toBeRemoved";
        wikiBtn.innerText = `learn more about ${research}`
        let a = document.getElementById('1');
        a.appendChild(wikiBtn);
        wikiBtn.addEventListener('click',async()=>{
            wikiBtn.remove();
            document.querySelector("#nextButton").classList.add(`ghost`);  
            await openWikiContainer(encodeURIComponent(research),document.getElementById('1'));
            document.querySelector("#nextButton").classList.remove(`ghost`);  
            resolve();
        })
        
    })
    
}