const root = document.querySelector('.cep-info');
const cep = document.querySelector("#cep")
const newCep = document.querySelector("#newCep");

newCep.addEventListener("click",()=>{
    cep.value = ""
    cep.removeAttribute("disabled","")
})
cep.addEventListener("input",()=>{
    if(cep.value.length === 8){
        cep.setAttribute("disabled","")
        Cep()
    }
})

const Cep = async()=>{
    root.innerHTML = ""
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    const dados = await fetch(url);
    const json = await dados.json();
    for(key in json){
        if(key === "erro"){
            root.innerHTML += `
                <div class="box-info">
                    <p class="x">${key}</p>
                    <p>Cep não encontrado, Tente novamente!</p>
                </div>`
        }else{
            if(json[key] == ""){
                root.innerHTML += `
                <div class="box-info">
                    <p class="x">${key}</p>
                    <p class="vazio">Sem Informações...</p>
                </div>`
            }else{
                root.innerHTML += `
                <div class="box-info">
                    <p class="x">${key}</p>
                    <p>${json[key]}</p>
                </div>`
            }    
        }
    }
}