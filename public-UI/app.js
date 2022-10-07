// let url = 'http://127.0.0.1:3001/api/cars'
let carMake = document.getElementById('make')
let carModel = document.getElementById('model')
let carYear = document.getElementById('year')
let addCar = document.getElementById('add-button')
let mainContainer = document.getElementById('main-container')
let ul = document.createElement('ul')


fetch('http://localhost:3001/api/cars')
.then(data => data.json()) 
.then(data => {
    for(let i = 0;i < data.length;i++) {
        const curr = data[i]
        let mainList = document.createElement('li')
        mainList.className = 'main-list'
        mainList.innerHTML = curr.make + ' '
        mainList.innerHTML += curr.car_year + ' '
        
            mainList.innerHTML += curr.model + ' '

            
           
            ul.append(mainList)
            
        }
        mainContainer.append(ul)
    })
    
    
    
    addCar.addEventListener('click', () => {
        
        let newCar = {
        make:carMake.value,
            model:carModel.value,
            year:carYear.value
        }

        let options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        }

        console.log(newCar.make,newCar.model,newCar.year)

         fetch('http://localhost:3001/api/cars',options)
         .then(data => {
            let newCarList = document.createElement('li')
            newCarList.className = 'new-list'
            newCarList.innerHTML = newCar.make + ' '
            newCarList.innerHTML += newCar.model + ' '
            newCarList.innerHTML += newCar.year + ' '

            ul.append(newCarList)
         })
         mainContainer.append(ul)
            

         
})

