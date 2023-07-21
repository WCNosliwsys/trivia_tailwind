const data = [
  {
    id: 1,
    pregunta: "¿Cual no es etiqueta html?",
    alternativas: ["h1", "main", "javascript"],
    respuesta: "javascript"
  },
  {
    id: 2,
    pregunta: "Nos sirve para eliminar el ultimo valor de un arreglo",
    alternativas: ["push", "pop", "slice"],
    respuesta: "pop"
  },
  {
    id: 3,
    pregunta: "Nos sirve para transformar un texto en arreglo",
    alternativas: ["split", "slice", "join"],
    respuesta: "split"
  },
]
let idActual = 0
let marcado = false
let correctas =0

const iniciar = () => {
  const main = document.querySelector("main")
  main.innerHTML = `
  <h1 class="text-xl font-bold text-gray-900 text-center mb-4">
  Trivia de Javascript
  </h1>
  
  <section class="flex flex-col px-4 py-6 mb-3 border rounded-lg shadow">

  </section>
  `
}

const pintarPregunta = () => {
  const preguntas = data[idActual].alternativas.map(
    (alternativa) =>
      `<button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full pregunta">${alternativa}</button>`
  ).join('');
  const section = document.querySelector('section')
  section.innerHTML = `
  <p class="text-md font-medium text-gray-900 mb-4">${data[idActual].pregunta}</p>
  
  <div class="flex flex-col items-start mb-10">
    ${preguntas}
  </div>
  
  <div class="flex justify-end">
    <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 btnNext" >Siguiente pregunta</button>
  </div>
  `
  section.removeEventListener('click', evaluarClick)
  section.addEventListener('click', evaluarClick)
}

const evaluarClick = (e) => {
  if (e.target.classList.contains('pregunta')) {
    console.log('evaluar')
    console.log(e.target.textContent)
    console.log(data[idActual].respuesta)
    evaluarRespuesta(e.target)
    desactivarPreguntas()
    marcado=true
  } else if(e.target.classList.contains('btnNext')) {
    marcado ? siguientePregunta() : alert('Marque una respuesta')
  }
}

const evaluarRespuesta=(elemento)=>{
  if(elemento.textContent == data[idActual].respuesta){
    correctas++
    elemento.classList.add('text-white', 'border-green-600', 'bg-green-600')
  }else{
    elemento.classList.add('text-white', 'border-red-600', 'bg-red-600')
  }
}

const desactivarPreguntas = () => {
  const preguntas = document.getElementsByClassName("pregunta")
  for (let pregunta of preguntas) {
    pregunta.disabled = true
    pregunta.classList.remove('hover:bg-blue-800', 'hover:text-white')
  }
}

const siguientePregunta = ()=>{
  idActual++
  if(idActual!=data.length){
    marcado=false
    pintarPregunta()
    if(idActual+1==data.length){
      const button = document.querySelector('.btnNext')
      button.textContent='Mostrar resultados'
      button.classList.add('text-white', 'border-blue-300', 'bg-blue-600')
      button.classList.remove('text-gray-900', 'bg-white','hover:bg-gray-100' )
    }
  }else{
    mostrarResultados()
  }

}

const mostrarResultados = ()=>{
  const section = document.querySelector('section')
  section.innerHTML =`
 
  <p class="text-4xl font-medium text-gray-900 mb-4 text-white">¡GANASTE! o ¡PERDISTE!</p>

  <p class="text-md font-medium text-gray-900 mb-4 text-white">Respondiste ${correctas} de ${data.length}</p>

  <p class="text-md font-medium text-gray-900 mb-4 text-white">Y este es tu puntaje: ${correctas*10}</p>

  <img src="https://placehold.co/300x100" />

  <div class="flex justify-end mt-10">
    <button type="button" class="text-white border border-blue-300 bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2">Empezar de nuevo</button>
  </div>
  `
  section.classList.add('text-center', 'bg-green-600')
  document.querySelector('button').addEventListener('click', ()=>{
    idActual = 0
    marcado = false
    correctas=0
    iniciar()
    pintarPregunta()
  })
}

iniciar()
pintarPregunta()
